import { createSlice } from "@reduxjs/toolkit"
import { authApi, AuthRegisterType } from "@/features/home/auth/authApi"
import { createAppAsyncThunk } from "@/common/utils/creatAppAsyncThunk"

const register = createAppAsyncThunk<
  { profile: AuthRegisterType },
  AuthRegisterType
>("auth/register", async (arg: AuthRegisterType) => {
  const res = await authApi.register(arg)
  console.log(res)
  return { profile: res.data.User }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as AuthRegisterType | null,
    isLogged: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.profile = action.payload.profile
    })
  },
})

export const authReducer = slice.reducer
