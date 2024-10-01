import React, { useCallback, useEffect, useRef, useState } from "react";

import Avatar from "../avatar/Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookies";
import MenuItem from "./MenuItem";
import { MdOutlineLogout } from "react-icons/md";

const UserMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    removeCookie("__rT");
    removeCookie("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-lg font-semibold py-3 px-4 rounded hover:bg-neutral-100 transition cursor-pointer"
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
              <Avatar username={currentUser} />
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
        <div
          ref={menuRef}
          className="absolute rounded-2xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-base"
        >
          <div className="flex flex-col justify-items-start cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label={currentUser} />
                <MenuItem
                  onClick={() => navigate("/patient")}
                  label="My Patients"
                />
                <MenuItem label="My Patients" />
                <MenuItem label="My Organizations" />
                <MenuItem label="My Doctors" />
                {/* <hr /> */}
                <MenuItem
                  onClick={handleLogout}
                  label="Logout"
                  icon={<MdOutlineLogout />}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={() => navigate("/")} />
                <MenuItem label="Sign up" onClick={() => navigate("/signup")} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
