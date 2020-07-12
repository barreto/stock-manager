import React from "react";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";
import HeadingContainer from "../components/HeadingContainer";

export default {
  title: "Heading Container",
  decorators: [withKnobs],
};

const groupIds = {
  COMPONENT: "Component",
  CHILD: "Child",
};

export const headingContainer = () => {
  return (
    <HeadingContainer
      heading={text("Heading", "Hello World!", groupIds.COMPONENT)}
      centerHeading={boolean("Center Heading", groupIds.COMPONENT)}
      minWidth={text("Min Width", "300px", groupIds.COMPONENT)}
      maxWidth={text("Max Width", "450px", groupIds.COMPONENT)}
      headingLevel={number(
        "Heading Level",
        1,
        { min: 1, max: 6 },
        groupIds.COMPONENT
      )}
      margin={text("Margin", "4vh auto 0", groupIds.COMPONENT)}
      children={text(
        "Children",
        `I dont know how to send html by storybook :(`,
        groupIds.CHILD
      )}
    />
  );
};
