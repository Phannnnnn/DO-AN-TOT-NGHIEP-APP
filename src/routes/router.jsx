import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MainLayout from "../layouts/mainLayout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
      },
    ],
  },
]);
