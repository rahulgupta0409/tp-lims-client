import React from "react";

const Avatar = ({ src, userName }) => {
  return (
    <div>
      {src ? (
        <img
          className="rounded-full"
          height="30"
          width="30"
          alt="hasImag"
          src={src}
        />
      ) : userName ? (
        <img
          className="rounded-full h-[30px] w-[30px] bg-[#a78bfa]"
          alt="nameImage"
          src={`https://ui-avatars.com/api/?name=${userName}`}
        />
      ) : (
        <img
          className="rounded-full"
          height="30"
          width="30"
          alt="noUser"
          src="/assets/avatar.png"
        />
      )}
    </div>
  );
};

export default Avatar;
