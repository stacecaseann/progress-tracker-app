import { useGoals } from "@/context/GoalProvider";
import { createGoalId } from "@/goals/dataUtil";
import { FrequencyGoal } from "@/goals/FrequencyGoal";
import { FrequencyGoalData } from "@/goals/FrequencyGoalData";
import { FrequencyUnit } from "@/goals/FrequencyUnit";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Frequency from "../fields/Frequency";
import FrequencyUnitPicker from "../fields/FrequencyUnitPicker";
import GoalDescription from "../fields/GoalDescription";
import StartDate from "../fields/StartDate";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import Value from "../fields/Value";
import ValueUnitPicker from "../fields/ValueUnitPicker";
import StartDateWeb from "../fields/StartDate.web";

//This is the form for entering a frequency goal
export default function AddFrequencyGoal() {
  const { setGoals } = useGoals();
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 0, 1));
  const [name, setName] = useState<string>("");
  const [valueUnit, setValueUnit] = useState<ValueUnit>("min");
  const [value, setValue] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>("week");
  function handleSubmit(): void {
    const goalData: FrequencyGoalData = {
      id: createGoalId(),
      name: name,
      type: "frequency",
      valueUnit: valueUnit,
      startDate: startDate,
      value: Number(value),
      frequency: Number(frequency),
      frequencyUnit: frequencyUnit,
      dateBy: undefined,
    };
    const goal = new FrequencyGoal(goalData);
    setGoals((previousGoals) => [...previousGoals, goal]);
    console.log(
      "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
    );
    //reset values
    setName("");
    router.back();
  }

  return (
    <View style={styles.inputWithLabel}>
      <GoalDescription name={name} setName={setName}></GoalDescription>
      <Value value={value} setValue={setValue}></Value>
      <ValueUnitPicker
        valueUnit={valueUnit}
        setValueUnit={setValueUnit}
      ></ValueUnitPicker>
      <Frequency frequency={frequency} setFrequency={setFrequency}></Frequency>
      <FrequencyUnitPicker
        frequencyUnit={frequencyUnit}
        setFrequencyUnit={setFrequencyUnit}
      ></FrequencyUnitPicker>
      <StartDateWeb startDate={startDate} setStartDate={setStartDate}></StartDateWeb>
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
