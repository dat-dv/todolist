export type TUser = {
  username: string;
  createdAt: string;
  id: number;
};

export type TUserLoginReq = {
  username: string;
  password: string;
};

export type TUserLoginRes = {
  expiresAt: string;
  token: string;
  user: TUser;
};
