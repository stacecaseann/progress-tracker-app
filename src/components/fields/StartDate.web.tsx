import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Text, View } from "react-native";

type StartDateProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
};
//This is the field that enters a start date for a goal
//I am using this when emulating the app on the web only
export default function StartDateWeb({
  startDate,
  setStartDate,
}: StartDateProps) {
  const dateString = startDate.toISOString().split("T")[0];

  function handleDateChange(
    event: DateTimePickerEvent,
    date?: Date | undefined
  ): void {
    if (date) setStartDate(date);
  }

  return (
    <View style={{ gap: 6 }}>
      <Text>Start Date</Text>

      <input
        type="date"
        value={dateString}
        onChange={(event) => {
          setStartDate(new Date(event.target.value + "T00:00:00"));
        }}
        style={{
          padding: 10,
          borderRadius: 8,
          border: "1px solid #999",
          fontSize: 16,
          fontFamily: "system-ui",
        }}
      />
    </View>
  );
}
