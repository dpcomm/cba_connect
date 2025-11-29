export interface User {
  id: number | null,
  userId: string,
  rank: string,
  password: string,
  name: string,
  group: string,
  phone: string,
  birth: string,
  gender: string,
}

export interface Application {
  id: number | null;
  idn: string;
  surveyData: {
    meal: number[][];
    transfer: {
      transfer: string;
      "own-car": string;
      bus: [number, number];
      isLeader: boolean;
    };
  };
  attended: boolean;
  feePaid: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  retreatId: number;
}

export interface Youtube {
  id: number;
  retreatId: number;
  title: string;
  link: string;
  createdAt: string;
}

export interface IsLoading {
  isLoading: boolean
}