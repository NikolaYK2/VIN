import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthRegisterType } from "@/features/home/auth/authApi"
import {
  fieldInput,
  fieldPassword,
  fieldUserName,
  validEmail,
} from "@/common/utils/validate"
import s from "./Auth.module.scss"
import { Button } from "@/common/components/button/Button"

type AuthType = {
  greetings: string
  name: string
  email?: string
  username?: string
  password?: string
}
type AuthForm = AuthRegisterType & {
  repeatPassword: string
}

export const Auth = (props: AuthType) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, touchedFields },
  } = useForm<AuthForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  })
  //FN -------------------------------------------
  const onSubmit: SubmitHandler<AuthRegisterType> = (data) => {
    console.log(data)
    reset()
  }
  //STYLE INPUT---------------------------------------
  const activeEm = watch().email ? s.inputOk : ""
  const activeName = watch().username ? s.inputOk : ""
  const activePas = watch().password ? s.inputOk : ""
  const activeReapPas = watch().repeatPassword ? s.inputOk : ""

  //SWITCH LOGIN AND REGISTER -------------------------
  const switchComponent = props.greetings.toLowerCase()

  return (
    <div className={s.containerAuth}>
      <p>{props.greetings}</p>
      <h1>{props.name}</h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.blockInput}>
          <input
            className={activeEm}
            type="email"
            {...register("email", {
              required: fieldInput,
              pattern: {
                value: validEmail,
                message: "Enter a valid e-mail address",
              },
            })}
            onChange={(e) =>
              setValue("email", e.currentTarget.value, { shouldValidate: true })
            }
          />
          <label className={watch().email ? s.modLabel : ""}>Email</label>
          <div className={touchedFields.email ? s.isActiveBorder : ""}></div>
          <p>{errors.email ? errors.email.message : ""}</p>
        </div>

        {switchComponent === "login" || (
          <div className={s.blockInput}>
            <input
              className={activeName}
              type="text"
              {...register("username", {
                minLength: { value: 3, message: fieldUserName },
                required: fieldInput,
              })}
              onChange={(e) =>
                setValue("username", e.currentTarget.value, {
                  shouldValidate: true,
                })
              }
            />
            <label className={watch().username ? s.modLabel : ""}>
              User name
            </label>
            <div
              className={touchedFields.username ? s.isActiveBorder : ""}
            ></div>
            <p>{errors.username ? errors.username.message : ""}</p>
          </div>
        )}

        <div className={s.blockInput}>
          <input
            className={activePas}
            autoComplete={"off"}
            type="password"
            {...register("password", {
              minLength: { value: 6, message: fieldPassword },
              required: fieldInput,
            })}
            onChange={(e) =>
              setValue("password", e.currentTarget.value, {
                shouldValidate: true,
              })
            }
          />
          <label className={watch().password ? s.modLabel : ""}>Password</label>
          <div className={touchedFields.password ? s.isActiveBorder : ""}></div>
          <p>{errors.password ? errors.password.message : ""}</p>
        </div>

        {switchComponent === "login" || (
          <div className={s.blockInput}>
            <input
              className={activeReapPas}
              autoComplete={"off"}
              type="password"
              {...register("repeatPassword", {
                required: true,
                validate: (value: string) =>
                  value === watch("password") || "Password do not match",
              })}
              onChange={(e) =>
                setValue("repeatPassword", e.currentTarget.value, {
                  shouldValidate: true,
                })
              }
            />
            <label className={watch().repeatPassword ? s.modLabel : ""}>
              Repeat password
            </label>
            <div
              className={touchedFields.repeatPassword ? s.isActiveBorder : ""}
            ></div>
            <p>{errors.repeatPassword ? errors.repeatPassword.message : ""}</p>
          </div>
        )}

        <Button name={props.greetings} />
      </form>
    </div>
  )
}
