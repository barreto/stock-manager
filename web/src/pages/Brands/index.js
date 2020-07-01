import React, { useRef } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
const Brands = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = () => {
    alert("Yeeeah!");
  };
  const inputIdField = useRef(null);
  const [disableIdField, setDisableIdField] = useState(true);

  const setFocusOnIdField = () => inputIdField.current.focus();

  const handleAdd = () => {
    alert("Uuh! Sorry, this action is still under development");
  };

  const handleSearch = () => {
    const safeDelay = 100;
    setDisableIdField(false);
    setTimeout(setFocusOnIdField, safeDelay);
  };

  const handleEdit = () => {
    handleAdd();
  };
  const handleDelete = () => {
    handleAdd();
  };

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
  ];

  return (
    <HeadingContainer heading="Marcas" maxWidth="500px">
      <form action="handleFormSubmit">
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="brand-id">
            Id {!disableIdField && "(caso for pesquisar pressione Enter)"}
          </label>
          <input
            ref={inputIdField}
            id="brand-id"
            type="number"
            min={0}
            disabled={disableIdField}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="brand-name">Nome</label>
          <input id="brand-name" type="text" />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="brand-description">Descrição</label>
          <textarea id="brand-description" type="text" />
        </FlexContainer>
      </form>

      <FlexContainer>
        {options.map(({ text, iconName, action }, key) => (
          <IconButton
            key={key}
            widht="24%"
            iconName={iconName}
            onClick={action}
          >
            <p>{text}</p>
          </IconButton>
        ))}
      </FlexContainer>

      <FlexContainer>
        <Link to={routesPath.StockManager}>
          <FlexContainer justifyContent="left">
            <FiArrowLeft size={16} color={colorPallet.blue.high} />
            <p style={{ marginRight: 8 }}>Voltar para Stock Manager</p>
          </FlexContainer>
        </Link>
      </FlexContainer>
    </HeadingContainer>
  );
};

export default Brands;
