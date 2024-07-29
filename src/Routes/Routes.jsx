import { createBrowserRouter } from "react-router-dom";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import ErrorRoute from "../Layouts/ErrorRoute";

import Dashboard from "../Dashboard/Dashboard";
import DashboardMain from "../Layouts/DashboardMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardMain></DashboardMain> ,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: '/',
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