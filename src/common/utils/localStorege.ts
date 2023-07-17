import { AppRootState } from "@/app/store";

export const saveState = (state: Partial<AppRootState>) => {
  // - сохраняем данные
  try {
    const strState = JSON.stringify(state);
    localStorage.setItem("state", strState);
  } catch {
    // ignore write errors
  }
};
export const loadState = () => {
  // - достаем данные
  try {
    const strState = localStorage.getItem("state");
    if (strState === null) {
      return undefined;
    }
    return JSON.parse(strState);
  } catch (err) {
    return undefined;
  }
};
