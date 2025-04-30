import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="assigned"
        options={{ title: "Assigned Tasks", tabBarIcon: () => null }}
      />
      <Tabs.Screen name="recurring" options={{ title: "Recurring Tasks" , tabBarIcon: () => null, }} />
    </Tabs>
  );
}
