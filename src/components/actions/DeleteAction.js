import { TrashIcon } from "../icons/Icons";

function DeleteAction({ className, onClick, ...props }) {
  return (
    <div
      className={`flex items-center justify-center text-xs p-1 rounded-md bg-red-500 text-white shadow-md cursor-pointer ${className}`}
      {...props}
      onClick={onClick}
    >
      <TrashIcon className="w-4 h-4 flex items-center justify-center"></TrashIcon>
    </div>
  );
}

export default DeleteAction;
