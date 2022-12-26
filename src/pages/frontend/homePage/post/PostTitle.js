import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const TitleStyled = styled.h3`
  a {
    display: block;
  }
  font-weight: 600;
  line-height: 1.5;
  display: block;
`;

function PostTitle({ children, to = "/", className, type, props }) {
  return (
    <TitleStyled type={type} className={`post-title ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </TitleStyled>
  );
}

PostTitle.propTypes = {
  to: PropTypes.string,
};

export default PostTitle;
