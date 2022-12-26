import React from "react";
import styled from "styled-components";

const MetaStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
  .post-title {
    color: ${(props) => props.theme.gray23};
    font-size: 22px;
    margin-bottom: 12px;
  }
  .post-author {
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

function PostMeta({ date, author, className }) {
  return (
    <MetaStyled className={`post-infor ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
    </MetaStyled>
  );
}

export default PostMeta;
