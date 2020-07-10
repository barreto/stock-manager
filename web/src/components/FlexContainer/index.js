import React from "react";
import CustomFlexContainer from "./style";

const FlexContainer = ({
  alignItems,
  justifyContent,
  direction,
  minWidth,
  maxWidth,
  borderRadius,
  flexGrow,
  color,
  border = "none",
  margin = "none",
  padding = "none",
  backgroundColor = "transparent",
  children,
}) => {
  return (
    <CustomFlexContainer
      alignItems={alignItems}
      justifyContent={justifyContent}
      direction={direction}
      minWidth={minWidth}
      maxWidth={maxWidth}
      border={border}
      borderRadius={borderRadius}
      padding={padding}
      margin={margin}
      flexGrow={flexGrow}
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </CustomFlexContainer>
  );
};

export default FlexContainer;
