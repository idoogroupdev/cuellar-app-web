export interface BranchNode {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  isPickupEnabled: boolean;
}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface BranchHourNode {
  id: string;
  dayOfWeek: DayOfWeek | undefined;
  fromHour: string;
  toHour: string;
}
