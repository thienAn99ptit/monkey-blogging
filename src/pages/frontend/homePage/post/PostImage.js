import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Image from "../../../../components/image/Image";

const ImageStyled = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

function PostImage({
  src,
  alt,
  className,
  to = null,
  height = "100%",
  width = "",
}) {
  if (to) {
    return (
      <NavLink
        to={to}
        style={{ display: "block", height: height, width: width }}
      >
        <ImageStyled className={`post-image ${className ? className : ""}`}>
          <Image src={src} alt={alt} className="img" />
        </ImageStyled>
      </NavLink>
    );
  }
  return (
    <ImageStyled className={`post-image ${className}`}>
      <Image src={src} alt={alt} className="img" />
    </ImageStyled>
  );
}

export default PostImage;
