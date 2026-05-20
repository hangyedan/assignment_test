export default function useQuery(fn, deps = []) {}

// 1. fn 함수를 실행하면 상태에 따른 객체 반환
// Pending: 대기중 - status:"loading"
// Rejected: 거절 - status:"error", 반환 => error:Error
// Fulfilled: 충족 - status:"success",반환 => data
