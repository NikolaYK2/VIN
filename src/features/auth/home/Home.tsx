import React from "react"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import s from "./Home.module.scss"
import { NavLink, Outlet } from "react-router-dom"

export const Home = () => {
  return (
    <div className={s.home}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <div className={s.item}>
          <h2>Welcome to VIN, the ultimate fitness app.</h2>
          <p>
            Track your workouts, get personalized feedback, and join a community
            of fitness enthusiasts. Ready to get started?
          </p>
        </div>

        <div className={s.componentAuth}>
          <ul className={s.switchAuth}>
            <li>
              <NavLink to={"login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"register"}>Register</NavLink>
            </li>
          </ul>
          <div className={s.data}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
