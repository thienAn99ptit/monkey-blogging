import styled from "styled-components";

const LabelStyled = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
  cursor: pointer;
`;
function Label({ className, htmlFor, children, ...props }) {
  return (
    <LabelStyled htmlFor={htmlFor} className={className} {...props}>
      {children}
    </LabelStyled>
  );
}

export default Label;
