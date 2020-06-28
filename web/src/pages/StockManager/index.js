import React, { useState } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import colorPallet from "../../constants/colorPallet";
import HeadingContainer from "../../components/HeadingContainer";
import Button from "../../components/Button";
import FlexContainer from "../../components/FlexContainer";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import * as feather from "react-icons/fi";

import "./style.css";

const StockManager = () => {
  const unselected = -1;
  const defaultButtonsConfig = { size: 48, color: colorPallet.blue.high };
  const stockManagerOptions = [
    { text: "Produtos", iconName: "FiPackage" },
    { text: "Marcas", iconName: "FiTag" },
    { text: "Categorias", iconName: "FiBookmark" },
    { text: "Fornecedores", iconName: "FiTruck" },
  ];
  const [selectedRowIndex, setSelectedRowIndex] = useState(unselected);

  function getRowClass(key) {
    return selectedRowIndex === key ? "active" : "";
  }

  function getLabelButton(text, iconName, direction = "column") {
    return (
      <Button>
        <FlexContainer
          border="none"
          minWidht="100%"
          backgroundColor="transparent"
          direction={direction}
        >
          {feather[iconName](defaultButtonsConfig)}
          <p>{text}</p>
        </FlexContainer>
      </Button>
    );
  }

  return (
    <HeadingContainer heading="Stock Manager" centerHeading>
      <h3>Escolha o que deseja gerenciar</h3>
      <FlexContainer>
        {stockManagerOptions.map(({ text, iconName }) =>
          getLabelButton(text, iconName)
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
          <tbody>
            {[1, 2, 3, 4, 5].map((key) => (
              <tr
                key={key}
                onClick={() => setSelectedRowIndex(key)}
                className={getRowClass(key)}
              >
                <td>{key} Nome</td>
                <td>R${key}00,00</td>
                <td>Marca {key}</td>
                <td>Categoria {key}</td>
                <td>{key} Fornecedor</td>
                <td>{key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FlexContainer justifyContent="center">
        <Button height="48px" widht="50%" padding="none">
          <FlexContainer justifyContent="center">
            <p style={{ marginRight: 8 }}>Gerenciar produto selecionado</p>
            <FiEdit size={16} color={colorPallet.blue.high} />
          </FlexContainer>
        </Button>
      </FlexContainer>

      <FlexContainer>
        <Link to={routesPath.Home}>
          <FlexContainer justifyContent="left">
            <FiArrowLeft size={16} color={colorPallet.blue.high} />
            <p style={{ marginRight: 8 }}>Voltar para home</p>
          </FlexContainer>
        </Link>
      </FlexContainer>
    </HeadingContainer>
  );
};

export default StockManager;
