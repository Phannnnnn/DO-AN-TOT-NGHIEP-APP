import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MainLayout from "../layouts/mainLayout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import App from "../App";
import SearchResultPage from "@/pages/SearchResultPage/SearchResultPage";
import RoomDetailPage from "@/pages/RoomDetailPage/RoomDetailPage";
import BookingPage from "@/pages/BookingPage/BookingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "search", element: <SearchResultPage /> },
          { path: "rooms/detail", element: <RoomDetailPage /> },
          { path: "booking", element: <BookingPage /> },
        ],
      },
    ],
  },
]);
