import React, { useLayoutEffect, useRef } from "react"
import s from "./Profile.module.scss"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import { NavLink } from "react-router-dom"
import { IconSvg } from "@/assets/image/SVG/iconSVG"
import bcProfJ from "@/assets/image/imgWeb/prof/bcProf.jpg"
import bcProfW from "@/assets/image/imgWeb/prof/bcProf.webp"

export const Profile = () => {
  console.log("prof")
  // const [styleAsideBar, setStyleAsideBar] = useState("")
  // const [styleProfile, setStyleProfile] = useState("")
  //
  // useLayoutEffect(() => {
  //   setStyleAsideBar(s.activeBar)
  //   setStyleProfile(s.activeProfile)
  // }, [])

  //АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ВМОНТИРОВАНИИ КОМПОНЕНТЫ ---------
  const profileRef = useRef<HTMLElement>(null)
  const asideBarRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      profileRef.current?.classList.add(s.activeProfile)
      asideBarRef.current?.classList.add(s.activeBar)
    })
  }, [])

  return (
    <section className={`${s.profile}`} ref={profileRef}>
      <div className={`${s.container} ${sApp.containerDefaultApp}`}>
        <aside className={`${s.asideBar}`} ref={asideBarRef}>
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
        <section className={s.items}>
          <picture>
            <source srcSet={bcProfW} type={"image/webp"} />
            <source srcSet={bcProfJ} type={"image/jpg"} />
            <img src={bcProfJ} alt="" />
          </picture>

          <div></div>
        </section>
      </div>
    </section>
  )
}
