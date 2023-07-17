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

export type authProfileType = {
  status: number;
  user: {
    id: number;
    is_approve: boolean;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_coach: boolean;
  };
};

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
    return authInstance.get<authProfileType>("profile", {
      headers: { Authorization: `access ${access}` },
    });
  },
};
