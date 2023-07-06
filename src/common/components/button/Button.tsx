import React from "react"
import s from "./Button.module.scss"

export const Button = (props: { name: string }) => {
  return (
    <div className={s.container}>
      <button>{props.name}</button>
    </div>
  )
}
