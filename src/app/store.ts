import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appReducer } from "@/app/appSlice";
import { authReducer } from "@/features/auth/authSlice";
import { loadState, saveState } from "@/common/utils/localStorege";
import { throttle } from "@/common/utils/throttle";

//LOCAL STORAGE -----------------------------
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  preloadedState: persistedState, //Передаем в качестве начального состояния
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, Action<string>>;

//LOCAL STORAGE -----------------------------
// Эта функция будет вызвана после каждого действия
store.subscribe(() => {
  // Вы можете получить текущее состояние хранилища с помощью store.getState()
  const state = store.getState();
  // Вы можете выбрать те части состояния, которые вы хотите сохранить
  const { auth } = state;
  // Вы можете использовать вашу функцию saveState(), чтобы сохранить их в localStorage
  saveState({ auth });
});

store.subscribe(
  throttle(() => {
    const state = store.getState();

    const { auth } = state;

    saveState({ auth });
  }, 1000)
);
