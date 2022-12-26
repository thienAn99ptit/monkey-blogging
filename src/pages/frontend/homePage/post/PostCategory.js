import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const CategoryStyled = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  a {
    display: block;
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;

function PostCategory({ children, to = "/", type, className }) {
  return (
    <CategoryStyled type={type} className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </CategoryStyled>
  );
}
PostCategory.propTypes = {
  type: PropTypes.string,
  to: PropTypes.string,
};

export default PostCategory;
