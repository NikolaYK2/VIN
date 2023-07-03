import React, { useEffect, useState } from "react"
import s from "./Home.module.scss"
import { Header } from "@/features/home/1-head/Header"
import { Main } from "@/features/home/2-main/Main"
import { Footer } from "@/features/home/3-footer/Footer"

export const Home = () => {
  console.log("home")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    document.fonts.load("12px Play").then(() => setIsReady(true))
  }, [])

  return (
    isReady && (
      <div className={s.app}>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  )
}
