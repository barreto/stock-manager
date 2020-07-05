import styled from "styled-components";

const defaultMinWidth = "300px";
const defaultMaxWidth = "900px";
const defaultPadding = "16px 32px";
const defaultHeadingFontSize = "48px";
const defaultBorder = "1px solid #fff";
const defaultBorderRadius = "10px";
const defaultMargin = "8px";
const defaultTextAlign = "left";

const CustomHeading = styled.h1`
  margin: 0px;
  color: #fff;
  letter-spacing: 4px;
  min-width: ${(props) => props.minWidth || defaultMinWidth};
  max-width: ${(props) => props.maxWidth || defaultMaxWidth};
  padding: ${(props) => props.padding || defaultPadding};
  font-size: ${(props) => props.fontSize || defaultHeadingFontSize};
`;
export default CustomHeading;

export const CustomContainer = styled.div`
  text-align: ${(props) => (props.centerHeading ? "center" : defaultTextAlign)};
  min-width: ${(props) => props.minWidth || defaultMinWidth};
  max-width: ${(props) => props.maxWidth || defaultMaxWidth};
  border: ${(props) => props.border || defaultBorder};
  border-radius: ${(props) => props.borderRadius || defaultBorderRadius};
  padding: ${(props) => props.padding || defaultPadding};
  margin: ${(props) => props.margin || defaultMargin};
  background: ${(props) => props.backgroundColor || "#fff"};
`;
