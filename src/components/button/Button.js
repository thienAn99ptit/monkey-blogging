import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../loading/LoadingSpinner";

const ButtonStyles = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 58px;
  font-weight: 600;
  font-size: 18px;
  line-height: 1;
  color: #fff;
  padding: 0 20px;
  width: 100%;
  cursor: pointer;
  background: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  border-radius: 8px;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

function Button({ children, type = "button", onClick, ...props }) {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner /> : children;
  if (type === "link" && props?.to) {
    return (
      <NavLink to={props.to}>
        <ButtonStyles type={type} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  } else if (type === "link" && props?.href) {
    return (
      <a href={props.href}>
        <ButtonStyles type={type} onClick={onClick} {...props}>
          {child}
        </ButtonStyles>
      </a>
    );
  }
  return (
    <ButtonStyles type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
}

Button.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  type: PropTypes.string.isRequired,
  to: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
