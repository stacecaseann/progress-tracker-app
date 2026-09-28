import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CheckInData } from "../checkIns/CheckIn.js";
import type { AllGoalData } from "../goals/AllGoalData.js";

//This will save the array of Goals that have been convereted to data to the json file
//AllGoalData can be any type of goal data
export async function saveGoalsToStorage(data: AllGoalData[]) {
  const json = JSON.stringify(data, null, 2); //null means don't filter anythig, 2 means indent the json 2 spaces
  await AsyncStorage.setItem("goals", json);
}

//This will take the json file and return the goal data, which can be in any goal shape
export async function readGoalsFromStorage(): Promise<AllGoalData[] | undefined> {
  const json = await AsyncStorage.getItem("goals");
  if (json !== null) {
    const goals = JSON.parse(json);
    console.log(goals);
    return goals;
  }
}

//This will get the check-ins from the json file in the data format
export async function saveCheckInsToStorage(data: CheckInData[]) {
  const json = JSON.stringify(data, null, 2); //null means don't filter anythig, 2 means indent the json 2 spaces
  await AsyncStorage.setItem("checkIns", json);
}

//This will save the check-ins from the data format to json
export async function readCheckInsFromStorage(): Promise<
  CheckInData[] | undefined
> {
  const json = await AsyncStorage.getItem("checkIns");
  if (json !== null) {
    const checkIns = JSON.parse(json);
    console.log(checkIns);
    return checkIns;
  }
}
