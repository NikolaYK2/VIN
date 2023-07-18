import React, { useLayoutEffect, useRef, useState } from "react";
import s from "./Personal.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/common/components/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileDataType } from "@/features/auth/authApi";
import { authThunk } from "@/features/auth/authSlice";

export const Personal = () => {
  const personalStyle = useRef<HTMLDivElement>(null);
  const [switching, setSwitching] = useState(true);

  const userName = useAppSelector((state) => state.auth.profile?.user.username);
  const firstName = useAppSelector((state) => state.auth.profile?.user.first_name);
  const lastName = useAppSelector((state) => state.auth.profile?.user.last_name);
  const dateOfBirth = useAppSelector((state) => state.auth.profile?.user.date_of_birth);
  const isCoach = useAppSelector((state) => state.auth.profile?.user.is_coach);
  const height = useAppSelector((state) => state.auth.profile?.user.height);
  const weight = useAppSelector((state) => state.auth.profile?.user.weight);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileDataType>({
    defaultValues: {
      first_name: firstName,
      last_name: lastName,
      is_coach: isCoach,
      date_of_birth: dateOfBirth,
      height: height,
      weight: weight,
    },
  });
  const onSubmit: SubmitHandler<ProfileDataType> = (data) => {
    const formData = new FormData();
    // Добавляем данные из полей формы
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("is_coach", data.is_coach.toString());
    // Проверяем, что значения не равны null
    if (data.date_of_birth !== null) formData.append("date_of_birth", data.date_of_birth);
    if (data.height !== null) formData.append("height", data.height);
    if (data.weight !== null) formData.append("weight", data.weight);
    // Отправляем запрос на сервер с объектом FormData
    // debugger;
    // console.log(formData);
    dispatch(authThunk.profileUpd(formData));
    setSwitching(true);
  };

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      personalStyle.current?.classList.add(s.runPersonal);
    });
  }, []);
  return (
    <div className={s.personalContain} ref={personalStyle}>
      <div className={s.personalBlock}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li>
              <h2>
                firs name:
                {switching ? (
                  <span>{firstName ? firstName : "here is your last name"}</span>
                ) : (
                  <input type={"text"} {...register("first_name")} />
                )}
              </h2>
            </li>
            <li>
              <h2>
                last name:
                {switching ? (
                  <span>{lastName ? userName : "name"}</span>
                ) : (
                  <input type={"text"} {...register("last_name")} />
                )}
              </h2>
            </li>
            <li>
              <h2>
                date of birth:
                {switching ? (
                  <span>{dateOfBirth ? dateOfBirth : "signature"}</span>
                ) : (
                  <input type={"text"} {...register("date_of_birth")} />
                )}
              </h2>
            </li>
            <li>
              <p>
                is coach:
                {switching ? (
                  <span>{isCoach ? "true" : "false"}</span>
                ) : (
                  <input type={"checkbox"} {...register("is_coach")} />
                )}
              </p>
            </li>
            <li>
              <p>
                weight:
                {switching ? (
                  <span>{weight ? weight : "just frame (amazon)"}</span>
                ) : (
                  <input type={"number"} {...register("weight")} />
                )}
              </p>
            </li>
            <li>
              <p>
                height:
                {switching ? (
                  <span>{height ? height : "cupboard (goddess)"}</span>
                ) : (
                  <input type={"number"} {...register("height")} />
                )}
              </p>
            </li>
          </ul>
          {switching || <Button name={"ok"} disabled={false} />}
        </form>
        {switching && <Button name={"edit"} disabled={isSubmitting} onClick={() => setSwitching(false)} />}
      </div>
    </div>
  );
};
