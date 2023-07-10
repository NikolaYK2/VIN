import React, { useLayoutEffect, useRef } from "react"
import s from "./Profile.module.scss"
import sApp from "@/assets/SCSS/style/continerApp.module.scss"
import { NavLink } from "react-router-dom"
import { IconSvg } from "@/assets/image/SVG/iconSVG"
import bcProfJ from "@/assets/image/imgWeb/prof/bcProf.jpg"
import bcProfW from "@/assets/image/imgWeb/prof/bcProf.webp"
import avatar from "@/assets/image/imgWeb/prof/avatar.jpg"

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
  const avaRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      profileRef.current?.classList.add(s.activeProfile)
      asideBarRef.current?.classList.add(s.activeBar)
      avaRef.current?.classList.add(s.activeAva)
      nameRef.current?.classList.add(s.name)
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
          {/*bc prof --------*/}
          <picture>
            <source srcSet={bcProfW} type={"image/webp"} />
            <source srcSet={bcProfJ} type={"image/jpg"} />
            <img src={bcProfJ} alt="" />
          </picture>

          {/*avatar prof -----------*/}
          <div className={`${s.avatarUser}`} ref={avaRef}>
            <img src={avatar} alt="" />
            <h2 ref={nameRef}>Nik</h2>
          </div>

          {/*item prof ------------*/}
          <p></p>
          <p></p>
          <p></p>
        </section>
      </div>
    </section>
  )
}
