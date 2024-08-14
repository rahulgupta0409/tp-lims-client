import "./App.css";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Organization from "./pages/organization/Organization";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Minortests from "./pages/minortests/Minortests";
import Navbars from "./components/navbar/Nav";
import PatientsEntryForm from "./components/PatientsEntryForm";
import MultipleSelectChip from "./helpers/Helper";
import MinorTestMainPage from "./pages/minortests/MinorTestMainPage";
import Tables from "./components/table/Tables";
import Majortests from "./pages/majortests/majortests";

function App() {
  // const excludedRoutes = ["/admin/dashboard", "/admin/products"];
  return (
    <Router>
      <div>
        {/* <Navbars /> */}
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>

          <Route path="/organization" element={<Organization />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/minor" element={<Minortests />}></Route>
          <Route path="/patiententry" element={<PatientsEntryForm />}></Route>
          <Route path="/helper" element={<Majortests />}></Route>
          <Route path="/minortests" element={<MinorTestMainPage />}></Route>
          <Route path="/table" element={<Tables />}></Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
