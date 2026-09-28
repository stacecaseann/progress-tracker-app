import { Stack } from "expo-router";

//This is the default layout for the goals tab
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "View" }} />
      <Stack.Screen name="add" options={{ title: "Add" }} />
      <Stack.Screen name="edit" options={{ title: "Edit" }} />
    </Stack>
  );
}
