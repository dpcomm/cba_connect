import { MealType, TransportType } from "./ApplicationOption";

export type ApplicationStatus = "SUBMITTED" | "CANCELED" | "CHECKED_IN";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "EXEMPTED";
export type TransportDirection = "DEPARTURE" | "RETURN";

export interface ApplicationDetailMeal {
  id: number; // retreatMeal.id (옵션 식사 id)
  mealDay: string;
  mealType: MealType;
}

export interface ApplicationDetailTransport {
  transportId: number; // retreatTransport.id (옵션 교통수단 id)
  direction: TransportDirection;
  transportType: TransportType;
  vehicleNumber: string | null;
}

export interface ApplicationDetail {
  id: number;
  retreatId: number;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  meals: ApplicationDetailMeal[];
  transports: ApplicationDetailTransport[];
}
