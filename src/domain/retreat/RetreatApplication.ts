export interface RetreatApplication {
  id: number;
  userId: string;
  feePaid: boolean;
  attended: boolean;
  checkedInAt: string | null;
  checkedInBy: string | null;
  eventResult: "WIN" | "LOSE" | null;
  eventParticipatedAt: string | null;
}
