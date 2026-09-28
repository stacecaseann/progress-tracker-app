import { StyleSheet, TextInput, View } from "react-native";

type GoalDescriptionProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};
//This is the field where you save the goal description
export default function GoalDescription({
  name,
  setName,
}: GoalDescriptionProps) {
  return (
    <View style={styles.inputWithLabel}>
      <TextInput
        placeholder="Goal Description"
        editable
        onChangeText={(inputValue) => setName(inputValue)}
        value={name}
        style={styles.textInput}
      ></TextInput>
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
