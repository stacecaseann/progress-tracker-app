import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";

type StartDateProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};
//This field is where you enter a start date for the goal
//Right now I am saving the start date but not using it
export default function StartDate({ startDate, setStartDate }: StartDateProps) {
  function handleDateChange(
    event: DateTimePickerEvent,
    date?: Date | undefined
  ): void {
    if (date) setStartDate(date);
  }

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text>Start Date</Text>
      <DateTimePicker
        value={startDate}
        mode="date"
        onChange={handleDateChange}
      />
    </View>
  );
}
