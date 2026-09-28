import { CountGoalProgress } from "@/goals/CountGoalProgress";
import { FrequencyGoalProgress } from "@/goals/FrequencyGoalProgress";
import { GoalProgress } from "@/goals/GoalProgress";
import { GoalType } from "@/goals/GoalType";
import { ProgressGoalProgress } from "@/goals/ProgressGoalProgress";
import { StreakGoalProgress } from "@/goals/StreakGoalProgress";
import { CountGoalProgressDisplay } from "./CountGoalProgressDisplay";
import { FrequencyGoalProgressDisplay } from "./FrequencyGoalProgressDisplay";
import { ProgressGoalProgressDisplay } from "./ProgressGoalProgressDisplay";
import { StreakGoalProgressDisplay } from "./StreakGoalProgressDisplay";
//This is used on the main page's goal card
//It will toggle the progress display based on goal type
export function GoalProgressDisplay({
  goalType,
  goalProgress,
}: {
  goalType: GoalType;
  goalProgress: GoalProgress;
}) {
  switch (goalType) {
    case "count":
      return (
        <CountGoalProgressDisplay
          progress={goalProgress as CountGoalProgress}
        ></CountGoalProgressDisplay>
      );
    case "frequency":
      return (
        <FrequencyGoalProgressDisplay
          progress={goalProgress as FrequencyGoalProgress}
        ></FrequencyGoalProgressDisplay>
      );
    case "progress":
      return (
        <ProgressGoalProgressDisplay
          progress={goalProgress as ProgressGoalProgress}
        ></ProgressGoalProgressDisplay>
      );
    case "streak":
      return (
        <StreakGoalProgressDisplay
          progress={goalProgress as StreakGoalProgress}
        ></StreakGoalProgressDisplay>
      );
    default:
      throw new Error(`Goal Type is not supported`);
  }
}
