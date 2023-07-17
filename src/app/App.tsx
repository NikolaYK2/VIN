import s from "./App.module.scss";
import { Header } from "@/features/1-head/Header";
import { Main } from "@/features/2-main/Main";
import { Footer } from "@/features/3-footer/Footer";
import React, { useEffect, useState } from "react";

function App() {
  console.log("App");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Promise.all([document.fonts.load("1rem Play"), document.fonts.load("bold 1rem Play")]).then(() => setIsReady(true));
  }, []);

  return (
    isReady && (
      <div className={s.app}>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  );
}

export default App;
