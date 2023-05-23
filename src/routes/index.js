import {createBrowserRouter} from "react-router-dom";
import {CHAT_URL, LOGIN_URL} from "./constants";
import LoginPage from "../pages/loginPage";
import ChatPage from "../pages/chatPage";
import ErrorPage from "../pages/errorPage";

export const routes = createBrowserRouter([
    {
        path: LOGIN_URL,
        element: <LoginPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: CHAT_URL,
        element: <ChatPage/>,
        errorElement: <ErrorPage/>
    },
]);