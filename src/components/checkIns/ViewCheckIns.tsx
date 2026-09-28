import { useGoals } from "@/context/GoalProvider";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import GoalPicker from "../fields/GoalPicker";

//This form is where you can view all the checkins for each goal
export default function ViewCheckIns() {
  const { goals, checkIns, setCheckIns } = useGoals();
  const [goalId, setGoalId] = useState<string | null>(null);

  const currentGoal = goals.find((goal) => goal.id === goalId);

  function handleAdd() {
    router.push({
      pathname: "/checkIns/add",
      params: {
        goalId: goalId,
        valueUnit: currentGoal?.valueUnit,
        goalName: currentGoal?.name,
      },
    });
  }

  //Add this functionality later
  // function handleEdit(goalId: string) {
  //   router.push({
  //     pathname: "/goals/edit",
  //     params: { goalId: goalId },
  //   });
  // }

  //TODO handle later
  function handleDelete(checkInId: string) {
    console.log("Delete checkin " + { checkInId });
    setCheckIns((previousCheckIns) =>
      previousCheckIns.filter((checkIn) => checkIn.id !== checkInId)
    );
  }

  return (
    <View
    // contentContainerStyle={{
    //   gap: 16,
    //   padding: 16,
    // }}
    >
      <GoalPicker
        goals={goals}
        goalId={goalId}
        setGoalId={setGoalId}
      ></GoalPicker>
      {checkIns
        .filter((checkIn) => checkIn.goalId === goalId)
        .map((checkIn) => {
          return (
            <View
              key={checkIn.id}
              style={{
                padding: 20,
                borderRadius: 20,
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text>{checkIn.checkInDate.toLocaleString()}</Text>
              <Text>
                {checkIn.value} {currentGoal?.valueUnit}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                {/* <Pressable
                onPress={() => handleEdit(goal.id)}
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
                  Edit
                </Text>
              </Pressable> */}
                <Pressable
                  onPress={() => handleDelete(checkIn.id)}
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
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      <Pressable
        onPress={() => handleAdd()}
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
          Add Check-In
        </Text>
      </Pressable>
    </View>
  );
}
