import { authInstance } from "@/features/home/auth/authInstans"

//AUTH API TYPE -------------------------------------
export type AuthProfileType = {
  first_name: string
  last_name: string
  is_coach: false
  date_of_birth: Date
  height: number
  weight: number
  avatar: string
}

export type AuthRegisterType = {
  email: string
  username: string
  password: string
}

//RESPONSE TYPE---------------------------------
// export type AuthUserType = {
//   User: AuthRegisterType
// }

export const authApi = {
  register: (data: AuthRegisterType) => {
    return authInstance.post<{ User: AuthRegisterType }>("register", data)
  },
}
