import { Pressable, Text } from "react-native";

type SubmitAddGoalProps = {
  handleSubmit: () => void;
};
//The is the submit button used by all goals
export default function SubmitAddGoal({ handleSubmit }: SubmitAddGoalProps) {
  return (
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
        Add Goal
      </Text>
    </Pressable>
  );
}
