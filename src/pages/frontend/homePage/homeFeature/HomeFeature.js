import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../../../components/heading/Heading";
import { db } from "../../../../firebase/firebase-config";
import PostFeatureItem from "../post/PostFeatureItem";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [hotPost, setHotPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      let result = [];
      const postRef = collection(db, "posts");
      const q = query(postRef, where("hot", "==", true), limit(3));
      const querySnapshot = await getDocs(q);
      onSnapshot(q, (snapShot) => {
        snapShot.forEach((post) => {
          result.push({
            id: post.id,
            ...post.data(),
          });
        });
        setHotPost(result);
      });
    };
    getPost();
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {hotPost.length > 0 &&
            hotPost.map((post) => (
              <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
            ))}
          {/* <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem> */}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
