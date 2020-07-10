import React from "react";
import CustomButton from "./style";

const StyledButton = ({ height, width, padding, onClick, children }) => {
  return (
    <CustomButton
      padding={padding}
      height={height}
      width={width}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export default StyledButton;
