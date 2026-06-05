import { createContext, useContext, useState, type ReactNode } from "react";

type TabsType = {
  children: ReactNode;
  defaultValue: string;
};

const TabsContextProvider = createContext<{
  selected: string;
  setSelected: (id: string) => void;
} | null>(null);

const Tabs = ({ children, defaultValue }: TabsType) => {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <TabsContextProvider value={{ selected, setSelected }}>
      {children}
    </TabsContextProvider>
  );
};

const Menu = ({ value, children }: { value: string; children: ReactNode }) => {
  const { selected, setSelected } = useContext(TabsContextProvider);
  return (
    <button
      id={value}
      style={selected === value ? { color: "blue" } : { color: "black" }}
      onClick={() => setSelected(value)}
    >
      {children}
    </button>
  );
};

const Content = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const { selected } = useContext(TabsContextProvider);

  if (value !== selected) {
    return null;
  }

  return <p id="value">{children}</p>;
};

Tabs.Menu = Menu;
Tabs.Content = Content;

export default Tabs;
