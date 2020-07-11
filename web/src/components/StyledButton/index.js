import React from "react";
import CustomButton from "./style";

const StyledButton = ({
  height,
  width,
  disabled,
  padding,
  onClick,
  children,
}) => {
  return (
    <CustomButton
      padding={padding}
      height={height}
      width={width}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </CustomButton>
  );
};

export default StyledButton;
