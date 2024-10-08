import React from "react";

const SignupInput = () => {
  return (
    <div className="relative mt-6 flex items-center">
      <span className="absolute">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-3 h-6 w-6 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </span>
      <input
        id="email"
        name="email"
        value={"email"}
        onChange={"handleEmailChange"}
        type="email"
        className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        placeholder="Email address"
        required
        autoComplete="off"
      />
    </div>
  );
};

export default SignupInput;
