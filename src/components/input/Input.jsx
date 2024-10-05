import React from "react";
import { BiDollar } from "react-icons/bi";

// const Input = ({
//   id,
//   label,
//   type = "text",
//   disabled,
//   formatPrice,
//   required,
//   errors = {},
//   onChange,
//   value,
// }) => {
//   return (
//     <div className="w-full relative">
//       {formatPrice && (
//         <BiDollar
//           size={24}
//           className="
//             text-neutral-700
//             absolute
//             top-5
//             left-2
//           "
//         />
//       )}
//       <input
//         id={id}
//         disabled={disabled}
//         placeholder=" "
//         type={type}
//         onChange={onChange}
//         value={value}
//         required={required} // Handle required fields
//         className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
//           formatPrice ? "pl-9" : "pl-4"
//         } ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
//           errors[id] ? "focus:border-rose-500" : "focus:border-black"
//         }`}
//       />
//       <label
//         className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
//           formatPrice ? "left-9" : "left-4"
//         } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
//           errors[id] ? "text-rose-500" : "text-zinc-400"
//         }`}
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

const Input = ({ value, placeholder, type }) => {
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
        value={value}
        onChange={"handleEmailChange"}
        type={type}
        className="block w-full rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        placeholder={placeholder}
        required
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
