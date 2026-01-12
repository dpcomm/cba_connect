import { CarpoolStatus } from './CarpoolStatus';

export class Carpool {
  constructor(
    public readonly id: number,
    public readonly driverId: number,
    public readonly carInfo: string | null,
    public readonly departureTime: string,
    public readonly origin: string,
    public readonly originDetailed: string | null,
    public readonly destination: string,
    public readonly destinationDetailed: string | null,
    public readonly seatsTotal: number,
    public readonly seatsLeft: number,
    public readonly note: string,
    public readonly originLat: number | null,
    public readonly originLng: number | null,
    public readonly destLat: number | null,
    public readonly destLng: number | null,
    public readonly status: CarpoolStatus,
    public readonly isArrived: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}
}
