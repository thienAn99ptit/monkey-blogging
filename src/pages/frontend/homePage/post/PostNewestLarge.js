import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../../../../firebase/firebase-config";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      margin-bottom: 16px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      color: ${(props) => props.theme.gray23};
      font-size: 22px;
      margin-bottom: 12px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    &-image {
      height: 250px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
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
    <PostNewestLargeStyles>
      <PostImage to="/" src={data?.image_url} alt=""></PostImage>
      <PostCategory type="primary">{value.categary.name || ""}</PostCategory>
      <PostTitle>{data?.title}</PostTitle>
      <PostMeta date="Mar 23" author={value.user.fullname || ""}></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
