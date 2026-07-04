export interface BranchNode {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  isPickupEnabled: boolean;
}

export interface BranchHourNode {
  id: string;
  dayOfWeek: string;
  fromHour: string;
  toHour: string;
}
