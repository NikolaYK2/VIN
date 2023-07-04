import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AuthRegisterType } from "@/features/home/auth/authApi"
import { fieldInput, validEmail } from "@/common/utils/validate"

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthRegisterType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AuthRegisterType> = (data) => {
    console.log(data)
  }
  return (
    <div>
      <h1>sign-up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", {
            required: fieldInput,
            pattern: {
              value: validEmail,
              message: "Enter a valid e-mail address",
            },
          })}
        />
        <label className={watch().email ? sAuth.modLabel : ""}>Email</label>
        <p>{errors.email?.message}</p>
        <input type="password" />
        <input type="password" />
        repeatPassword
      </form>
    </div>
  )
}
