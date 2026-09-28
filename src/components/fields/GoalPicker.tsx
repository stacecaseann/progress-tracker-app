import { Goal } from "@/goals/Goal";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type GoalPickerProps = {
  goals: Goal[];
  goalId: string | null;
  setGoalId: React.Dispatch<React.SetStateAction<string | null>>;
};
//This is a field that lets you pick a goal 
export default function GoalPicker({
  goals,
  goalId,
  setGoalId,
}: GoalPickerProps) {
  const [open, setOpen] = useState(false);
  // The choices in the dropdown
  const [items, setItems] = useState(
    goals.map((goal) => ({
      label: goal.name,
      value: goal.id,
    }))
  );
  useEffect(() => {
    setItems(
      goals.map((goal) => ({
        label: goal.name,
        value: goal.id,
      }))
    );
  }, [goals]);
  return (
    <View style={{ zIndex: 1000 }}>
      <DropDownPicker
        open={open}
        value={goalId}
        items={items}
        setOpen={setOpen}
        setValue={setGoalId}
        setItems={setItems}
        zIndex={1000}
        zIndexInverse={1000}
      ></DropDownPicker>
    </View>
  );
}
