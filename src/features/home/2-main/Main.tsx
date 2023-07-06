import React from "react"
import s from "./Main.module.scss"
import sApp from "../../../assets/SCSS/style/continerApp.module.scss"
import { Outlet } from "react-router-dom"
import { Auth } from "@/common/components/auth/Auth"

export const Main = () => {
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
          {/*<Auth greetings={"register"} name={"Join our platform"} />*/}
          <Auth greetings={"login"} name={"Sign in to your account"} />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
