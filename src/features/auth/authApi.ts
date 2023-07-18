import { authInstance } from "@/features/auth/authInstans";

//AUTH API TYPE -------------------------------------
export type AuthRegisterType = {
  email: string;
  username: string;
  password: string;
};

export type AuthApproveType = {
  key: number | null;
};

export type AuthLoginType = Omit<AuthRegisterType, "username">;

//RESPONSE TYPE ======================================================
export type AuthorizationType = {
  User: AuthRegisterType;
};

export enum ResultCode {
  ok = 200,
}

export type UserType = {
  id: number;
  is_approve: boolean;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  is_coach: boolean;
  date_of_birth: null;
  height: null;
  weight: null;
  avatar: null;
};
export type AuthProfileType = {
  status: number;
  user: UserType;
};
export type ProfileDataType = Omit<UserType, "id" | "is_approve" | "avatar" | "username">;

export type ErrorsMessages = {
  token_class?: string;
  token_type?: string;
  message?: string;
};
export type errors = {
  detail?: string;
  code?: string;
  messages?: ErrorsMessages[];
};

//TOKEN LOGIN ---------------------
export type LoginTokenType = {
  refresh: string;
  access: string;
};

export const authApi = {
  register: (data: AuthRegisterType) => {
    return authInstance.post<AuthorizationType>("auth/register/", data);
  },
  login: (data: AuthLoginType) => {
    return authInstance.post<LoginTokenType>("auth/token/", data);
  },
  approve: (data: AuthApproveType, access: string) => {
    return authInstance.post<{ success: boolean }>("auth/approve/", data, {
      headers: { Authorization: `access ${access}` },
    });
  },
  profile: (access: string) => {
    return authInstance.get<AuthProfileType>("profile", {
      headers: { Authorization: `access ${access}` },
    });
  },
  profileUpd: (data: FormData, access: string) => {
    return authInstance.patch<UserType>("profile/update/", data, {
      headers: {
        Authorization: `access ${access}`,
      },
    });
  },
};
