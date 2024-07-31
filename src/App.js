import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Organization from "./components/organization/Organization";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  // let imageStyle = {
  //   height: "824px",
  //   width: "1260px",
  //   backgroundImage:
  //     'url("https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  //   backgroundSize: "contain",
  //   backgroundRepeat: "no-repeat",
  //   color: "white",
  // };

  // <div class="image" style={imageStyle}>
  //   {/* <Nav /> */}
  //   {/* <Login /> */}
  //   <Signup />
  //   {/* <Organization /> */}
  // </div>;

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/organization" element={<Organization />}></Route>
        {/* <Route path="/cards" element={<Card />}></Route> */}
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
