import { createSlice } from "@reduxjs/toolkit"

// const isInitializedApp = createAppAsyncThunk("app/me", async (arg, thunkAPI) => {
//   const { dispatch } = thunkAPI;
//   try {
//     await dispatch(authThunks.authMe());
//     await dispatch(appActions.initializedApp({ isAppInitialized: true }));
//   } catch (e) {}
// });
//Extra ==========================================
// const isInitializedApp = createAppAsyncThunk<{ isAppInitialized: boolean }>(
//   "app/init",
//   async (arg, thunkAPI) => {
//     const { dispatch } = thunkAPI;
//     // const res = await authApi.me();
//     await dispatch(authThunks.authMe());
//     return { isAppInitialized: true };
//   }
// );
// const isLoading = createAppAsyncThunk<{ isLoading: boolean }, boolean>("app/isLoading", async (arg) => {
//   const res = await authApi.me();
//   return { isLoading: arg };
// });

const slice = createSlice({
  // name должен быть уникальным
  // name будет использоваться в качетве приставки (redux ducks)
  name: "app",
  // Инициализационный стейт
  initialState: {
    error: null as string | null,
    isLoading: true,
    isAppInitialized: false,
  },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(isInitializedApp.fulfilled, (state, action) => {
  //     state.isAppInitialized = action.payload.isAppInitialized
  //   })
  //   // .addCase(isLoading.fulfilled, (state, action) => {
  //   //   state.isLoading = action.payload.isLoading;
  //   // })
  // },
})

// Создаем reducer с помощью slice
export const appReducer = slice.reducer
// Action creators создаются автоматически для каждого подредьюсера
// Все экшены упаковываем в объект. В дальнейшем пригодится
export const appActions = slice.actions
export const appThunk = {}
