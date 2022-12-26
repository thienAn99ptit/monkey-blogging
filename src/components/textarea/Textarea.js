import { useController } from "react-hook-form";
import styled from "styled-components";
const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayf1};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    resize: none;
  }

  textarea::-webkit-textarea-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-textarea-placeholder {
    color: #b2b3bd;
  }
`;
function Textarea({ name = "", control, ...props }) {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea id={name} {...field} {...props}></textarea>
    </TextareaStyles>
  );
}

export default Textarea;
