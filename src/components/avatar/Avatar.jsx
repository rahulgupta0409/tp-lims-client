import React from "react";

const Avatar = ({ src, username }) => {
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
      ) : username ? (
        <img
          className="rounded-full h-[30px] w-[30px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
          alt="nameImage"
          src={`https://ui-avatars.com/api/?name=${username}`}
        />
      ) : (
        <img
          className="rounded-full"
          height="30"
          width="30"
          alt="noUser"
          src={src}
        />
      )}
    </div>
  );
};

export default Avatar;
