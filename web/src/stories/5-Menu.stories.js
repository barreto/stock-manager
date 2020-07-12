import React from "react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import Menu from "../components/Menu";
import menuOptions from "../constants/menuOptions";

export default {
  title: "Menu",
  decorators: [withKnobs],
};

export const menu = () => {
  const outerId = "outer-container-doc";
  const wrapperId = "page-wrap-doc";
  return (
    <div id={outerId} style={{ background: "#333" }}>
      <Menu
        isOpen={boolean("Is Open", false)}
        pageWrapId={wrapperId}
        outerContainerId={outerId}
        menuType={select("Menu Type", menuOptions)}
      >
        <a href="/">Here we have a link</a>
      </Menu>
      <div id={wrapperId} style={{ height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#999",
            background: "#eee",
          }}
        >
          <h1>Test</h1>
          <p>Posteriorly you can change this body</p>
        </div>
      </div>
    </div>
  );
};
