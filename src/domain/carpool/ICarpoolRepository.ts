import { Carpool } from "./Carpool";
import { CarpoolStatus } from "./CarpoolStatus";

export interface CreateCarpoolData {
  driverId: number;
  carInfo: string;
  departureTime: string;
  origin: string;
  originDetailed: string;
  destination: string;
  destinationDetailed: string;
  seatsTotal: number;
  note?: string;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

export interface UpdateCarpoolData extends CreateCarpoolData {
}

export interface ICarpoolRepository {
  getAvailableCarpools(userId?: number): Promise<Carpool[]>;
  getParticipatingCarpools(userId: number): Promise<Carpool[]>;

  getAllCarpools(): Promise<Carpool[]>;
  createCarpool(data: CreateCarpoolData): Promise<Carpool>;

  getCarpoolById(id: number): Promise<Carpool>;
  getCarpoolDetail(id: number): Promise<Carpool>;

  findMyCarpools(userId: number): Promise<Carpool[]>;

  updateCarpool(id: number, data: UpdateCarpoolData): Promise<Carpool>;

  joinCarpool(userId: number, roomId: number): Promise<boolean>;
  leaveCarpool(userId: number, roomId: number): Promise<boolean>;

  deleteCarpool(id: number): Promise<boolean>;

  updateCarpoolStatus(roomId: number, newStatus: CarpoolStatus): Promise<Carpool>;
}
