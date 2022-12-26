import { EyeIcon } from "../icons/Icons";

function ViewAction({ className, onClick, ...props }) {
  return (
    <div
      className={` p-1 rounded-md bg-gray-400 text-white shadow-md cursor-pointer ${className}`}
      {...props}
      onClick={onClick}
    >
      <EyeIcon className="w-4 h-4 flex items-center justify-center"></EyeIcon>
    </div>
  );
}

export default ViewAction;
