import React from "react"
import s from "./Main.module.scss"
import sApp from "../../../assets/SCSS/style/continerApp.module.scss"
import { Outlet, useLocation } from "react-router-dom"
import { Auth } from "@/common/components/auth/Auth"

export const Main = () => {
  const location = useLocation()
  return (
    <div className={s.main}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <div className={s.item}>
          <h2>Welcome to VIN, the ultimate fitness app.</h2>
          <p>
            Track your workouts, get personalized feedback, and join a community
            of fitness enthusiasts. Ready to get started?
          </p>
        </div>

        <div className={s.componentAuth}>
          <div className={s.switchAuth}>
            {/*<NavLink to={"login"}>Login</NavLink>*/}
            {/*<NavLink to={"register"}>Register</NavLink>*/}
          </div>

          <Auth greetings={"register"} name={"Join our platform"} />
          {/*<Auth greetings={"login"} name={"Sign in to your account"} />*/}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
