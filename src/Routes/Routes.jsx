import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Dashboard from "../Dashboard/Dashboard";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import ErrorRoute from "../Layouts/ErrorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  },

  //authentication routes
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;