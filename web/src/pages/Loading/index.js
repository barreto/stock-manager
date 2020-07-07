import React from "react";
import * as feather from "react-icons/fi";
import LoadingContainer, {
  SpiningContainer,
  LoadingLabel,
} from "./LoadingContainer";
import colorPallet from "../../constants/colorPallet";

const Loading = ({
  labelColor,
  loadingText = "Carregando",
  rotationSpeed = "2s",
  iconSize = 48,
  iconName = "FiRefreshCcw",
  iconColor = colorPallet.green.high,
}) => {
  const iconConfig = { size: iconSize, color: iconColor };

  return (
    <LoadingContainer>
      <SpiningContainer spinVelocity={rotationSpeed}>
        {feather[iconName](iconConfig)}
      </SpiningContainer>
      <LoadingLabel labelColor={labelColor}>{loadingText}</LoadingLabel>
    </LoadingContainer>
  );
};

export default Loading;
