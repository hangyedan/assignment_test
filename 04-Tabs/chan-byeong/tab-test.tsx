import { Tabs } from "./tabs";

export function TabTest() {
  return (
    <Tabs defaultValue='1'>
      <Tabs.List>
        <Tabs.Trigger value='1' />
        <Tabs.Trigger value='2' />
        <Tabs.Trigger value='3' />
      </Tabs.List>
      <Tabs.Content value='1'>첫번째</Tabs.Content>
      <Tabs.Content value='2'>두번째</Tabs.Content>
      <Tabs.Content value='3'>세번째</Tabs.Content>
    </Tabs>
  );
}
