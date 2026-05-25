import { waitFor, renderHook } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import useQuery from "./use-query";

describe("useQuery", () => {
  test("return values", () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(typeof result.current).toBe("object");
    expect(result.current).toHaveProperty("status");
  });

  describe("states", () => {
    test("loading", () => {
      const { result } = renderHook(() => useQuery(async () => true));
      expect(result.current.status).toBe("loading");
    });

    test("success", async () => {
      const { result } = renderHook(() => useQuery<number>(async () => 10));
      await waitFor(() => {
        expect(result.current).toEqual({
          status: "success",
          data: 10,
        });
      });
    });

    test("error", async () => {
      const error = new Error("error");
      const { result } = renderHook(() =>
        useQuery(async () => {
          throw error;
        }),
      );

      await waitFor(() => {
        expect(result.current).toStrictEqual({
          status: "error",
          error,
        });
      });
    });
  });

  describe("dependency array", () => {
    test("sequential", async () => {
      const { rerender, result } = renderHook(
        ({ deps }) => useQuery(async () => deps, deps),
        { initialProps: { deps: [1] } },
      );

      expect(result.current.status).toBe("loading");
      await waitFor(() => {
        expect(result.current).toEqual({ status: "success", data: [1] });
      });

      rerender({ deps: [2] });
      expect(result.current.status).toBe("loading");
      await waitFor(() => {
        expect(result.current).toEqual({ status: "success", data: [2] });
      });
    });

    test("overlapping", async () => {
      const fn = vi.fn();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve) => {
                fn();
                setTimeout(() => resolve(deps), 200);
              }),
            deps,
          ),
        { initialProps: { deps: [1] } },
      );

      expect(result.current.status).toBe("loading");

      // 첫 요청이 아직 진행 중일 때 다시 트리거
      rerender({ deps: [2] });
      expect(result.current.status).toBe("loading");

      // 두 요청 모두 완료될 때까지 대기
      await waitFor(
        () => {
          expect(fn).toHaveBeenCalledTimes(2);
          expect(result.current).toEqual({ status: "success", data: [2] });
        },
        { timeout: 5000 },
      );
    });
  });

  describe("cancellation of outdated callbacks", () => {
    test("first resolves after second", async () => {
      const fn = vi.fn();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve) => {
                fn();
                setTimeout(() => resolve(deps[0]), deps[0] * 10);
              }),
            deps,
          ),
        { initialProps: { deps: [500] } },
      );

      // 첫 번째 요청이 진행 중일 때 두 번째 요청 트리거
      await new Promise((resolve) => setTimeout(resolve, 50));
      rerender({ deps: [200] });

      // 두 번째 요청이 먼저 완료되고, 그 결과를 반영해야 함
      await waitFor(
        () => {
          expect(fn).toHaveBeenCalledTimes(2);
          expect(result.current).toEqual({ status: "success", data: 200 });
        },
        { timeout: 5000 },
      );
    });

    test("first rejects after second", async () => {
      const fn = vi.fn();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve, reject) => {
                fn();
                setTimeout(
                  () => (deps[0] > 300 ? resolve(42) : reject(24)),
                  deps[0] * 10,
                );
              }),
            deps,
          ),
        { initialProps: { deps: [400] } },
      );

      await new Promise((resolve) => setTimeout(resolve, 50));
      rerender({ deps: [200] });

      await waitFor(
        () => {
          expect(fn).toHaveBeenCalledTimes(2);
          expect(result.current).toEqual({ status: "error", error: 24 });
        },
        { timeout: 5000 },
      );
    });
  });

  test("works with timer", async () => {
    const fn = vi.fn();
    const { result } = renderHook(() =>
      useQuery(
        () =>
          new Promise((resolve) => {
            fn();
            setTimeout(() => resolve(true), 100);
          }),
      ),
    );

    expect(result.current.status).toBe("loading");

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalled();
        expect(result.current.status).toBe("success");
      },
      { timeout: 5000 },
    );
  });

  describe("handle unmounting", () => {
    test("stale resolve", async () => {
      const fn = vi.fn();
      const { result, unmount } = renderHook(() =>
        useQuery(
          () =>
            new Promise((resolve) => {
              setTimeout(() => {
                fn();
                resolve(true);
              }, 100);
            }),
        ),
      );

      unmount();
      // unmount 후 Promise가 resolve되어도 상태가 업데이트되지 않아야 함
      await new Promise((resolve) => setTimeout(resolve, 200));

      // fn이 호출되었지만 (resolve는 발생) 상태는 loading 유지되어야 함
      expect(fn).toHaveBeenCalled();
      expect(result.current.status).toBe("loading");
    });
  });
});
