import React from "react";
import { withKnobs, text, number, select, color } from "@storybook/addon-knobs";
import FlexContainer from "../components/FlexContainer";
import flexDirections from "../constants/flexDirections";

export default {
  title: "Flex Container",
  decorators: [withKnobs],
};
// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.

// Knobs for React props
// export const thisIsATest = () => (
//   <button disabled={boolean("Disabled", false)}>
//     {text("Label", "Hello Storybook")}
//   </button>
// );

// // Knobs as dynamic variables.
// export const asDynamicVariables = () => {
//   const name = text("Name", "James");
//   const age = number("Age", 35);
//   const content = `I am ${name} and I'm ${age} years old.`;

//   return <div>{content}</div>;
// };

const flexPositions = [
  "flex-start",
  "center",
  "space-between",
  "space-around",
  "flex-end",
];

export const flexContainer = () => (
  <FlexContainer
    alignItems={select("Align Items", flexPositions, "center")}
    justifyContent={select("Justify Content", flexPositions, "space-between")}
    direction={select("Direction", flexDirections, "row")}
    minWidth={text("Min Width", "100%")}
    maxWidth={text("Max Width", "50%")}
    borderRadius={number("Border Radius", 4)}
    flexGrow={number("Flex Grow", 1)}
    border={text("Border", "1px solid #333")}
    margin={text("Margin", "16px 8px 24px")}
    padding={text("Padding", "32px")}
    color={color("Color", "#333")}
    backgroundColor={color("Background Color", "#777")}
  >
    {[1, 2, 3].map((num) => (
      <div
        style={{
          color: "#333",
          background: "#bbb",
          width: 100,
          height: 100,
          fontSize: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {num}
      </div>
    ))}
  </FlexContainer>
);
