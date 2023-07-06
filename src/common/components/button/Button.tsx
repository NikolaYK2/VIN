import React, { memo } from "react"
import s from "./Button.module.scss"

export const Button = memo((props: { name: string }) => {
  console.log("but render")
  return (
    <div className={s.container}>
      <button>{props.name}</button>
    </div>
  )
})
