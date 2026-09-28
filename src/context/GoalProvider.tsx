import { CheckIn } from "@/checkIns/CheckIn";
import { initialCheckIns } from "@/goals/data/initialCheckIns";
import { initialGoals } from "@/goals/data/initialGoals";
import { Goal } from "@/goals/Goal";
import {
  loadCheckIns,
  loadGoals,
  saveCheckIns,
  saveGoals,
} from "@/goals/goals";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GoalContext } from "./GoalContext";

//The Goal Provider passes the goals, checkins, and ability to set those values
//through the entire app
export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function resetAllValues() {
    setGoals(initialGoals);
    setCheckIns(initialCheckIns);
    await saveGoals(goals);
    await saveCheckIns(checkIns);
  }
  async function loadInitialGoals() {
    console.log("Loading goals");
    const goals = await loadGoals();
    console.log("Loading goals" + goals);
    if (goals.length === 0) {
      console.log("Initializing goals from test data");
      setGoals(initialGoals);
    } else {
      setGoals(goals);
    }
  }
  async function loadInitialCheckIns() {
    console.log("Loading Checkins");
    const checkIns = await loadCheckIns();
    console.log("Loading Checkins" + checkIns);
    if (checkIns.length === 0) {
      console.log("Initializing checkIns from test data");
      setCheckIns(initialCheckIns);
    } else {
      setCheckIns(checkIns);
    }
  }
  async function loadInitialData() {
    await loadInitialGoals();
    await loadInitialCheckIns();
    setIsLoaded(true);
  }

  useEffect(() => {
    console.log("Mounting");

    loadInitialData();
  }, []);
  //TODO In the future, use a useRef hook so that it doesn't save as soon as it loads
  useEffect(() => {
    if (!isLoaded) return;

    async function saveChangedGoals() {
      console.log("Saving goals");
      await saveGoals(goals);
    }
    saveChangedGoals();
  }, [goals]);

  useEffect(() => {
    if (!isLoaded) return;

    async function saveChangedCheckIns() {
      console.log("Saving checkIns");
      await saveCheckIns(checkIns);
    }
    saveChangedCheckIns();
  }, [checkIns]);

  return (
    <GoalContext.Provider
      value={{ goals, setGoals, checkIns, setCheckIns, resetAllValues }}
    >
      {children}
    </GoalContext.Provider>
  );
}

//This is a custom hook that catches the error every time I use it in the wrong place without being wrapped in goalprovider
export function useGoals() {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error("useGoals must be used within GoalProvider");
  }

  return context;
}
