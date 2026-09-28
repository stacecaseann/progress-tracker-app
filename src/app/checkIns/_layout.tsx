import { Stack } from "expo-router";

//This sets the layout function when I go into the checkins tab
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Check-Ins" }} />
      <Stack.Screen name="add" options={{ title: "Add Check-In" }} />
    </Stack>
  );
}
