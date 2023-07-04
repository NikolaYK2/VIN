import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { appReducer } from "@/app/appSlice"
import { authReducer } from "@/features/home/auth/authSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  Action<string>
>
