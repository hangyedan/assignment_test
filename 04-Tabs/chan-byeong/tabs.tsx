import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type TabContextType = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const TabContext = createContext<TabContextType | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
}

export function Tabs({ children, defaultValue }: TabsProps) {
  const [activeTab, setActivetab] = useState(defaultValue);

  const tabCtx: TabContextType = {
    value: activeTab,
    setValue: setActivetab,
  };

  return <TabContext value={tabCtx}>{children}</TabContext>;
}

function TabsList({ children, ...props }: { children: ReactNode }) {
  return (
    <ul {...props} style={{ display: "flex", gap: "2px", border: "green" }}>
      {children}
    </ul>
  );
}

function TabTrigger({ value, ...props }: { value: string }) {
  const tabCtx = useContext(TabContext);

  if (!tabCtx) {
    throw new Error("tab context must be called in TabsProvier");
  }

  const handleClick = () => {
    tabCtx.setValue(value);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      style={{ backgroundColor: `${tabCtx.value === value ? "blue" : ""}` }}
    >
      {value}
    </button>
  );
}

function TabContent({
  value,
  children,
  ...props
}: {
  value: string;
  children: ReactNode;
}) {
  const tabCtx = useContext(TabContext);

  if (!tabCtx) {
    throw new Error("tab context must be called in TabsProvier");
  }

  if (tabCtx.value !== value) return null;

  return <div {...props}>{children}</div>;
}

Tabs.List = TabsList;
Tabs.Trigger = TabTrigger;
Tabs.Content = TabContent;
