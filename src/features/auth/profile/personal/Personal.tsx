import React, { useLayoutEffect, useRef } from "react";
import s from "./Personal.module.scss";
import { useAppSelector } from "@/app/hooks";

export const Personal = () => {
  const personalStyle = useRef<HTMLDivElement>(null);
  const userName = useAppSelector((state) => state.auth.profile?.user.username);
  const firstName = useAppSelector((state) => state.auth.profile?.user.first_name);
  const lastName = useAppSelector((state) => state.auth.profile?.user.last_name);

  console.log(userName);
  console.log(firstName);
  console.log(lastName);
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      personalStyle.current?.classList.add(s.runPersonal);
    });
  }, []);
  return (
    <div className={s.personalContain} ref={personalStyle}>
      <div className={s.personalData}>
        <ul>
          <li>
            <h2>{firstName ? firstName : "здесь твое фамилия"}</h2>
          </li>
          <li>
            <h2>{lastName ? userName : "здесь Имя"}</h2>
          </li>
          <li>
            <h2>{userName ? userName : "подпись"}</h2>
          </li>
          <li>
            <p>data</p>
          </li>
          <li>
            <p>height</p>
          </li>
          <li>
            <p>weight</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
