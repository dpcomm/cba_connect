export type MealType = "BREAKFAST" | "LUNCH" | "DINNER";

export type TransportType =
  | "OWN_CAR"
  | "CARPOOL"
  | "BUS"
  | "PUBLIC"
  | "OTHER";

export interface ApplicationOptionRetreat {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
}

export interface ApplicationOptionGroup {
  value: string;
  label: string;
}

export interface ApplicationOptionMeal {
  id: number;
  mealDay: string;
  mealType: MealType;
}

export interface ApplicationOptionTransport {
  id: number;
  transportType: TransportType;
  name: string;
  isVehicleRequired: boolean;
  isRemarkRequired: boolean;
}

export interface ApplicationOptionTransports {
  departure: ApplicationOptionTransport[];
  return: ApplicationOptionTransport[];
}

export interface ApplicationOptions {
  retreat: ApplicationOptionRetreat;
  groups: ApplicationOptionGroup[];
  meals: ApplicationOptionMeal[];
  transports: ApplicationOptionTransports;
}
