import { StyleSheet, TextInput, View } from "react-native";

type FrequencyProps = {
  frequency: string;
  setFrequency: React.Dispatch<React.SetStateAction<string>>;
};
//This is the field where you enter the frequency
export default function Frequency({ frequency, setFrequency }: FrequencyProps) {
  return (
    <View style={styles.inputWithLabel}>
      <TextInput
        placeholder="Goal Frequency"
        editable
        onChangeText={(inputFrequency) => setFrequency(inputFrequency)}
        value={frequency}
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
