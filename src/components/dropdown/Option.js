import React from "react";
import { useDropdown } from "../../contexts/dropdown-context";

const Option = ({ onClick, ...props }) => {
  const { setShow } = useDropdown();
  const handleDropDown = () => {
    onClick && onClick();
    setShow((prev) => !prev);
  };
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handleDropDown}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Option;
