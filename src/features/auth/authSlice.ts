import { createSlice } from "@reduxjs/toolkit";
import {
  authApi,
  AuthApproveType,
  AuthLoginType,
  AuthorizationType,
  AuthProfileType,
  AuthRegisterType,
  LoginTokenType,
  ResultCode,
  UserType,
} from "@/features/auth/authApi";
import { createAppAsyncThunk } from "@/common/utils/creatAppAsyncThunk";

const register = createAppAsyncThunk<{ authorization: AuthorizationType }, AuthRegisterType>(
  "auth/register",
  async (arg) => {
    const res = await authApi.register(arg);
    return { authorization: res.data };
  }
);

const login = createAppAsyncThunk<{ token: LoginTokenType }, AuthLoginType>("auth/login", async (arg) => {
  const res = await authApi.login(arg);
  return { token: res.data };
});
const logOut = createAppAsyncThunk<{ token: { refresh: null; access: null } }>("auth/logOut", async () => {
  return { token: { refresh: null, access: null } };
});

const profile = createAppAsyncThunk<{ profile: AuthProfileType }>(
  "auth/profile",
  async (_, { getState, rejectWithValue }) => {
    const access = getState().auth.token?.access;
    if (access) {
      const res = await authApi.profile(access);
      if (res.data.status === ResultCode.ok) {
        return { profile: res.data };
      } else {
        return rejectWithValue("email and userName");
      }
    } else {
      return rejectWithValue("Access token is missing");
    }
  }
);
// //Каждый раз запрашивать token на сервере ---------------------------
// const profile = createAppAsyncThunk<{ profile: authProfileType }>(
//   "auth/profile",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       // получаем логин и пароль из стейта или из другого источника
//       const { email, password } = getState().auth.authorization!.User;
//       // вызываем login санку с правильным аргументом и дожидаемся результата
//       await authThunk.login({ email, password });
//       // получаем access из результата или из стейта
//       const access = getState().auth.token?.access;
//       if (access) {
//         // делаем запрос на профиль
//         const res = await authApi.profile(access);
//         return { profile: res.data };
//       } else {
//         // возвращаем отклоненный ответ
//         return rejectWithValue("Access token is missing");
//       }
//     } catch (error: any) {
//       // обрабатываем ошибку login санки или другую ошибку
//       return rejectWithValue(error.message || "Something went wrong");
//     }
//   }
// );

const profileUpd = createAppAsyncThunk<{ profile: { user: UserType } }, FormData>(
  "auth/profileUpdate",
  async (data, { getState, rejectWithValue }) => {
    const access = getState().auth.token?.access;
    if (access) {
      const res = await authApi.profileUpd(data, access);
      return { profile: { user: res.data } };
    } else {
      return rejectWithValue("error upd profile");
    }
  }
);

//проверка почты! -----------------------------------------------
const approve = createAppAsyncThunk<{ success: boolean }, AuthApproveType>(
  "auth/approve",
  async (arg, { getState, rejectWithValue }) => {
    const access = getState().auth.token?.access;
    if (access) {
      const res = await authApi.approve(arg, access);
      return { success: res.data.success };
    } else {
      return rejectWithValue("her");
    }
  }
);

//SLICE ===================================================================================
export type AuthSliceType = {
  authorization: AuthorizationType | null;
  token: LoginTokenType | null;
  profile: AuthProfileType | null;
  success: boolean;
  errors: string;
  isLogged: boolean;
};
const initialized: AuthSliceType = {
  authorization: null,
  token: null,
  profile: null,
  success: false,
  errors: "",
  isLogged: false,
};
const slice = createSlice({
  name: "auth",
  initialState: initialized,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // обрабатываем асинхронные действия из санок
      .addCase(register.fulfilled, (state, action) => {
        // сохраняем авторизацию в стейте
        state.authorization = action.payload.authorization;
      })
      .addCase(login.fulfilled, (state, action) => {
        // сохраняем токен в стейте
        state.token = action.payload.token;
      })
      .addCase(profile.fulfilled, (state, action) => {
        // сохраняем профиль в стейте
        if (action) state.profile = action.payload.profile;
      })
      .addCase(profileUpd.fulfilled, (state, action) => {
        // обновляем профиль в стейте
        if (state.profile) state.profile.user = action.payload.profile.user;
      })
      .addCase(approve.fulfilled, (state, action) => {
        // сохраняем подтверждение в стейте
        state.success = action.payload.success;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.token = null;
        state.profile = null;
        state.isLogged = false;
        state.success = false;
      });
    // обрабатываем отклоненные и ожидающие действия по желанию
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { register, login, approve, profile, profileUpd, logOut };
