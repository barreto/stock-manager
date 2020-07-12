import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import StyledButton from "../components/StyledButton";

export default {
  title: "Styled Button",
  decorators: [withKnobs],
};

export const styledButton = () => (
  <StyledButton
    height={text("Height", "100px")}
    width={text("Width", "300px")}
    disabled={boolean("Disabled")}
    padding={text("Padding", "none")}
    children={text("Children", "Click me!")}
  ></StyledButton>
);
