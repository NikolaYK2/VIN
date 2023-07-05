import React from "react"
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
    setValue,
    formState: { errors, touchedFields },
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
  //STYLE INPUT---------------------------------------
  const activeEm = watch().email ? sApp.inputOk : ""
  const activePas = watch().password ? sApp.inputOk : ""
  const activeReapPas = watch().repeatPassword ? sApp.inputOk : ""

  return (
    <div className={sApp.containerAuth}>
      <p>hi friends!!!</p>
      <h1>sign-up</h1>
      <form className={sApp.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={sApp.blockInput}>
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
          <label className={watch().email ? sApp.modLabel : ""}>Email</label>
          <div className={touchedFields.email ? sApp.isActiveBorder : ""}></div>
          <p>{errors.email ? errors.email.message : ""}</p>
        </div>

        <div className={sApp.blockInput}>
          <input
            className={activePas}
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
          <label className={watch().password ? sApp.modLabel : ""}>
            Password
          </label>
          <div
            className={touchedFields.password ? sApp.isActiveBorder : ""}
          ></div>
          <p>{errors.password ? errors.password.message : ""}</p>
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
            onChange={(e) =>
              setValue("repeatPassword", e.currentTarget.value, {
                shouldValidate: true,
              })
            }
          />
          <label className={watch().repeatPassword ? sApp.modLabel : ""}>
            Repeat Password
          </label>
          <div
            className={touchedFields.repeatPassword ? sApp.isActiveBorder : ""}
          ></div>
          <p>{errors.repeatPassword ? errors.repeatPassword.message : ""}</p>
        </div>
      </form>
    </div>
  )
}
