import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      font-size: 18px;
      margin-bottom: 20px;
      color: ${(props) => props.theme.gray23};
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ data, category, author, height = "100%", width = "" }) => {
  return (
    <PostItemStyles>
      <PostImage
        to={`/${data?.slug}`}
        src={data?.image_url}
        alt=""
        height={height}
        width={width}
      ></PostImage>
      <div className="flex flex-col flex-1 w-full justify-around">
        <div className="flex-1">
          <PostCategory type="primary" to={`/${data?.slug}`}>
            {category}
          </PostCategory>
          <PostTitle to={`/${data?.slug}`}>{data?.title}</PostTitle>
        </div>
        <PostMeta date="Mar 23" author={author} className=""></PostMeta>
      </div>
    </PostItemStyles>
  );
};

export default PostItem;
