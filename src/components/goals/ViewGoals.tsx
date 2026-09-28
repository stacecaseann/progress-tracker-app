import { useGoals } from "@/context/GoalProvider";
import { goalColors } from "@/goals/goalColors";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
//This page lets you view all goals and delete or add a new goal
export default function ViewGoals() {
  const { goals, setGoals } = useGoals();
  function handleAdd() {
    router.push({
      pathname: "/goals/add",
    });
  }

  //Add this functionality later
  // function handleEdit(goalId: string) {
  //   router.push({
  //     pathname: "/goals/edit",
  //     params: { goalId: goalId },
  //   });
  // }

  function handleDelete(goalId: string) {
    console.log("Delete goal " + { goalId });
    setGoals((previousGoals) =>
      previousGoals.filter((goal) => goal.id !== goalId)
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {goals.map((goal) => {
        return (
          <View
            key={goal.id}
            style={{
              backgroundColor: goalColors[goal.type] + "50",
              padding: 20,
              borderRadius: 20,
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text>{goal.description}</Text>
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
                onPress={() => handleDelete(goal.id)}
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
          Add New Goal
        </Text>
      </Pressable>
    </ScrollView>
  );
}
