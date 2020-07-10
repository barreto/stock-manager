import React, { useRef } from "react";
import Menu from "../../components/Menu";
import colorPallet from "../../constants/colorPallet";
import FlexContainer from "../../components/FlexContainer";
import HeadingContainer from "../../components/HeadingContainer";
import MainHeading, {
  Header,
  MenuLink,
  MenuHeading,
  HeaderContent,
  ShadowContainer,
  MenuBox,
  Main,
  Section,
  Footer,
  AbsoluteContainer,
} from "./style";
import { FiGithub } from "react-icons/fi";
import StyledButton from "../../components/StyledButton";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import { useState } from "react";

const Home = () => {
  const simpleAndEasySection = useRef(null);
  const practicalitySection = useRef(null);
  const bestOfAllSection = useRef(null);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleSimpleAndEasyOnClick = () =>
    smoothlyScrollAndCloseMenu(simpleAndEasySection.current);

  const handlePracticalityOnClick = () =>
    smoothlyScrollAndCloseMenu(practicalitySection.current);

  const handleBestOfAllOnClick = () =>
    smoothlyScrollAndCloseMenu(bestOfAllSection.current);

  function smoothlyScrollAndCloseMenu(element) {
    const safeDeltaScroll = 50;
    if (isOpenMenu) setIsOpenMenu(false);
    window.scrollTo({
      behavior: "smooth",
      top: element.offsetTop - safeDeltaScroll,
    });
  }

  const smoothlyScrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleOnOpenMenu = () => {
    smoothlyScrollToTop();
    setIsOpenMenu(true);
  };
  const handleOnCloseMenu = () => setIsOpenMenu(false);

  return (
    <div id="outer-container" style={{ background: "#333" }}>
      <Menu
        isOpen={isOpenMenu}
        onOpen={handleOnOpenMenu}
        onClose={handleOnCloseMenu}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      >
        <FlexContainer
          direction="column"
          minWidth="auto"
          justifyContent="center"
        >
          <FlexContainer>
            <MenuBox />
            <MenuHeading>Stock Manager</MenuHeading>
          </FlexContainer>
          <MenuLink to="/" onClick={handleOnCloseMenu}>
            Home
          </MenuLink>
          <MenuLink to="/" onClick={handleSimpleAndEasyOnClick}>
            Simples e Fácil
          </MenuLink>
          <MenuLink to="/" onClick={handlePracticalityOnClick}>
            Prático
          </MenuLink>
          <MenuLink to="/" onClick={handleBestOfAllOnClick}>
            Customizável
          </MenuLink>
        </FlexContainer>
      </Menu>
      <div id="page-wrap">
        <Header id="home">
          <HeaderContent>
            <MainHeading>Stock Manager</MainHeading>
            <p>Gerencie estoques de forma otimizada.</p>
            <FlexContainer flexGrow={1}>
              <FlexContainer flexGrow={1}>
                <StyledButton
                  height="48px"
                  width="90%"
                  padding="none"
                  onClick={handleSimpleAndEasyOnClick}
                >
                  <strong style={{ fontSize: 16 }}>Ver mais</strong>
                </StyledButton>
              </FlexContainer>
              <FlexContainer flexGrow={2}>
                <Link to={routesPath.StockManager} style={{ width: "100%" }}>
                  <StyledButton height="48px" width="100%" padding="none">
                    <strong style={{ fontSize: 16 }}>Entrar</strong>
                  </StyledButton>
                </Link>
              </FlexContainer>
            </FlexContainer>
          </HeaderContent>
        </Header>
        <Main>
          <Section id="simples-e-facil" ref={simpleAndEasySection}>
            <FlexContainer flexGrow={1} margin="auto 0" alignItems="center">
              <FlexContainer
                direction="column"
                alignItems="left"
                margin="0 80px 0 0"
                maxWidth="45vw"
              >
                <h3>Simples e Fácil</h3>
                <h2>
                  O Stock Manager é uma solução simples para negócios enxutos.
                </h2>
                <p>
                  Todas as telas seguem um padrão muito semelhante, o que
                  facilita a assimilação de uso de qualquer uma delas.
                </p>
              </FlexContainer>
              <FlexContainer flexGrow={1} justifyContent="center">
                <ShadowContainer>
                  <HeadingContainer
                    heading="Simples"
                    headingLevel={3}
                    minWidth="auto"
                    margin="0"
                    centerHeading
                  >
                    <FlexContainer direction="column" minWidth="auto">
                      <h3>Fácil de assimilar!</h3>
                      <StyledButton
                        height="48px"
                        width="100%"
                        padding="none"
                        onClick={handlePracticalityOnClick}
                      >
                        Mas qual é a praticidade?
                      </StyledButton>
                    </FlexContainer>
                  </HeadingContainer>
                </ShadowContainer>
              </FlexContainer>
            </FlexContainer>
          </Section>
          <Section
            id="pratico"
            ref={practicalitySection}
            background={colorPallet.green.high}
          >
            <FlexContainer flexGrow={1} alignItems="center" margin="auto 0">
              <FlexContainer flexGrow={1} justifyContent="center">
                <ShadowContainer>
                  <HeadingContainer
                    heading="Prático"
                    minWidth="auto"
                    margin="0"
                    headingLevel={3}
                    centerHeading
                  >
                    <FlexContainer direction="column" minWidth="auto">
                      <h3>Otimize o seu tempo!</h3>
                      <StyledButton
                        height="48px"
                        width="100%"
                        padding="none"
                        onClick={handleBestOfAllOnClick}
                      >
                        E o sabe qual é <br />o melhor de tudo?
                      </StyledButton>
                    </FlexContainer>
                  </HeadingContainer>
                </ShadowContainer>
              </FlexContainer>
              <FlexContainer
                direction="column"
                alignItems="left"
                margin="0 0 0 80px"
                maxWidth="45vw"
              >
                <h3>Prático</h3>
                <h2>
                  Cansado de fluxos alternativos que te obrigam a pesquisar tudo
                  em cada tela que entra?
                </h2>
                <p>
                  Com o Stock Manager não há esse problema, em poucos cliques
                  você já está apto a criar, editar e pesquisar pelo que está
                  buscando.
                </p>
              </FlexContainer>
            </FlexContainer>
          </Section>
          <Footer
            id="customizavel"
            height="90vh"
            background="#24292e"
            textAlign="center"
            ref={bestOfAllSection}
          >
            {/* Isso mesmo, free code! */}
            <FlexContainer
              direction="column"
              margin="auto 0"
              padding="0 0 10%"
              flexGrow={1}
            >
              <FlexContainer direction="column" maxWidth="50%" color="#fafbfc">
                <h3>Customizável</h3>
                <h2>
                  <i>free code is real</i>
                </h2>
                <p>
                  O projeto é open source, por isso, caso queira mudar alguma
                  coisa para que o projeto se adeque melhor ao seu negócio basta
                  ir para o repositório e customizar como quiser.
                </p>
                <a
                  target="_blank "
                  href="https://github.com/barreto/stock-manager"
                >
                  <StyledButton href>
                    <FiGithub size={56} />
                  </StyledButton>
                </a>
              </FlexContainer>
            </FlexContainer>
            <AbsoluteContainer
              bottom="-48px"
              left="50%"
              transform="translateX(-50%)"
            >
              <img
                alt="factory"
                width={256}
                src="https://raw.githubusercontent.com/barreto/stock-manager/2ca0775f17fd7962ffe42b6736b47ce73167e46c/backend/assets/factory.svg"
              />
            </AbsoluteContainer>
            <AbsoluteContainer bottom="-2px" left="-32px">
              <img
                alt="boxes"
                width={160}
                src="https://raw.githubusercontent.com/barreto/stock-manager/2ca0775f17fd7962ffe42b6736b47ce73167e46c/backend/assets/boxes.svg"
              />
            </AbsoluteContainer>
            <AbsoluteContainer bottom="-16px" right="-64px">
              <img
                alt="pallet"
                width={160}
                src="https://raw.githubusercontent.com/barreto/stock-manager/2ca0775f17fd7962ffe42b6736b47ce73167e46c/backend/assets/pallet.svg"
              />
            </AbsoluteContainer>
          </Footer>
        </Main>
      </div>
    </div>
  );
};
export default Home;
