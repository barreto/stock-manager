import styled from "styled-components";

const defaultMinWidth = "300px";
const defaultMaxWidth = "900px";
const defaultPadding = "16px 0px";
const defaultBorder = "1px solid #fff";
const defaultBorderRadius = "10px";
const defaultMargin = "0px";
const defaultAlignItems = "center";
const defaultJustifyContent = "space-between";
const defaultDirection = "row";
const defaultFlexGrow = "none";
const defaultBackground = "#fff";

function defineWidth(flexGrow, received, defaultSize) {
  const hasFlexGrow = Boolean(flexGrow);
  if (hasFlexGrow) {
    return "auto";
  }
  return received || defaultSize;
}

const CustomFlexContainer = styled.div`
  display: flex;
  flex-grow: ${(props) => props.flexGrow || defaultFlexGrow};
  align-items: ${(props) => props.alignItems || defaultAlignItems};
  justify-content: ${(props) => props.justifyContent || defaultJustifyContent};
  flex-direction: ${(props) => props.direction || defaultDirection};
  border: ${(props) => props.border || defaultBorder};
  border-radius: ${(props) => props.borderRadius || defaultBorderRadius};
  padding: ${(props) => props.padding || defaultPadding};
  margin: ${(props) => props.margin || defaultMargin};
  background: ${(props) => props.backgroundColor || defaultBackground};
  min-width: ${(props) =>
    defineWidth(props.flexGrow, props.minWidth, defaultMinWidth)};
  max-width: ${(props) =>
    defineWidth(props.flexGrow, props.maxWidth, defaultMaxWidth)};
`;

export default CustomFlexContainer;
