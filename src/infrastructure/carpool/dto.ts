export interface CreateCarpoolRequestDto {
  driverId: number;
  carInfo: string;
  departureTime: string; // date-time
  origin: string;
  originDetailed?: string | null;
  destination: string;
  destinationDetailed?: string | null;
  seatsTotal: number;
  note: string;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

export interface ParticipationCarpoolRequestDto {
  userId: number;
  roomId: number;
}

export type CarpoolStatusDto = 'before_departure' | 'in_transit' | 'arrived';

export interface UpdateCarpoolStatusRequestDto {
  roomId: number;
  newStatus: CarpoolStatusDto;
}

export interface CarpoolResponseDto {
  id: number;
  driverId: number;
  carInfo?: string | null;
  departureTime: string;

  origin: string;
  originDetailed?: string | null;

  destination: string;
  destinationDetailed?: string | null;

  seatsTotal: number;
  seatsLeft: number;

  note: string;

  originLat?: number | null;
  originLng?: number | null;
  destLat?: number | null;
  destLng?: number | null;

  status: CarpoolStatusDto;
  isArrived: boolean;

  createdAt: string;
  updatedAt: string;
}
