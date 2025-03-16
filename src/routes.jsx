import App from "./App";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
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
            }
        ]
    }
]

export default routes