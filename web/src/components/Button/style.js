import styled from "styled-components";

const defaultWidth = "120px";
const defaultHeight = "120px";
const defaultPadding = "8px 16px";
const defaultBorderRadius = "10px";
const defaultBorder = "1px solid #2b4d66";

const CustomButton = styled.button`
  outline: unset;
  color: #2b4d66;
  cursor: pointer;
  background: #d8e2f1;
  text-align: center;
  border-radius: ${(props) => props.borderRadius || defaultBorderRadius};
  border: ${(props) => props.border || defaultBorder};
  padding: ${(props) => props.padding || defaultPadding};
  width: ${(props) => props.width || defaultWidth};
  height: ${(props) => props.height || defaultHeight};

  &:hover {
    color: #fff;
    background: #87a0b7;
  }
`;

export default CustomButton;
