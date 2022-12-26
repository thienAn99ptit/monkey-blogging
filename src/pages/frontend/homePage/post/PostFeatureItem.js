import styled from "styled-components";
import React, { useState, useEffect } from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background-color: rgba(0, 0, 0, 0.75);
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-title {
      font-size: 22px;
      color: white;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const [categoryValue, setCategoryValue] = useState([]);
  const { image_url, slug, title, categoryId } = data;
  useEffect(() => {
    async function getCategory() {
      const docRef = doc(db, "categories", categoryId);

      const docSnap = await getDoc(docRef);
      setCategoryValue(docSnap.data());
    }
    getCategory();
  }, [categoryId]);
  if (!data) return null;

  return (
    <PostFeatureItemStyles>
      <PostImage src={image_url} alt="unsplash" to={`/${slug}`}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={`/${slug}`} type="primary">
            {categoryValue?.name || "Kien thuc"}
          </PostCategory>
          <PostMeta date="Mar 23" author="Andiez Le"></PostMeta>
        </div>
        <PostTitle to={`/${slug}`}>{title}</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
