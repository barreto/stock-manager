import React from "react";
import * as feather from "react-icons/fi";
import colorPallet from "../../constants/colorPallet";
import FlexContainer from "../FlexContainer";
import Button from "../Button";

const IconButton = ({
  height,
  widht,
  padding,
  onClick,
  size = 48,
  direction = "column",
  iconName = "FiXCircle",
  color = colorPallet.blue.high,
  children,
}) => {
  const defaultButtonsConfig = { size, color };

  return (
    <Button widht={widht} height={height} padding={padding} onClick={onClick}>
      <FlexContainer
        border="none"
        minWidht="100%"
        backgroundColor="transparent"
        direction={direction}
      >
        {feather[iconName](defaultButtonsConfig)}
        {children}
      </FlexContainer>
    </Button>
  );
};

export default IconButton;
