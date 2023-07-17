import React from "react";
import sApp from "@/assets/SCSS/style/continerApp.module.scss";
import s from "./Home.module.scss";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

export const Home = () => {
  const success = useAppSelector((state) => state.auth.success);
  if (success) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={s.home}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <div className={s.item}>
          <h2>Welcome to VIN, the ultimate fitness app.</h2>
          <p>
            Track your workouts, get personalized feedback, and join a community of fitness enthusiasts. Ready to get
            started?
          </p>
        </div>

        <div className={s.componentAuth}>
          <div className={s.block}>
            <ul className={s.switchAuth}>
              <li>
                <NavLink to={"login"} className={({ isActive }) => (isActive ? s.active : s.isActive)}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to={"register"} className={({ isActive }) => (isActive ? s.active : s.isActive)}>
                  Register
                </NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
