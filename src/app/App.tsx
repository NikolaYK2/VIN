import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "@/features/home/Home"
import { Profile } from "@/features/home/auth/profile/Profile"
import { Login } from "@/features/home/auth/login/Login"
import { Register } from "@/features/home/auth/register/Register"
import { CheckEmail } from "@/features/home/auth/checkEmail/CheckEmail"
import { Message } from "@/features/home/auth/profile/message/Message"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        //register ---------
        path: "sign-up",
        element: <Register />,
      },
      //Token ----------
      {
        path: "sign-in",
        element: <Login />,
      },
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
