import React from "react";
import CustomHeading, { CustomContainer } from "./style";
import colorPallet from "../../constants/colorPallet";

const HeadingContainer = ({
  heading,
  centerHeading,
  minWidth,
  maxWidth,
  margin = "8vh auto 0",
  children,
}) => {
  return (
    <CustomContainer
      padding="none"
      borderRadius="10px"
      margin={margin}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      {heading && (
        <CustomContainer
          padding="none"
          margin="none"
          border="none"
          minWidth={minWidth}
          maxWidth={maxWidth}
          borderRadius="10px 10px 0px 0px"
          centerHeading={centerHeading}
          backgroundColor={colorPallet.blue.high}
        >
          <CustomHeading>{heading}</CustomHeading>
        </CustomContainer>
      )}
      <CustomContainer
        border="none"
        minWidth={minWidth}
        maxWidth={maxWidth}
        borderRadius="0px 0px 10px 10px"
      >
        {children}
      </CustomContainer>
    </CustomContainer>
  );
};

export default HeadingContainer;
