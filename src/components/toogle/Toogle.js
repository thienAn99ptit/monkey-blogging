import React from "react";

const Toggle = (props) => {
  const { on, onClick, ...rest } = props;

  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[80px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-purple-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-8 h-[34px] bg-white rounded-full inline-block ${
            on ? "translate-x-[40px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

export default Toggle;
