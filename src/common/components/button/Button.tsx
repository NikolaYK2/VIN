import React, { memo } from "react";
import s from "./Button.module.scss";

type ButtonType = {
  name: string;
  disabled: boolean;
  onClick?: () => void;
};
export const Button = memo((props: ButtonType) => {
  console.log("but render");

  const onClickHandle = () => {
    props.onClick?.();
  };

  return (
    <label className={`${s.container} ${props.disabled ? s.disabled : ""}`}>
      <button className={props.disabled ? s.disabled : ""} disabled={props.disabled} onClick={onClickHandle}>
        {props.name}
      </button>
    </label>
  );
});
