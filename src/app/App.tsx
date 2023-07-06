import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "@/features/home/Home"
import { Profile } from "@/features/home/auth/profile/Profile"
import { CheckEmail } from "@/features/home/auth/checkEmail/CheckEmail"
import { Message } from "@/features/home/auth/profile/message/Message"
import { Auth } from "@/common/components/auth/Auth"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      //AUTH =================================================
      {
        path: "login",
        element: <Auth greetings={"login"} name={"Sign in to your account"} />,
      },
      {
        path: "register",
        element: <Auth greetings={"register"} name={"Join our platform"} />,
      },
      // =====================================================
      {
        path: "profile/",
        element: <Profile />,
        children: [
          {
            path: "message",
            element: <Message />,
          },
        ],
      },
      //Проверка, на почту код ------
      {
        path: "approve",
        element: <CheckEmail />,
      },
      // {
      //   path: "delete",
      //   element: <Delete />,
      // },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
