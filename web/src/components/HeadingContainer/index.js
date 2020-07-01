import React from "react";
import CustomHeading, { CustomContainer } from "./style";
import colorPallet from "../../constants/colorPallet";

const HeadingContainer = ({
  heading,
  centerHeading,
  maxWidth,
  margin = "8vh auto 0",
  children,
}) => {
  return (
    <CustomContainer
      padding="none"
      borderRadius="10px"
      margin={margin}
      maxWidth={maxWidth}
    >
      {heading && (
        <CustomContainer
          padding="none"
          margin="none"
          border="none"
          borderRadius="10px 10px 0px 0px"
          centerHeading={centerHeading}
          backgroundColor={colorPallet.blue.high}
        >
          <CustomHeading>{heading}</CustomHeading>
        </CustomContainer>
      )}
      <CustomContainer borderRadius="0px 0px 10px 10px" border="none">
        {children}
      </CustomContainer>
    </CustomContainer>
  );
};

export default HeadingContainer;
