import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/features/auth/home/Home";
import { Auth } from "@/common/components/auth/Auth";
import { Profile } from "@/features/auth/profile/Profile";
import { Message } from "@/features/auth/profile/message/Message";
import { Personal } from "@/features/auth/profile/personal/Personal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //AUTH =================================================
      {
        path: "home/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Auth greetings={"login"} name={"Sign in to your account"} />,
          },
          {
            path: "login",
            element: <Auth greetings={"login"} name={"Sign in to your account"} />,
          },
          {
            path: "register",
            element: <Auth greetings={"register"} name={"Join our platform"} />,
          },
          {
            path: "approve",
            element: <Auth greetings={"approve"} name={"Verification code sent to your email. Enter it here."} />,
          },
        ],
      },
      // =====================================================
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "message",
            element: <Message />,
          },
          {
            path: "personalData",
            element: <Personal />,
          },
        ],
      },
      //Проверка, на почту код ------
      // {
      //   path: "approve",
      //   element: <CheckEmail />,
      // },
      // {
      //   path: "delete",
      //   element: <Delete />,
      // },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
