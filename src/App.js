import "./App.css";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Minortests from "./pages/minortests/Minortests";
import Organization from "./pages/organization/Organization";
import Navbars from "./components/navbar/Nav";
import MultipleSelectChip from "./helpers/Helper";
import MinorTestMainPage from "./pages/minortests/MinorTestMainPage";
import Tables from "./components/table/Tables";
import Majortests from "./pages/majortests/majortests";
import GridExample from "./components/aggrid/agGrid";
import PatientEntry from "./pages/patiententry/patiententry";
import MainDiv from "./pages/main/mainPage";
import Modal from "./components/modals/Modals";
import BackToTopButton from "./components/BackToTopButton";
import Stack from "./components/stack/Stack";
import Patients from "./pages/patients/patients";
import TestEntry from "./components/test-entry/testEntry";
import MajorTestReport from "./components/test-entry/majorTestReport";
import MainTestEntry from "./components/test-entry/mainTestEntry";
import ErrorBoundary from "./components/errorBoundary";
import SignupInput from "./components/input/signupInput";

function App() {
  // const excludedRoutes = ["/admin/dashboard", "/admin/products"];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ErrorBoundary>
        <Router>
          <div>
            {/* <Navbars /> */}
            <BackToTopButton />
            <Routes>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/" element={<Login />}></Route>
              <Route path="/organization" element={<Organization />}></Route>
              <Route path="/home" element={<GridExample />}></Route>
              <Route path="/minor" element={<Minortests />}></Route>
              <Route path="/helper" element={<Majortests />}></Route>
              <Route path="/minortests" element={<MinorTestMainPage />}></Route>
              <Route path="/table" element={<Tables />}></Route>
              <Route path="/patient" element={<Patients />}></Route>
              <Route path="*" element={<Navigate to="/" replace />}></Route>
              <Route path="/help" element={<PatientEntry />}></Route>
              <Route path="/h" element={<MainTestEntry />}></Route>
              <Route path="/signupinputtest" element={<SignupInput />}></Route>
              <Route
                path="/rahul"
                element={
                  // <Modal
                  //   isOpen={true}
                  //   title="Login"
                  //   actionLabel="Continue"
                  //   onClose={() => console.log("close")}
                  // />
                  <MainDiv />
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
