import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";

const Home = () => {
  return (
    <HeadingContainer heading="Home">
      <Link to={routesPath.StockManager}>
        Clique aqui para gerenciar o seu estoque
      </Link>
    </HeadingContainer>
  );
};

export default Home;
