import React from "react";

function TextInput({
  label,
  placeholder,
  requird = false,
  type = "text",
  register,
  error,
  ...props
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        {...props}
        className={`
        w-full px-3 py-2 sm:py-2.5
        border rounded-lg
        text-sm sm:text-base
        placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
        ${error ? "border-red-500" : "border-gray-300"}
      `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default TextInput;
