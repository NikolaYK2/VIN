import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthApproveType, AuthorizationType, AuthRegisterType, LoginTokenType } from "@/features/auth/authApi";
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
  const isApprove = useAppSelector((state) => state.auth.profile?.user.is_approve);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, touchedFields, isSubmitting },
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
  //FN -------------------------------------------
  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    console.log(data);
    const { email, username, password, key } = data;
    try {
      if (props.greetings === "register") {
        const register = await dispatch(authThunk.register({ email, username, password }));
        if ((register.payload as { authorization: AuthorizationType }).authorization.User) {
          const token = await dispatch(authThunk.login({ email, password }));
          if ((token.payload as { token: LoginTokenType }).token.access) {
            navigate("/home/approve", { replace: true });
          }
        }
      } else if (props.greetings === "login") {
        const resToken = await dispatch(authThunk.login({ email, password }));
        if ((resToken.payload as { token: LoginTokenType }).token.access) {
          await dispatch(authThunk.profile());
          if (!isApprove) {
            navigate("/home/approve", { replace: true });
          }
        }
      } else if (props.greetings === "approve") {
        // await dispatch(authThunk.login({ email, password }));
        const resSuccess = await dispatch(authThunk.approve({ key }));
        if ((resSuccess.payload as { success: boolean }).success) {
          navigate("/profile", { replace: true });
        }
        await dispatch(authThunk.profile());
      }
    } catch (e) {
    } finally {
      reset();
    }
  };
  //STYLE INPUT---------------------------------------

  //SWITCH LOGIN AND REGISTER -------------------------
  const switchComponent = props.greetings.toLowerCase();

  if (isApprove) {
    return <Navigate to="/profile" />;
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
        <Button name={props.greetings} disabled={isSubmitting} />
      </form>
    </div>
  );
};
