import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/router.jsx";
import ContextProvider from "./context/ContextProvider";

createRoot(document.getElementById("root")).render(
 <StrictMode>
 <Suspense fallback={<div>Loading...</div>}>
 <ContextProvider>
 <RouterProvider router={router} />
 </ContextProvider>
 </Suspense>
 </StrictMode>,
);
