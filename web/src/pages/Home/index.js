import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import { useContext } from "react";
import PagesContext from "../PagesContext";

const Home = () => {
  const [isLoading, setIsLoading] = useContext(PagesContext);
  return (
    <HeadingContainer heading="Home">
      <Link to={routesPath.StockManager}>
        Clique aqui para gerenciar o seu estoque
      </Link>
      <button onClick={() => setIsLoading(!isLoading)}>Change state</button>
    </HeadingContainer>
  );
};

export default Home;
