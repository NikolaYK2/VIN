import React, { useEffect, useState } from "react"
import s from "./Home.module.scss"

export const Home = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    document.fonts.load("12px Play").then(() => setIsReady(true))
  }, [])

  return (
    isReady && (
      <div>
        <h1 className={s.h}>Hi, i app GYM TIME! We are #1 CrossFit gym</h1>
      </div>
    )
  )
}
