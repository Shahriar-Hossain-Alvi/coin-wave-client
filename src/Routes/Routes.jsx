import { createBrowserRouter } from "react-router-dom";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import ErrorRoute from "../Layouts/ErrorRoute";

import Dashboard from "../Dashboard/Dashboard";
import DashboardMain from "../Layouts/DashboardMain";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardMain></DashboardMain> ,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Dashboard /></PrivateRoute>
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