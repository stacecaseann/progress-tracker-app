import { describe, expect, test } from "@jest/globals";
import {
  addDay,
  addMonth,
  addWeek,
  daysBetween,
  monthsBetween,
  weeksBetween,
} from "../src/utils/dateUtil";
describe("daysBetween", () => {
  test("no days", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 1);
    expect(daysBetween(startDate, endDate)).toBe(0);
  });
  test("1 day", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 2);
    expect(daysBetween(startDate, endDate)).toBe(1);
  });
  test("1 year", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 31);
    expect(daysBetween(startDate, endDate)).toBe(364);
  });
});

describe("weeksBetween", () => {
  test("no days", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 1);
    expect(weeksBetween(startDate, endDate)).toBe(0);
  });
  test("half week", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 3);
    expect(weeksBetween(startDate, endDate)).toBe(1);
  });
  test("7 days", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 8);
    expect(weeksBetween(startDate, endDate)).toBe(1);
  });
  test("1 year", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 31);
    expect(weeksBetween(startDate, endDate)).toBe(52);
  });
  test("close to 1 year", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 27);
    expect(weeksBetween(startDate, endDate)).toBe(52);
  });
});

describe("addDay", () => {
  test("add", () => {
    const startDate = new Date(2026, 0, 1);
    expect(addDay(startDate).getTime()).toBe(new Date(2026, 0, 2).getTime());
  });
  test("over month end", () => {
    const startDate = new Date(2026, 0, 31);
    expect(addDay(startDate).getTime()).toBe(new Date(2026, 1, 1).getTime());
  });
  test("over year end", () => {
    const startDate = new Date(2026, 11, 31);
    expect(addDay(startDate).getTime()).toBe(new Date(2027, 0, 1).getTime());
  });
});

describe("addWeek", () => {
  test("begOfMonth", () => {
    const startDate = new Date(2026, 0, 1);
    expect(addWeek(startDate).getTime()).toBe(new Date(2026, 0, 8).getTime());
  });
  test("over month end", () => {
    const startDate = new Date(2026, 0, 30);
    expect(addWeek(startDate).getTime()).toBe(new Date(2026, 1, 6).getTime());
  });
  test("over year end", () => {
    const startDate = new Date(2026, 11, 30);
    expect(addWeek(startDate).getTime()).toBe(new Date(2027, 0, 6).getTime());
  });
});

describe("addMonth", () => {
  test("begOfMonth", () => {
    const startDate = new Date(2026, 0, 1); //because it's 30 days default
    expect(addMonth(startDate)).toEqual(new Date(2026, 0, 31));
  });
  test("over month end", () => {
    const startDate = new Date(2026, 0, 25);
    expect(addMonth(startDate)).toEqual(new Date(2026, 1, 24));
  });
  test("over year end", () => {
    const startDate = new Date(2026, 11, 25);
    expect(addMonth(startDate)).toEqual(new Date(2027, 0, 24));
  });
});
describe("monthsBetween", () => {
  test("no days", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 1);
    expect(monthsBetween(startDate, endDate)).toBe(0);
  });
  test("half month", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 15);
    expect(monthsBetween(startDate, endDate)).toBe(1);
  });
  test("1 month", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 0, 31);
    expect(monthsBetween(startDate, endDate)).toBe(1);
  });
  test("1 year", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 31);
    expect(monthsBetween(startDate, endDate)).toBe(13);
  });
  test("close to 1 year", () => {
    const startDate = new Date(2026, 0, 1);
    const endDate = new Date(2026, 11, 27);
    expect(monthsBetween(startDate, endDate)).toBe(12);
  });
});
