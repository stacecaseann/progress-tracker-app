import type { StreakGoalProgress } from "@/goals/StreakGoalProgress";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Text, View } from "react-native";

type Props = {
  progress: StreakGoalProgress;
};
//This is the progress display specific for a streak goal
//It is viewed from the main page
export function StreakGoalProgressDisplay({ progress }: Props) {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
        <Text>
          <Ionicons name="flame-outline" size={30} color="#FF6B35"></Ionicons>
        </Text>
        <Text style={{ fontSize: 32, color: "#FF6B35" }}>
          {progress.totalValue}
        </Text>
        <Text style={{ fontSize: 14 }}>day streak</Text>
      </View>
      <View>
        <Text>Longest Streak : {progress.longestStreak} days</Text>
      </View>
    </View>
  );
}
