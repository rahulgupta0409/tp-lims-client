import React from "react";
import OrgLogo from "../../images/Tilak_Pathology_PNG_Logo-removebg.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (localStorage.getItem("token")) {
          return navigate("/home");
        } else {
          navigate("/");
        }
      }}
    >
      <img
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="50"
        width="70"
        src={OrgLogo}
      />
    </div>
  );
};

export default Logo;
