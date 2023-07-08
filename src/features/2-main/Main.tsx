import React from "react"
import s from "./Main.module.scss"
import { Outlet } from "react-router-dom"

export const Main = () => {
  return (
    <div className={s.main}>
      <Outlet />
    </div>
  )
}
