import { GoalProvider } from "@/context/GoalProvider";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";

//This is the layout of the app.
//It splits the app into 3 separate tabs
export default function RootLayout() {
  return (
    <GoalProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="goals"
          options={{
            title: "Goals",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="checkIns"
          options={{
            title: "Check-In",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GoalProvider>
  );
}
