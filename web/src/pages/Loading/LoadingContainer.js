import styled, { keyframes } from "styled-components";
import colorPallet from "../../constants/colorPallet";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background: #000000b8;
`;

const rotate = keyframes`
from {
  transform: rotate(360deg);
}

to {
  transform: rotate(0deg);
}
`;
const defaultSpinVelocity = "1s";

export const SpiningContainer = styled.div`
  animation: ${rotate} ${(props) => props.spinVelocity || defaultSpinVelocity}
    linear infinite;
`;

const defaultLabelColor = colorPallet.green.high;
export const LoadingLabel = styled.div`
  margin-top: 32px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 2px;
  font-family: Roboto, sans-serif;
  color: ${(props) => props.labelColor || defaultLabelColor};
`;

export default LoadingContainer;
