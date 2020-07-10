import styled, { css } from "styled-components";
import colorPallet from "../../constants/colorPallet";
import { Link } from "react-router-dom";

const defaultTextAlign = "left";
const defaultShadow = "0 2px 1px #333";
const defaultTransform = "translate(-50%,-50%)";

const MainHeading = styled.h1`
  color: #fff;
  text-transform: uppercase;
  font-size: 42px;
  text-shadow: ${defaultShadow};
  margin-bottom: 8px;
  transition: 1s;
`;

export default MainHeading;

// import img from "../../assets/images/home.jpg"

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background: url(https://picsum.photos/id/181/1920/1189/?blur=2);
  // background: ${colorPallet.green.high};
  background-size: cover;

  & p {
    color: #fff;
    text-shadow: ${defaultShadow};
    font-size: 24px;
    font-weight: bold;
  }
`;

export const HomeButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 8px 24px;
  font-size: 24px;
  cursor: pointer;
  transition: 500ms;

  &:hover {
    background: #fff;
    box-shadow: ${defaultShadow};
  }
`;

export const ColorOverlay = styled.div`
  background: #b3e59f82;
  padding: 16px;
  text-align: center;
  height: 100vh;
  width: 100%;
  padding: 10% 16px 30%;
`;

export const HeaderContent = styled.div`
  background: #33333382;
  padding: 24px 48px;
  text-align: center;
  width: fit-content;
  margin 0 auto;
`;

export const ShadowContainer = styled.div`
  & > div {
    box-shadow: 2px 4px 4px #000;
  }
`;

export const Main = styled.main`
  & h2 {
    margin: 0;
    font-weight: 700;
    font-size: 24px;
    letter-spacing: 1px;
  }

  & p {
    font-size: 16px;
  }
`;

const SectionContainer = css`
  display: flex;
  position: relative;
  min-height: 80vh;
  padding: 48px 120px;
  height: ${(props) => props.height};
  background: ${(props) => props.background || colorPallet.green.light};
  text-align: ${(props) => props.textAlign || defaultTextAlign};
`;

export const Section = styled.section`
  ${SectionContainer}
`;
export const Footer = styled.footer`
  ${SectionContainer}
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) =>
    props.transform === "center" ? defaultTransform : props.transform};
`;

export const FixedContainer = styled.div`
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  transform: ${(props) =>
    props.transform === "center" ? defaultTransform : props.transform};
`;

export const MenuLink = styled(Link)`
  color: #fff;
  padding: 16px 8px;
  text-decoration: none;
  transition: 500ms;
  font-size: 16px;

  &:hover {
    letter-spacing: 2px;
  }
`;

export const MenuHeading = styled.h4`
  font-size: 40px;
  color: #fff;
  padding-left: 8px;
`;

export const MenuBox = styled.div`
  background: url(https://raw.githubusercontent.com/barreto/stock-manager/2ca0775f17fd7962ffe42b6736b47ce73167e46c/backend/assets/box.svg);
  background-size: contain;
  height: 152px;
  width: 152px;
  margin-left: 24px;
  background-repeat: no-repeat;
  background-position: center;
`;
