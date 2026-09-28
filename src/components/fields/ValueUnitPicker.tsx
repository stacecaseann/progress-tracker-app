import { ValueUnit } from "@/goals/ValueUnit";
import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type ValueUnitPickerProps = {
  valueUnit: ValueUnit;
  setValueUnit: React.Dispatch<React.SetStateAction<ValueUnit>>;
};
//This is the field that saves the value unit for each goal
export default function ValueUnitPicker({
  valueUnit,
  setValueUnit,
}: ValueUnitPickerProps) {
  const [open, setOpen] = useState(false);
  // The choices in the dropdown
  const [items, setItems] = useState([
    { label: "Minutes", value: "min" },
    { label: "Hours", value: "hour" },
    { label: "Pages", value: "pages" },
  ]);
  return (
    <View style={{ zIndex: 1000 }}>
      <DropDownPicker
        open={open}
        value={valueUnit}
        items={items}
        setOpen={setOpen}
        setValue={setValueUnit}
        setItems={setItems}
        zIndex={1000}
        zIndexInverse={1000}
      ></DropDownPicker>
    </View>
  );
}
