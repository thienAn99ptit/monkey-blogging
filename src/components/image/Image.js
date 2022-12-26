import { useState, forwardRef } from "react";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = "/no-image.png",
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <img
        className={className}
        ref={ref}
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
        loading="lazy"
      />
    );
  }
);

export default Image;
