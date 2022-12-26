import { useDropdown } from "../../contexts/dropdown-context";

function WrapOption({ children }) {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
}

export default WrapOption;
