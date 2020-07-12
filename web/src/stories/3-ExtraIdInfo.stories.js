import React from "react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import ExtraIdInfo from "../components/ExtraIdInfo";

export default {
  title: "Extra Id Info",
  decorators: [withKnobs],
};

export const extraIdInfo = () => (
  <ExtraIdInfo isDisabled={boolean("Is disabled", true)}></ExtraIdInfo>
);
