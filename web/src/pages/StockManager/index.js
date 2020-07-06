import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import colorPallet from "../../constants/colorPallet";
import HeadingContainer from "../../components/HeadingContainer";
import Button from "../../components/Button";
import FlexContainer from "../../components/FlexContainer";
import { repositoryURL } from "../../constants/repositoryURL";
import { useEffect } from "react";
import StockService from "../../services/StockService";
import { formatMoneyToBRL } from "../../helpers/formatter";
import { FiEdit, FiArrowLeft, FiGithub } from "react-icons/fi";
import * as feather from "react-icons/fi";
import "./style.css";

const StockManager = () => {
  const unselected = -1;
  const defaultButtonsConfig = { size: 48, color: colorPallet.blue.high };

  const history = useHistory();

  const [selectedProductId, setSelectedProductId] = useState(unselected);
  const [stockedProducts, setStockedProducts] = useState([]);

  const handledoubleClick = () =>
    redirecToProductsSectionWithPredefinedProductId();

  const redirecToProductsSectionWithPredefinedProductId = () => {
    history.push(routesPath.Products, { productId: selectedProductId });
  };

  const stockManagerOptions = [
    { text: "Produtos", iconName: "FiPackage", path: routesPath.Products },
    { text: "Marcas", iconName: "FiTag", path: routesPath.Brands },
    { text: "Categorias", iconName: "FiBookmark", path: routesPath.Categories },
    { text: "Fornecedores", iconName: "FiTruck", path: routesPath.Providers },
  ];

  function getRowClass(id) {
    return selectedProductId === id ? "active" : "";
  }

  function getLabelButton(text, iconName, path, key, direction = "column") {
    return (
      <Link to={path} key={key}>
        <Button>
          <FlexContainer
            border="none"
            minWidth="100%"
            backgroundColor="transparent"
            direction={direction}
          >
            {feather[iconName](defaultButtonsConfig)}
            <p>{text}</p>
          </FlexContainer>
        </Button>
      </Link>
    );
  }

  const getStockedProducts = async () => {
    try {
      setStockedProducts(await StockService.getStock());
    } catch (error) {
      console.log("Error at getStockedProducts: ", error);
    }
  };

  function getStockRows() {
    if (!stockedProducts.length) return null;

    return stockedProducts.map(({ id, product, amount }) => {
      const { name, category, brand, provider, price } = product;

      return (
        <tr
          key={id}
          onClick={() => setSelectedProductId(id)}
          onDoubleClick={handledoubleClick}
          className={getRowClass(id)}
        >
          <td>{name}</td>
          <td>{formatMoneyToBRL(price)}</td>
          <td>{brand.name}</td>
          <td>{category.name}</td>
          <td>{provider.name}</td>
          <td>{amount}</td>
        </tr>
      );
    });
  }

  useEffect(() => {
    getStockedProducts();
  }, []);

  return (
    <HeadingContainer heading="Stock Manager" centerHeading>
      <h3>Escolha o que deseja gerenciar</h3>
      <FlexContainer>
        {stockManagerOptions.map(({ text, iconName, path }, key) =>
          getLabelButton(text, iconName, path, key)
        )}
      </FlexContainer>

      <div className="custom-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Fornecedor</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>{getStockRows()}</tbody>
        </table>
      </div>

      <FlexContainer justifyContent="space-between">
        <FlexContainer maxWidth="auto" minWidth="auto">
          <Link to={routesPath.Home}>
            <FlexContainer
              justifyContent="left"
              maxWidth="auto"
              minWidth="auto"
            >
              <FiArrowLeft size={16} color={colorPallet.blue.high} />
              <p style={{ marginRight: 8 }}>Voltar para home</p>
            </FlexContainer>
          </Link>
        </FlexContainer>
        <FlexContainer justifyContent="center" flexGrow={10}>
          <Button
            height="48px"
            width="50%"
            padding="none"
            onClick={redirecToProductsSectionWithPredefinedProductId}
          >
            <FlexContainer justifyContent="center" flexGrow={10}>
              <p style={{ marginRight: 8 }}>Gerenciar produto selecionado</p>
              <FiEdit size={16} color={colorPallet.blue.high} />
            </FlexContainer>
          </Button>
        </FlexContainer>
        <FlexContainer maxWidth="auto" minWidth="auto">
          <a href={repositoryURL} target="_blank" rel="noopener noreferrer">
            <FlexContainer
              justifyContent="left"
              maxWidth="auto"
              minWidth="auto"
            >
              <p style={{ marginRight: 8 }}>Ver repositório fonte</p>
              <FiGithub size={16} color={colorPallet.blue.high} />
            </FlexContainer>
          </a>
        </FlexContainer>
      </FlexContainer>
    </HeadingContainer>
  );
};

export default StockManager;
