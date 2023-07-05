import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthRegisterType } from "@/features/home/auth/authApi"
import { fieldInput, fieldPassword, validEmail } from "@/common/utils/validate"
import sApp from "../../../../assets/SCSS/style/continerApp.module.scss"

type AuthType = AuthRegisterType & {
  repeatPassword: string
}
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AuthType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      repeatPassword: "",
    },
  })
  //FN -------------------------------------------
  const onSubmit: SubmitHandler<AuthRegisterType> = (data) => {
    console.log(data)
  }
  //STYLE ---------------------------------------
  const activeEm = watch().email ? sApp.inputOk : ""
  const activePas = watch().password ? sApp.inputOk : ""
  const activeReapPas = watch().repeatPassword ? sApp.inputOk : ""
  const [st, setSt] = useState("")

  const blurInputHandle = () => {
    setSt(sApp.is)
  }
  const clickInputHandle = () => {
    setSt(sApp.as)
  }
  return (
    <div className={sApp.containerAuth}>
      <h1>sign-up</h1>
      <form className={sApp.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={sApp.blockInput}>
          <input
            id={"1"}
            className={activeEm}
            type="email"
            {...register("email", {
              required: fieldInput,
              pattern: {
                value: validEmail,
                message: "Enter a valid e-mail address",
              },
            })}
            onBlur={blurInputHandle}
            onClick={clickInputHandle}
          />
          <div className={`${sApp.borderInput} ${st}`}></div>
          <label className={watch().email ? sApp.modLabel : ""}>Email</label>
          <p>{errors.email?.message}</p>
        </div>
        <div className={sApp.blockInput}>
          <input
            className={activePas}
            type="password"
            {...register("password", {
              minLength: { value: 6, message: fieldPassword },
              required: fieldInput,
            })}
          />
          <div className={sApp.borderInput}></div>
          <label></label>
          <p></p>
        </div>
        <div className={sApp.blockInput}>
          <input
            className={activeReapPas}
            type="password"
            {...register("repeatPassword", {
              required: true,
              validate: (value: string) =>
                value === watch("password") || "Password do not match",
            })}
          />
          <div className={sApp.borderInput}></div>
          <label></label>
          <p></p>
        </div>
      </form>
    </div>
  )
}
