import React from "react";
import CustomButton from "./style";

const Button = ({ height, widht, padding, onClick, children }) => {
  return (
    <CustomButton
      padding={padding}
      height={height}
      widht={widht}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
