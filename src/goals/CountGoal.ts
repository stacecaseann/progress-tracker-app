import type { GoalType } from "./GoalType";
import { Goal } from "./Goal";
import type { CountGoalData, CountGoalUpdates } from "./CountGoalData";
import type { CheckIn } from "../checkIns/CheckIn";
import type { GoalProgress } from "./GoalProgress";
import { CountGoalProgress } from "./CountGoalProgress";

//The Count Goal class is a goal where you just save the unit
//such as min, hours, or pages read and every check-in counts up the hours that you've completed
//There is no deadline or specific goal amount to reach
//This class extends the Goal class
export class CountGoal extends Goal {
  readonly type: GoalType = "count";

  //The constructor will pass the base data to the Goal class
  constructor(data: CountGoalData) {
    super(data);
  }

  //This overrides the base class and updates the goal class with the updated data
  override updateGoal(updateData: CountGoalUpdates): CountGoal {
    return new CountGoal({
      ...this,
      ...updateData,
    });
  }

  //This overrides the base class and calculates progress by adding up all the check-ins for this goal
  override calculateProgress(checkIns: CheckIn[]): CountGoalProgress {
    const total = checkIns
    .filter((checkIn) => checkIn.goalId === this.id)
    .reduce((total, checkIn) => total + checkIn.value, 0);
    return {
      type: "count",      
      totalValue: total,
      valueUnit: this.valueUnit,
      description: `${total} ${this.valueUnit} completed!`,
    };
  }

  //This is a property that returns the description for this type of goal
  get description(): string {
    return `${this.name} (count ${this.valueUnit})`;
  }

  //This converts the Goal object to the Data object that will be saved in the json file
  override toData(): CountGoalData {
    return {
      id: this.id,
      name: this.name,
      type: "count",
      startDate: this.startDate,
      valueUnit: this.valueUnit,
    };
  }
}
