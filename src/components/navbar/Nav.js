import React from "react";
import "./Nav.scss";

const Nav = () => {
  const [hamburger, setHamburger] = React.useState(true);

  const hamburgerHandle = () => {
    setHamburger(!hamburger);
  };
  return (
    <div>
      <nav className="nav">
        <p className="logo-nav">Company</p>
      </nav>
    </div>
  );
};

export default Nav;
