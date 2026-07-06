import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MainLayout from "../layouts/mainLayout/MainLayout";
import HomePage from "../pages/Home/HomePage";
import App from "../App";
import SearchResultPage from "@/pages/SearchResultPage/SearchResultPage";
import RoomDetailPage from "@/pages/RoomDetailPage/RoomDetailPage";
import BookingPage from "@/pages/BookingPage/BookingPage";
import VNPayReturnPage from "@/pages/BookingPage/VNPayReturnPage";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import AuthLayout from "@/layouts/authLayout/AuthLayout";
import ProfilePage from "@/pages/Profile/ProfilePage";
import AboutPage from "@/pages/About/AboutPage";

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
 { path: "booking/vnpay-return", element: <VNPayReturnPage /> },
 { path: "profile", element: <ProfilePage /> },
 { path: "about", element: <AboutPage /> },
 ],
 },
 {
 path: "auth",
 element: <AuthLayout />,
 children: [
 { path: "login", element: <LoginPage /> },
 { path: "register", element: <RegisterPage /> },
 ],
 },
 ],
 },
]);
