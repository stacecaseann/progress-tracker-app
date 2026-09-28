import type { FrequencyGoalProgress } from "@/goals/FrequencyGoalProgress";
import Ionicons from "@react-native-vector-icons/ionicons";
import { View } from "react-native";

type Props = {
  progress: FrequencyGoalProgress;
};
//This is the progress display specific for a frequency goal
//It is viewed from the main page
export function FrequencyGoalProgressDisplay({ progress }: Props) {
  function viewDailyProgress(progress: FrequencyGoalProgress) {
    const lastEntry = [...progress.progressByDay.entries()].at(-1);
    if (!lastEntry) return null;
    const [date, dates] = lastEntry;
    const frequency = progress.frequency;
    const numberOfDays = dates.length;
    console.log("Frequency " + frequency + "numberOfDays " + numberOfDays);
    const circles = [];
    for (let i = 0; i < frequency; i++) {
      if (i < numberOfDays) {
        console.log("In first");
        circles.push(
          <Ionicons key={i} name="checkmark-circle" size={30} color="#99C1B9" />
        );
      } else {
        console.log("In second");
        circles.push(
          <Ionicons key={i} name="ellipse-outline" size={30} color="#99C1B9" />
        );
      }
    }
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {circles}
      </View>
    );
  }
  return viewDailyProgress(progress);
}
