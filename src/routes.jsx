import App from "./App";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: null,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <SignupPage />
            },
            {
                path: "home",
                element: <HomePage />
            }
        ]
    }
]

export default routes