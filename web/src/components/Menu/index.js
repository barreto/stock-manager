import React from "react";
import BurguerMenu from "react-burger-menu";
import colorPallet from "../../constants/colorPallet";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: colorPallet.blue.high,
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: colorPallet.blue.high,
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const Menu = ({
  pageWrapId,
  outerContainerId,
  children,
  isOpen,
  onClose,
  onOpen,
  onStateChange,
  menuType = "scaleRotate",
}) => {
  const BurguerMenuComponent = BurguerMenu[menuType];

  return (
    <BurguerMenuComponent
      isOpen={isOpen}
      styles={styles}
      onClose={onClose}
      onOpen={onOpen}
      onStateChange={onStateChange}
      pageWrapId={pageWrapId}
      outerContainerId={outerContainerId}
    >
      {children}
    </BurguerMenuComponent>
  );
};

export default Menu;
