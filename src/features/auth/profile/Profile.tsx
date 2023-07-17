import React, { useLayoutEffect, useRef } from "react";
import s from "./Profile.module.scss";
import sApp from "@/assets/SCSS/style/continerApp.module.scss";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { IconSvg } from "@/assets/image/SVG/iconSVG";
import bcProfJ from "@/assets/image/imgWeb/prof/bcProf.jpg";
import avatar from "@/assets/image/imgWeb/prof/avatar.jpg";
import { useAppSelector } from "@/app/hooks";

export const Profile = () => {
  console.log("prof");
  const success = useAppSelector((state) => state.auth.success);
  const userName = useAppSelector((state) => state.auth.profile?.user.username);

  // const [styleAsideBar, setStyleAsideBar] = useState("")
  // const [styleProfile, setStyleProfile] = useState("")
  //
  // useLayoutEffect(() => {
  //   setStyleAsideBar(s.activeBar)
  //   setStyleProfile(s.activeProfile)
  // }, [])

  //АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ВМОНТИРОВАНИИ КОМПОНЕНТЫ ---------
  const profileRef = useRef<HTMLElement>(null);
  const asideBarRef = useRef<HTMLElement>(null);
  const avaRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      profileRef.current?.classList.add(s.activeProfile);
      asideBarRef.current?.classList.add(s.activeBar);
      avaRef.current?.classList.add(s.activeAva);
      nameRef.current?.classList.add(s.nameActive);
    });
  }, []);

  if (!success) {
    return <Navigate to={"/home/register"} />;
  }
  return (
    <section className={`${s.profile}`} ref={profileRef}>
      {/*ФОн profile ------------------------*/}
      <div className={`${s.items}`} style={{ backgroundImage: `url(${bcProfJ})` }}></div>
      {/*photo user ----------------------*/}
      <div className={`${s.containerUser} ${sApp.containerDefaultApp}`}>
        {/*<img src={avatar} alt="" />*/}
        <div className={`${s.photoUser}`} ref={avaRef} style={{ backgroundImage: `url(${avatar})` }}></div>
        <NavLink to={"personalData"}>
          <h2 ref={nameRef}>{userName}</h2>
        </NavLink>
      </div>
      <section className={`${s.container}`}>
        <aside className={`${s.asideBar}`} ref={asideBarRef}>
          <nav className={s.nav}>
            <ul>
              <li>
                <NavLink to={"personalData"} className={({ isActive }) => (isActive ? sApp.activeBut : "")}>
                  <div>
                    <IconSvg name={"personal"} />
                  </div>
                  <span>personal</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/s"} className={({ isActive }) => (isActive ? sApp.activeBut : "")}>
                  <div>
                    <IconSvg name={"friends"} />
                  </div>
                  <span>friends</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"message"} className={({ isActive }) => (isActive ? sApp.activeBut : "")}>
                  <div>
                    <IconSvg name={"message"} />
                  </div>
                  <span>messages</span>
                </NavLink>
              </li>
              <li></li>
            </ul>
          </nav>
        </aside>

        <section className={`${s.containerContent} ${sApp.containerDefaultApp}`}>
          <Outlet />
        </section>
      </section>
    </section>
  );
};
