import { useGoals } from "@/context/GoalProvider";
import { CountGoal } from "@/goals/CountGoal";
import { CountGoalData } from "@/goals/CountGoalData";
import { createGoalId } from "@/goals/dataUtil";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import GoalDescription from "../fields/GoalDescription";
import StartDateWeb from "../fields/StartDate.web";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import ValueUnitPicker from "../fields/ValueUnitPicker";

export default function AddCountGoal() {
  const { setGoals } = useGoals();
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 0, 1));
  const [name, setName] = useState<string>("");
  const [valueUnit, setValueUnit] = useState<ValueUnit>("min");

  //This is the form for entering a count goal
  function handleSubmit(): void {
    const goalData: CountGoalData = {
      id: createGoalId(),
      name: name,
      type: "count",
      valueUnit: valueUnit,
      startDate: startDate,
    };
    const goal = new CountGoal(goalData);
    setGoals((previousGoals) => [...previousGoals, goal]);
    console.log(
      "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
    );
    //reset values
    setName("");
    router.back();
  }

  return (
    <View
      style={{
        gap: 16,
      }}
    >
      <GoalDescription name={name} setName={setName}></GoalDescription>
      <ValueUnitPicker
        valueUnit={valueUnit}
        setValueUnit={setValueUnit}
      ></ValueUnitPicker>
      {/* <StartDate startDate={startDate} setStartDate={setStartDate}></StartDate> */}
      <StartDateWeb
        startDate={startDate}
        setStartDate={setStartDate}
      ></StartDateWeb>
      <SubmitAddGoal handleSubmit={handleSubmit}></SubmitAddGoal>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 12,
  },
  inputWithLabel: {
    gap: 8,
  },
  label: {
    fontSize: 8,
  },
});
