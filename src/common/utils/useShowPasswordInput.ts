import { useState } from "react"

export function useShowPasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return {
    type: showPassword ? "text" : "password",
    toggle: () => setShowPassword(!showPassword),
  }
}
