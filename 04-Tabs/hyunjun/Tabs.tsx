import { createContext, useContext, useState } from "react";

const TabsContext = createContext<{
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

type TabsProps = {
  value: string;
  children: React.ReactNode;
};

export const Tabs = ({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <TabsContext value={{ selected, setSelected }}>{children}</TabsContext>
  );
};

export const TabsTrigger = ({ value, children }: TabsProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger는 Tabs 내부에서만 사용할 수 있습니다.");
  }
  const { selected, setSelected } = context;
  return (
    <button
      onClick={() => setSelected(value)}
      style={{ color: selected === value ? "blue" : "" }}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: TabsProps) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent는 Tabs 내부에서만 사용할 수 있습니다.");
  }
  const { selected } = context;
  if (selected !== value) return null;
  return <p>{children}</p>;
};

Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
