import { GoalProgressDisplay } from "@/components/GoalProgressDisplay";
import { useGoals } from "@/context/GoalProvider";
import { goalColors } from "@/goals/goalColors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

//This is the default page for the entire app
export default function Index() {
  const { goals, checkIns, resetAllValues } = useGoals();
  //add reset to load initially from file again
  function handleReset(): void {
    resetAllValues();
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {goals.map((goal) => {
        const progress = goal.calculateProgress(checkIns, new Date(2026, 9, 1));
        return (
          <View
            key={goal.id}
            style={{
              backgroundColor: goalColors[goal.type] + "50",
              padding: 20,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text>{goal.description}</Text>
            <GoalProgressDisplay
              goalType={goal.type}
              goalProgress={progress}
            ></GoalProgressDisplay>
          </View>
        );
      })}
      <View>
        <Pressable onPress={handleReset}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
