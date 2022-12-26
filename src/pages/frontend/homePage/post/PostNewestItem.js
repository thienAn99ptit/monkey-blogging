import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      flex-shrink: 0;
      width: 180px;
      height: 130px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-content {
      flex: 1;
    }
    &-title {
      font-size: 16px;
      margin-bottom: 8px;
      color: ${(props) => props.theme.gray23};
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
const PostNewestItem = ({ data }) => {
  const [value, setValue] = useState();
  useEffect(() => {
    const getValue = async () => {
      const cateSnap = await getDoc(doc(db, "categories", data?.categoryId));
      const authSnap = await getDoc(doc(db, "users", data?.userId));
      setValue({
        categary: { ...cateSnap.data() },
        user: { ...authSnap.data() },
      });
    };
    getValue();
  }, [data?.categoryId, data?.userId]);
  if (!value) return null;
  return (
    <PostNewestItemStyles>
      <PostImage to={data.slug} src={data.image_url} alt=""></PostImage>

      <div className="post-content">
        <PostCategory type="secondary">
          {value.categary.name || ""}
        </PostCategory>
        <PostTitle to={data.slug}>{data.title}</PostTitle>
        <PostMeta date="Mar 23" author={value.user.fullname || ""}></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
