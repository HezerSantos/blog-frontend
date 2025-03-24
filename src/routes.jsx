import App from "./App";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages";
import DashboardPage from "./pages/dashboardPage";
import CreateBlog from "./pages/CreateBlog";
import ViewBlog from "./pages/ViewBlog";
const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: null,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "signup",
                element: <SignupPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "dashboard",
                element: <DashboardPage />
            },
            {
                path: "dashboard/create-blog",
                element: <CreateBlog />
            },
            {
                path: "blogs/:id",
                element: <ViewBlog />
            }
        ]
    }
]

export default routes