import { NavInfo, Paging } from '../types';
import { Application, IsLoading, User } from '../types/states';

export const DefaultPaging = <Paging>{
  currentPage: 0,
  pageSize: 5,
  hasNext: true,
};

export const DefaultNavInfo = <NavInfo>{
  page: '',
  history: [],
};


export const DefaultUser = <User>{
  id: null,
  userId: "",
  rank: "M",
  password: "",
  name: "",
  group: "",
  phone: "",
  birth: "",
  gender: "",
};

export const DefaultApplication = <Application>{
  id: null,
  idn: "000000-0000000",
  surveyData: {
    meal: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    transfer: {
      transfer: "",
      "own-car": "",
      bus: [0, 0],
    },
  },
  attended: false,
  feePaid: false,
  createdAt: null,
  updatedAt: null,
  userId: null,
  retreatId: null,
};

export const DefaultIsLoading = <IsLoading>{
  isLoading: false,
};