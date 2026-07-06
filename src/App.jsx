import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
 return (
 <>
 <ScrollToTop />
 <Outlet />
 </>
 );
}

export default App;
