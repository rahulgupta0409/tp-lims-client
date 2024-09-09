import React, { useCallback, useState } from "react";

import Avatar from "../avatar/Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookies";

const UserMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const handleLogout = () => {
    removeCookie("__rT");
    removeCookie("user");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          //   onClick={onRent}
        >
          Doctors
        </div>
        <div
          onClick={toggleOpen}
          className="p-2 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {currentUser ? (
              <Avatar userName={currentUser} />
            ) : (
              <img
                className="rounded-full"
                height="30"
                width="30"
                alt="Avatar"
                src="/assets/avatar.png"
              />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {/* <MenuItem
                  onClick={() => navigate("/patient")}
                  label="My Patients"
                />
                <MenuItem label="Airbnb your home" />
                <hr />
                <MenuItem onClick={() => handleLogout} label="Logout" /> */}
              </>
            ) : (
              <>
                {/* <MenuItem label="Login" />
                <MenuItem label="Sign up" /> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
