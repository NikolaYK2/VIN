import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthApproveType, AuthRegisterType } from "@/features/auth/authApi";
import { fieldInput, fieldPassword, fieldUserName, validEmail } from "@/common/utils/validate";
import s from "./Auth.module.scss";
import { Button } from "@/common/components/button/Button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { authThunk } from "@/features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

type AuthType = {
  greetings: string;
  name: string;
};
type AuthForm = AuthRegisterType &
  AuthApproveType & {
    repeatPassword: string;
  };

export const Auth = (props: AuthType) => {
  const success = useAppSelector((state) => state.auth.success);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      key: null as number | null,
    },
  });
  console.log(watch());
  //FN -------------------------------------------
  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    console.log(data);
    const { email, username, password, key } = data;
    if (props.greetings === "register") {
      try {
        const register = await dispatch(authThunk.register({ email, username, password }));
        if ((register.payload as { success: boolean }).success) {
          // await dispatch(authThunk.login({ email, password }));
          navigate("/home/approve", { replace: true });
          await dispatch(authThunk.approve({ key }));
          await dispatch(authThunk.profile());
        }
      } catch (e: any) {
        throw Error("hz");
        // dispatch(authActions.setError(e.erroresoxod@mailto.pluss));
      }
    } else if (props.greetings === "login") {
      await dispatch(authThunk.login({ email, password }));
      await dispatch(authThunk.profile());
    } else if (props.greetings === "approve") {
      await dispatch(authThunk.approve({ key }));
    }
    reset();
  };
  //STYLE INPUT---------------------------------------

  //SWITCH LOGIN AND REGISTER -------------------------
  const switchComponent = props.greetings.toLowerCase();

  if (success) {
    return <Navigate to="/profile" replace={true} />;
  }
  return (
    <div className={s.containerAuth}>
      <p>{props.greetings}</p>
      <h1>{props.name}</h1>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        {switchComponent === "approve" || (
          <div className={s.blockInput}>
            <input
              className={watch().email ? s.inputOk : ""}
              autoComplete={"on"}
              type="email"
              {...register("email", {
                required: fieldInput,
                pattern: {
                  value: validEmail,
                  message: "Enter a valid e-mail address",
                },
              })}
              onChange={(e) =>
                setValue("email", e.currentTarget.value, {
                  shouldValidate: true,
                })
              }
            />
            <label className={watch().email ? s.modLabel : ""}>Email</label>
            <div className={touchedFields.email ? s.isActiveBorder : ""}></div>
            <p>{errors.email ? errors.email.message : ""}</p>
          </div>
        )}

        {switchComponent === "approve" || switchComponent === "login" || (
          <div className={s.blockInput}>
            <input
              className={watch().username ? s.inputOk : ""}
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
            <label className={watch().username ? s.modLabel : ""}>User name</label>
            <div className={touchedFields.username ? s.isActiveBorder : ""}></div>
            <p>{errors.username ? errors.username.message : ""}</p>
          </div>
        )}

        {switchComponent === "approve" || (
          <div className={s.blockInput}>
            <input
              className={watch().password ? s.inputOk : ""}
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
        )}

        {switchComponent === "approve" || switchComponent === "login" || (
          <div className={s.blockInput}>
            <input
              className={watch().repeatPassword ? s.inputOk : ""}
              autoComplete={"off"}
              type="password"
              {...register("repeatPassword", {
                required: true,
                validate: (value: string) => value === watch("password") || "Password do not match",
              })}
              onChange={(e) =>
                setValue("repeatPassword", e.currentTarget.value, {
                  shouldValidate: true,
                })
              }
            />
            <label className={watch().repeatPassword ? s.modLabel : ""}>Repeat password</label>
            <div className={touchedFields.repeatPassword ? s.isActiveBorder : ""}></div>
            <p>{errors.repeatPassword ? errors.repeatPassword.message : ""}</p>
          </div>
        )}

        {switchComponent === "approve" && (
          <div className={s.blockInput}>
            <input
              className={watch().key ? s.inputOk : ""}
              autoComplete={"on"}
              type="text"
              {...register("key", {
                required: fieldInput,
              })}
            />
            <label className={watch().key ? s.modLabel : ""}>Approve</label>
            <div className={touchedFields.key ? s.isActiveBorder : ""}></div>
            <p>{errors.key ? errors.key.message : ""}</p>
          </div>
        )}
        <Button name={props.greetings} />
      </form>
    </div>
  );
};
