//This will be the type of goal check-ins
export type CheckIn = {
  id: string;
  goalId: string;
  checkInDate: Date;
  value: number;
};

//This will be the type of goal check-ins saved to json where the date is a string
export type CheckInData = {
  id: string;
  goalId: string;
  checkInDate: string;
  value: number;
};
