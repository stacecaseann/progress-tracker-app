import { CheckIn } from "@/checkIns/CheckIn";
import { useGoals } from "@/context/GoalProvider";
import { createCheckInId } from "@/goals/dataUtil";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type CheckInFormProps = {
  goalName: string;
  goalId: string;
  valueUnit: string;
};
//This is the form to add a check in for a certain goal
export function CheckInForm({ goalId, valueUnit, goalName }: CheckInFormProps) {
  const { setCheckIns } = useGoals();

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [value, setValue] = useState(0);

  // function handleDateChange(
  //   event: DateTimePickerEvent,
  //   date?: Date | undefined
  // ): void {
  //   if (date) setCheckInDate(date);
  // }

  function handleSubmit(): void {
    if (!goalId) return;
    const dateOnly = new Date(
      checkInDate.getFullYear(),
      checkInDate.getMonth(),
      checkInDate.getDate()
    );
    const checkIn: CheckIn = {
      id: createCheckInId(),
      goalId: goalId,
      checkInDate: dateOnly,
      value: value,
    };
    setCheckIns((previousCheckIns) => [...previousCheckIns, checkIn]);
    console.log(
      "goalId" + goalId + " checkInDate" + checkInDate + " value " + value
    );
    router.back();
  }

  // return (
  //   <Picker
  //     selectedValue={categoryId}
  //     onValueChange={(id) => setCategoryId(id)}
  //   >
  //     {categories.map((category) => (
  //       <Picker.Item
  //         key={category.id}
  //         label={category.name}
  //         value={category.id}
  //       />
  //     ))}
  //   </Picker>
  // );
  const dateString =
    checkInDate.getFullYear() +
    "-" +
    String(checkInDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(checkInDate.getDate()).padStart(2, "0");
  return (
    <View style={{ gap: 6, padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Goal</Text>
      {/* <Picker
        selectedValue={goalId}
        onValueChange={(id) => setSelectedGoalId(id)}
        mode="dropdown"
      >
        {goals.map((goal) => (
          <Picker.Item key={goal.id} label={goal.name} value={goal.id} />
        ))}
      </Picker> */}
      <Text style={{ fontSize: 16, fontWeight: "500" }}>{goalName}</Text>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Check-In Date</Text>
      {/* <DateTimePicker
        value={checkInDate}
        mode="date"
        onChange={handleDateChange}
      /> */}
      <input
        type="date"
        value={dateString}
        onChange={(event) => {
          const [year, month, day] = event.target.value.split("-").map(Number);

          setCheckInDate(new Date(year, month - 1, day));
        }}
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #999",
          fontSize: 16,
          fontFamily: "system-ui",
        }}
      />
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Value</Text>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
        <View style={{ flex: 3 }}>
          <TextInput
            placeholder="20"
            style={{
              borderWidth: 1,
              borderColor: "#999",
              borderRadius: 8,
              padding: 10,
            }}
            onChangeText={(inputValue) => setValue(Number(inputValue))}
          ></TextInput>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{valueUnit}</Text>
        </View>
      </View>
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#397F76",
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Save Check-In
        </Text>
      </Pressable>
    </View>
  );
}
