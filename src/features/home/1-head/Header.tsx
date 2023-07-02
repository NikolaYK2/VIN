import React from "react"
import s from "./Header.module.scss"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import { IconSvg } from "@/assets/image/SVG/iconSVG"
import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <section className={`${s.head} ${sApp.containerApp}`}>
      <div className={s.logo}>
        <IconSvg name={"logo"} />
      </div>
      <nav className={s.nav}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? sApp.activeBut : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/s"
              className={({ isActive }) => (isActive ? sApp.activeBut : "")}
            >
              notes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ф"
              className={({ isActive }) => (isActive ? sApp.activeBut : "")}
            >
              news
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  )
}
