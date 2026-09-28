import { StyleSheet, TextInput, View } from "react-native";

type ValueProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
//This is the field that saves the value for each goal 
export default function Value({ value, setValue }: ValueProps) {
  return (
    <View style={styles.inputWithLabel}>
      <TextInput
        placeholder="Goal Value Per Day"
        editable
        onChangeText={(inputValue) => setValue(inputValue)}
        value={value}
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
