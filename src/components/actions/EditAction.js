import { EditIcon } from "../icons/Icons";

function EditAction({ className, onClick, ...props }) {
  return (
    <div
      className={`flex items-center justify-center p-1 text-xs rounded-md bg-green-400 text-white shadow-md cursor-pointer  ${className}`}
      {...props}
      onClick={onClick}
    >
      <EditIcon className="w-4 h-4 flex items-center justify-center"></EditIcon>
    </div>
  );
}

export default EditAction;
