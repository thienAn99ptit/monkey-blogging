import parse from "html-react-parser";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Heading from "../../../components/heading/Heading";
import { db } from "../../../firebase/firebase-config";
import PostCategory from "../homePage/post/PostCategory";
import PostImage from "../homePage/post/PostImage";
import PostItem from "../homePage/post/PostItem";
import PostMeta from "../homePage/post/PostMeta";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  let { slug } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [postRelation, setPostRelation] = useState([]);

  useEffect(() => {
    async function getPage() {
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snap) => {
        snap.forEach(async (val) => {
          const cateRef = doc(db, "categories", val.data()?.categoryId);
          const snapCate = await getDoc(cateRef);
          const userRef = doc(db, "users", val.data()?.userId);
          const snapUser = await getDoc(userRef);

          setPostDetail({
            id: val.id,
            ...val.data(),
            category: snapCate.data(),
            user: snapUser.data(),
          });
        });
      });
    }
    getPage();
  }, [slug]);
  useEffect(() => {
    const postRelaRef = query(
      collection(db, "posts"),
      where("categoryId", "==", postDetail?.categoryId || "")
      // where("id", "!=", postDetail?.categoryId || ""),
    );
    onSnapshot(postRelaRef, (snap) => {
      let result = [];
      snap.forEach((value) => {
        result.push({
          id: value.id,
          ...value.data(),
        });
      });
      setPostRelation(result);
    });
  }, [postDetail?.categoryId, slug]);
  if (!slug) return;
  return (
    <PostDetailsPageStyles>
      <div className="container">
        <div className="post-header">
          <PostImage
            src={postDetail?.image_url}
            className="post-feature"
          ></PostImage>
          <div className="post-info">
            <PostCategory className="mb-6">
              {postDetail.category?.name}
            </PostCategory>
            <h1 className="post-heading">{postDetail?.title}</h1>
            <PostMeta
              date={new Date().toLocaleDateString()}
              author={postDetail.user?.fullname}
            ></PostMeta>
          </div>
        </div>
        <div className="post-content">
          <div className="entry-content">{parse(`${postDetail?.content}`)}</div>
          <div className="author">
            <div className="author-image">
              <img src={postDetail.user?.image_url} alt="" />
            </div>
            <div className="author-content">
              <h3 className="author-name">{postDetail.user?.fullname}</h3>
              <p className="author-desc">{postDetail.user?.description}</p>
            </div>
          </div>
        </div>
        <div className="post-related">
          <Heading>Bài viết liên quan</Heading>
          <div className="grid-layout grid-layout--primary">
            {postRelation.length > 0 &&
              postRelation.map((postRe) => (
                <PostItem
                  key={postRe.id}
                  data={postRe}
                  category={postDetail.category?.name}
                  author={postDetail.user?.fullname}
                  height="max-content"
                  width="100%"
                ></PostItem>
              ))}
          </div>
        </div>
      </div>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
