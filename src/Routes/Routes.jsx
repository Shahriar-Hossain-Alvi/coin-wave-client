import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Dashboard from "../Dashboard/Dashboard";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>
      }
    ]
  },

  //authentication routes
  {
    path: '/signup',
    element: <Signup></Signup>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]);

export default router;