import React, { useEffect, useState } from "react"
import s from "./Header.module.scss"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import { IconSvg } from "@/assets/image/SVG/iconSVG"
import { NavLink } from "react-router-dom"

export const Header = () => {
  const [modNav, setStyleNav] = useState(s.headerNav)
  const [modBurger, setStyleBurger] = useState("")
  const [switchNav, setSwitchNav] = useState(true)

  useEffect(() => {
    if (switchNav) {
      setStyleNav(s.headerNav)
      setStyleBurger(s.menuBurger)
      document.body.style.overflow = "unset"
    } else {
      setStyleNav(s.activeMenu)
      setStyleBurger(s.activeBurger)
      document.body.style.overflow = "hidden"
    }
  }, [switchNav])

  const burgerHandle = () => {
    setSwitchNav(!switchNav)
  }

  const activeLinkHandle = () => {
    setSwitchNav(true)
  }

  return (
    <section className={`${s.head}`}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <div className={s.logo}>
          <IconSvg name={"logo"} />
        </div>
        <div>
          <div className={`${s.burger} ${modBurger}`} onClick={burgerHandle}>
            <span></span>
          </div>
        </div>
        <nav className={`${s.nav} ${modNav}`}>
          <IconSvg name={"menuBurger"} />
          <ul>
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) => (isActive ? sApp.activeBut : "")}
                onClick={activeLinkHandle}
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
      </div>
    </section>
  )
}
