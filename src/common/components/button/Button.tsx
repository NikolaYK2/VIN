import React, { memo } from "react";
import s from "./Button.module.scss";

export const Button = memo((props: { name: string; disabled: boolean }) => {
  console.log("but render");

  return (
    <div className={`${s.container} ${props.disabled ? s.disabled : ""}`}>
      <button className={props.disabled ? s.disabled : ""} disabled={props.disabled}>
        {props.name}
      </button>
    </div>
  );
});
