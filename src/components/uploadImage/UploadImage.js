import React from "react";
import PropTypes from "prop-types";

function UploadImage({
  name,
  className,
  progress,
  handleDeteleImage = () => {},
  image,
  ...rest
}) {
  return (
    <label className="w-full relative cursor-pointer group">
      <input type="file" className="hidden-input" name={name} {...rest} />
      <div className="h-[250px] flex items-center justify-center w-full bg-slate-200 rounded-lg ">
        {!image && progress !== 0 && (
          <div className="h-14 w-14 border-green-500 border-4 border-t-transparent z-10 absolute  rounded-full animate-spin"></div>
        )}
        {!image && progress === 0 && (
          <>
            <img src="/upload-image.png" alt="" className="h-[100px]" />{" "}
            <p className="text-gray-500 ">Chosse file</p>
          </>
        )}
        {image && (
          <>
            <img src={image} alt="" className="w-full h-full object-cover" />
            <button
              onClick={handleDeteleImage}
              type="button"
              className="absolute z-10 w-16 h-16 bg-white rounded-full text-red-500 flex justify-center items-center hover:bg-red-500 hover:text-white transition-all shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      {!image && (
        <div
          className={`h-1 bg-[#1DC071] absolute bottom-0 left-0 rounded-lg transition-all`}
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
}
UploadImage.propTypes = {};

export default UploadImage;
