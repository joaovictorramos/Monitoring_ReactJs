import { Routes, Route } from "react-router-dom";
import App from "./App";
import Monitor from "./Components/Monitor/Monitor";
import Forgot from "./Components/ForgotPassword/Forgot";
import RegisterUser from "./Components/RegisterUser/RegisterUser";

function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/monitor" element={<Monitor />}></Route>
            <Route path="/forgot" element={<Forgot />}></Route>
            <Route path="/registerUser" element={<RegisterUser />}></Route>
        </Routes>
    )
}

export default MainRoutes;