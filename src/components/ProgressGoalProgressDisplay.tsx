import { ProgressGoalProgress } from "@/goals/ProgressGoalProgress";
import { Text, View } from "react-native";

type Props = {
  progress: ProgressGoalProgress;
};
//This is the progress display specific for a progress goal
//It is viewed from the main page
export function ProgressGoalProgressDisplay({ progress }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
      <Text style={{ fontSize: 32 }}>
        {progress.totalValue}/{progress.value}
      </Text>
      <Text style={{ fontSize: 14 }}>{progress.valueUnit}</Text>
    </View>
  );
}
