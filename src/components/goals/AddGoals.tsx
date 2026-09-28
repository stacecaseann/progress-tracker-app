import { GoalType } from "@/goals/GoalType";
import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AddCountGoal from "./AddCountGoal";
import AddFrequencyGoal from "./AddFrequencyGoal";
import AddProgressGoal from "./AddProgressGoal";
import AddStreakGoal from "./AddStreakGoal";

//This is the main page for entering a goal.
//Once you pick a goal type, the corresponding add goal form displays
export default function AddGoals() {
  const [goalType, setGoalType] = useState<GoalType>("count");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Count — Track how much you do", value: "count" },
    { label: "Frequency — Do it X times per week/month", value: "frequency" },
    { label: "Progress — Work toward a total", value: "progress" },
    { label: "Streak — Keep consecutive days going", value: "streak" },
  ]);
  return (
    <View style={{ zIndex: 1000, gap: 16, padding: 16 }}>
      <DropDownPicker
        open={open}
        value={goalType}
        items={items}
        setOpen={setOpen}
        setValue={setGoalType}
        setItems={setItems}
        zIndex={1000}
        zIndexInverse={1000}
      ></DropDownPicker>
      <View style={{ zIndex: 1 }}>
        {goalType === "count" && <AddCountGoal></AddCountGoal>}
        {goalType === "frequency" && <AddFrequencyGoal></AddFrequencyGoal>}
        {goalType === "progress" && <AddProgressGoal></AddProgressGoal>}
        {goalType === "streak" && <AddStreakGoal></AddStreakGoal>}
      </View>
    </View>
  );
}
