import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../../../components/heading/Heading";
import PostNewestLarge from "../post/PostNewestLarge";
import PostNewestItem from "../post/PostNewestItem";
import PostItem from "../post/PostItem";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 40px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const HomeNewest = () => {
  const [newestPost, setNewestPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      let result = [];
      const postRef = collection(db, "posts");
      const q = query(
        postRef,
        where("status", "==", 1),
        where("hot", "==", false),
        limit(4)
      );
      onSnapshot(q, (snapShot) => {
        snapShot.forEach((post) => {
          result.push({
            id: post.id,
            ...post.data(),
          });
        });
        setNewestPost(result);
      });
    };
    getPost();
  }, []);
  if (!newestPost) return null;
  const [first, ...orthers] = newestPost;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {orthers.length > 0 &&
              orthers.map((orther) => (
                <PostNewestItem data={orther}></PostNewestItem>
              ))}
          </div>
        </div>
        {/* <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div> */}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
