import request from './request';

export const requestLogin = (userId: string, password: string, autoLogin: boolean) => {
  return request.post('/api/user/login', {
    userId,
    password,
    autoLogin,
  });
};

export const requestLogout = (id: number | null) => {
  return request.post('/api/user/logout', {
    id
  });
};

export const requestRegister =
(
  userId: string,
  password: string,
  name: string,
  group: string,
  phone: string,
  birth: string,
  gender: string,
  etcGroup?: string
) => {
  return request.post('/api/user/register', {
    userId,
    password,
    name,
    group,
    phone,
    birth,
    gender,
    etcGroup
  });
};


export const updateUserInfo = (
  userId: string,
  name: string,
  // password: string,
  gender: string,
  phone: string,
  group: string,
  birth: string
) => {
  return request.post('/api/user/update', {
    userId,
    name,
    // password,
    gender,
    phone,
    group,
    birth,
  });
};


export const requestRefresh = (accessToken: string | null, refreshToken: string | null) => {
  return request.post('/api/user/refresh', {
    accessToken,
    refreshToken
  });
};

export const requestAuthCheck = (accessToken: string | null, refreshToken: string | null) => {
  return request.post('/api/user', {
    accessToken,
    refreshToken
  });
};

export const requestApplicationByUserAndRetreatId = (userId: string | null, retreatId?: number) => {
  return request.get(`/api/application/${userId}/${retreatId}`);
};

export const requestApplication = (
  userId: string | null,
  retreatId: number,
  meal?: number[][],
  transfer?: string,
  bus?: number[],
  carId?: string,
  isLeader: boolean = false,
  childCount?: number 
) => {
  return request.post('/api/application', {
    userId,
    retreatId,
    meal,
    transfer,
    bus,
    carId,
    isLeader,
    childCount
  });
};

export const requestUserGroup = (
  userId: string,
  group: string  // 개편으로 인한 소그룹 변경 확인 필요
) => {
  return request.post(`/api/user/${userId}/group`, {
    userId,
    group
  });
};

export const requestUserBirth = (
  userId: string,
  birth: string  // 개편으로 인한 소그룹 변경 확인 필요
) => {
  return request.post(`/api/user/${userId}/birth`, {
    userId,
    birth
  });
};

export const requestYoutube = () => {
  return request.get('/api/youtube');
};

export const requestPray = () => {
  return request.get('/api/pray');
};

export const requestCreatePray = (userId: number | null, content: string) => {
  return request.post('/api/pray', {
    userId: userId,
    content: content
  });
};

export const requestDeletePray = (id: number) => {
  return request.delete(`/api/pray/${id}`);
};

export const requestCheckUserWithoutPassword = (
  userId: string,
  name: string,
  gender: string,
  phone: string,
  group: string,
  birth: string,
  password?: string
) => {
  return request.post('/api/user/check-user', {
    userId,
    password,
    name,
    gender,
    phone,
    group,
    birth,
  });
};

export const requestResetPassword = (
  userId: string,
  password: string,
) => {
  return request.post('/api/user/reset-password', {
    userId,
    password,
  });
};

export const requestApplicationVersion = () => {
  return request.get('/api/status/version/application');
};

export const requestUserDelete = (userId: number) => {
  return request.post('/api/user/delete', {
    id: userId
  });
};