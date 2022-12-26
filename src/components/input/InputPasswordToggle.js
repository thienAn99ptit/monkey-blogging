import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../icons/Icons";
import Input from "./Input";

function InputPasswordToggle({ control }) {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <>
      <Input
        control={control}
        name="password"
        type={togglePassword ? "text" : "password"}
        className="input"
        placeholder="Please enter your Password"
        hasIcon
      >
        {togglePassword ? (
          <EyeIcon
            onClick={() => setTogglePassword((prev) => !prev)}
            className="input-icon w-4 h-4"
          ></EyeIcon>
        ) : (
          <EyeCloseIcon
            onClick={() => setTogglePassword((prev) => !prev)}
            className="input-icon"
          ></EyeCloseIcon>
        )}
      </Input>
    </>
  );
}

export default InputPasswordToggle;
