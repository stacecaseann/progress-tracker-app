import { FrequencyUnit } from "@/goals/FrequencyUnit";
import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type FrequencyUnitPickerProps = {
  frequencyUnit: FrequencyUnit;
  setFrequencyUnit: React.Dispatch<React.SetStateAction<FrequencyUnit>>;
};
//This is the field where you enter the frequency unit
export default function FrequencyUnitPicker({
  frequencyUnit,
  setFrequencyUnit,
}: FrequencyUnitPickerProps) {
  const [open, setOpen] = useState(false);
  // The choices in the dropdown
  const [items, setItems] = useState([
    { label: "Daily", value: "day" },
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
  ]);
  return (
    <View style={{ zIndex: 1000 }}>
      <DropDownPicker
        open={open}
        value={frequencyUnit}
        items={items}
        setOpen={setOpen}
        setValue={setFrequencyUnit}
        setItems={setItems}
        zIndex={1000}
        zIndexInverse={1000}
      ></DropDownPicker>
    </View>
  );
}
