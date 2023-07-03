import React, { useEffect, useState } from "react"
import s from "./Profile.module.scss"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import { NavLink } from "react-router-dom"
import { IconSvg } from "@/assets/image/SVG/iconSVG"

export const Profile = () => {
  console.log("prof")
  const [styleProfile, setStyleProfile] = useState("")

  useEffect(() => {
    setStyleProfile(s.activeBar)
  }, [])

  return (
    <section className={s.profile}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <aside className={`${s.asideBar} ${styleProfile}`}>
          <nav className={s.nav}>
            <ul>
              <li>
                <NavLink
                  to={"/s"}
                  className={({ isActive }) => (isActive ? sApp.activeBut : "")}
                >
                  <div>
                    <IconSvg name={"friends"} />
                  </div>
                  friends
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"message"}
                  className={({ isActive }) => (isActive ? sApp.activeBut : "")}
                >
                  <div>
                    <IconSvg name={"message"} />
                  </div>
                  messages
                </NavLink>
              </li>
              <li></li>
            </ul>
          </nav>
        </aside>
        <section className={s.items}></section>
      </div>
    </section>
  )
}
