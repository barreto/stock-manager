import React, { useState, useContext, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import colorPallet from "../../constants/colorPallet";
import HeadingContainer from "../../components/HeadingContainer";
import StyledButton from "../../components/StyledButton";
import FlexContainer from "../../components/FlexContainer";
import { repositoryURL } from "../../constants/repositoryURL";
import { useEffect } from "react";
import StockService from "../../services/StockService";
import { formatMoneyToBRL } from "../../helpers/formatter";
import { FiEdit, FiArrowLeft, FiGithub, FiLock } from "react-icons/fi";
import * as feather from "react-icons/fi";
import "./style.css";
import PagesContext, { setIsLoadingIndex } from "../PagesContext";

const StockManager = () => {
  const unselected = -1;
  const defaultBigButtonsConfig = { size: 48, color: colorPallet.blue.high };
  const defaultSmallButtonsConfig = { size: 24, color: colorPallet.blue.high };

  const history = useHistory();
  const setIsLoading = useContext(PagesContext)[setIsLoadingIndex];

  const [isLocked, setIsLocked] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(unselected);
  const [stockedProducts, setStockedProducts] = useState([]);

  const handledoubleClick = () =>
    redirecToProductsSectionWithPredefinedProductId();

  const redirecToProductsSectionWithPredefinedProductId = () => {
    history.push(routesPath.Products, { productId: selectedProductId });
  };

  const stockManagerOptions = [
    {
      text: "Produtos",
      iconName: "FiPackage",
      path: routesPath.Products,
    },
    {
      text: "Marcas",
      iconName: "FiTag",
      path: routesPath.Brands,
    },
    {
      text: "Categorias",
      iconName: "FiBookmark",
      path: routesPath.Categories,
    },
    {
      text: "Fornecedores",
      iconName: "FiTruck",
      path: routesPath.Providers,
    },
  ];

  function getRowClass(id) {
    return selectedProductId === id ? "active" : "";
  }

  function getLabelButton(text, iconName, path, key, direction = "column") {
    const validatedIconName = isLocked ? "FiLock" : iconName;

    const customizedButton = (
      <StyledButton disabled={isLocked} key={key}>
        <FlexContainer
          border="none"
          minWidth="100%"
          backgroundColor="transparent"
          direction={direction}
        >
          {feather[validatedIconName](defaultBigButtonsConfig)}
          <p>{text}</p>
        </FlexContainer>
      </StyledButton>
    );

    return isLocked ? (
      customizedButton
    ) : (
      <Link to={path} key={key}>
        {customizedButton}
      </Link>
    );
  }

  const getStockedProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await StockService.getStock();
      if (response && response.length) {
        setStockedProducts(response);
      } else {
        setIsLocked(true);
      }
    } catch (error) {
      console.log("Error at getStockedProducts: ", error);
    }
    setIsLoading(false);
  }, [setIsLoading]);

  function getStockTBody() {
    if (isLocked || !stockedProducts.length) return null;

    const tableRows = stockedProducts.map(({ id, product, amount }) => {
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

    return <tbody>{tableRows}</tbody>;
  }

  function getLockedIconOr(enabledIcon, size = 32) {
    const iconProps = { color: "#333", size };
    if (isLocked) return <FiLock {...iconProps} />;
    return enabledIcon;
  }

  useEffect(() => {
    getStockedProducts();
  }, [getStockedProducts]);

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
          {getStockTBody()}
        </table>
        {isLocked && (
          <div className="no-data-tbody">
            Não há dados para serem apresentados ou houve alguma falha na
            comunicação com o banco de dados.
          </div>
        )}
      </div>

      <FlexContainer justifyContent="space-between">
        <FlexContainer maxWidth="auto" minWidth="auto">
          <Link to={routesPath.Home}>
            <FlexContainer
              justifyContent="left"
              maxWidth="auto"
              minWidth="auto"
            >
              <FiArrowLeft {...defaultSmallButtonsConfig} />
              <p style={{ marginRight: 8 }}>Voltar para home</p>
            </FlexContainer>
          </Link>
        </FlexContainer>
        <FlexContainer justifyContent="center" flexGrow={10}>
          <StyledButton
            height="48px"
            width="50%"
            padding="none"
            disabled={isLocked}
            onClick={redirecToProductsSectionWithPredefinedProductId}
          >
            <FlexContainer justifyContent="center" flexGrow={10}>
              <p style={{ marginRight: 8 }}>Gerenciar produto selecionado</p>
              {getLockedIconOr(<FiEdit size={16} />, 16)}
            </FlexContainer>
          </StyledButton>
        </FlexContainer>
        <FlexContainer maxWidth="auto" minWidth="auto">
          <a href={repositoryURL} target="_blank" rel="noopener noreferrer">
            <FlexContainer
              justifyContent="left"
              maxWidth="auto"
              minWidth="auto"
            >
              <p style={{ marginRight: 8 }}>Ver repositório fonte</p>
              <FiGithub {...defaultSmallButtonsConfig} />
            </FlexContainer>
          </a>
        </FlexContainer>
      </FlexContainer>
    </HeadingContainer>
  );
};

export default StockManager;
