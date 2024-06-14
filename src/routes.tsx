import { Routes, Route } from "react-router-dom";
import App from "./App";
import Monitor from "./Components/Monitor/Monitor";
import Forgot from "./Components/ForgotPassword/Forgot";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import RegisterMonitor from "./Components/RegisterMonitor/RegisterMonitor";
import RegisterAbsence from "./Components/RegisterAbsence/RegisterAbsence";
import Absence from "./Components/Absence/Absence";

function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/monitor" element={<Monitor />}></Route>
            <Route path="/forgot" element={<Forgot />}></Route>
            <Route path="/absence/:id" element={<Absence />}></Route>
            <Route path="/registerUser" element={<RegisterUser />}></Route>
            <Route path="/registerMonitor" element={<RegisterMonitor />}></Route>
            <Route path="/registerAbsence" element={<RegisterAbsence />}></Route>
        </Routes>
    )
}

export default MainRoutes;