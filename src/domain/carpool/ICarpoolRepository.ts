import { Carpool } from "./Carpool";
import { CarpoolDetail } from "./CarpoolDetail";
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

export interface UpdateCarpoolData {
  driverId?: number;

  carInfo?: string;
  departureTime?: string;

  origin?: string;
  originDetailed?: string | null;

  destination?: string;
  destinationDetailed?: string | null;

  seatsTotal?: number;
  seatsLeft?: number;

  isArrived?: boolean;
  note?: string;

  originLat?: number;
  originLng?: number;

  destLat?: number;
  destLng?: number;
}


export interface ICarpoolRepository {
  getAvailableCarpools(userId?: number): Promise<CarpoolDetail[]>;
  getParticipatingCarpools(userId: number): Promise<CarpoolDetail[]>;

  getAllCarpools(): Promise<Carpool[]>;
  createCarpool(data: CreateCarpoolData): Promise<Carpool>;

  getCarpoolById(id: number): Promise<Carpool>;
  getCarpoolDetail(id: number): Promise<CarpoolDetail>;

  findMyCarpools(userId: number): Promise<CarpoolDetail[]>;

  updateCarpool(id: number, data: UpdateCarpoolData): Promise<Carpool>;

  joinCarpool(userId: number, roomId: number): Promise<boolean>;
  leaveCarpool(userId: number, roomId: number): Promise<boolean>;

  deleteCarpool(id: number): Promise<boolean>;

  updateCarpoolStatus(roomId: number, newStatus: CarpoolStatus): Promise<Carpool>;
}
