import * as Crypto from "expo-crypto";
//Creates the goal id
export function createGoalId(): string {
  console.log("In create goal id");
  return Crypto.randomUUID();
}

//creates check in id
export function createCheckInId(): string {
  console.log("In create checkIn id");
  return Crypto.randomUUID();
}

export function dateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
