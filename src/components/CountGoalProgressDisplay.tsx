import { CountGoalProgress } from "@/goals/CountGoalProgress";
import { Text, View } from "react-native";

type Props = {
  progress: CountGoalProgress;
};
//This is the progress display specific for a count goal
//It is viewed from the main page
export function CountGoalProgressDisplay({ progress }: Props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
      <Text style={{ fontSize: 32 }}>{progress.totalValue}</Text>
      <Text style={{ fontSize: 14 }}>{progress.valueUnit}</Text>
    </View>
  );
}
