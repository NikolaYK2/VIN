import React, { useLayoutEffect, useRef } from "react"
import s from "./Personal.module.scss"

export const Personal = () => {
  const personalStyle = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      personalStyle.current?.classList.add(s.runPersonal)
    })
  }, [])
  return (
    <div className={s.personalContain} ref={personalStyle}>
      <div className={s.personalData}>
        <ul>
          <li>
            <h2>first name</h2>
          </li>
          <li>
            <h2>last name</h2>
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
  )
}
