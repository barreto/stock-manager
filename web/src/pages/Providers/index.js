import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
import { formatCNPJ } from "../../helpers/formatter";
import IBGEApi from "../../services/IBGEApi";
import longMaxValue from "../../constants/longMaxValue";

const Providers = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = () => {
    alert("Yeeeah!");
  };
  const inputIdField = useRef(null);
  const inputCNPJ = useRef(null);
  const [disableIdField, setDisableIdField] = useState(true);

  const [availableUFs, setAvailableUFs] = useState([]);
  const [availableCites, setAvailableCities] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [CNPj, setCPNJ] = useState("");
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [address, setAddress] = useState("");

  const maskCNPJ = "00.000.000/0000-00";

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
    { text: "Limpar", iconName: "FiDelete", action: handleClear },
  ];

  const setFocusOnIdField = () => inputIdField.current.focus();

  const getAvailableUFs = async () => {
    setAvailableUFs(await IBGEApi.getUFs());
  };

  const getAvailableCities = async (uf) => {
    setAvailableCities(await IBGEApi.getCities(uf));
  };

  useEffect(() => {
    getAvailableUFs();
  }, []);

  useEffect(() => {
    if (!!selectedUF) {
      getAvailableCities(selectedUF);
    }
  }, [selectedUF]);

  const handleId = (event) => setId(event.target.value);

  const handleName = (event) => setName(event.target.value);

  const handleUF = (event) => setSelectedUF(event.target.value);

  const handleCity = (event) => setSelectedCity(event.target.value);

  const handleNeighbourhood = (event) => setNeighbourhood(event.target.value);

  const handleAddress = (event) => setAddress(event.target.value);

  function handleAdd() {
    alert("Uuh! Sorry, this action is still under development");
  }

  function handleSearch() {
    const safeDelay = 100;
    setDisableIdField(false);
    setTimeout(setFocusOnIdField, safeDelay);
  }

  function handleEdit() {
    handleAdd();
  }
  function handleDelete() {
    handleAdd();
  }

  function handleClear() {
    setId("");
    setDisableIdField(true);
    setName("");
    setCPNJ("");
    setSelectedUF("");
    setAvailableCities([]);
    setNeighbourhood("");
    setAddress("");
  }

  const handleCNPJ = (event) => {
    const value = event.target.value;
    const formatedValue = formatCNPJ(value);
    setCPNJ(formatedValue);
  };

  const handleIdKeyUp = (event) => {
    const key = event.key;
    const listenedKey = "Enter";
    if (key === listenedKey) {
      alert("Uuh! Sorry but search action is stil under develoment.");
    }
  };

  return (
    <HeadingContainer heading="Categorias" maxWidth="700px">
      <form action="handleFormSubmit">
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="provider-id">
            Id{" "}
            {!disableIdField && (
              <i>
                (Para pesquisar pressione <b>Enter</b>)
              </i>
            )}
          </label>
          <input
            ref={inputIdField}
            id="provider-id"
            type="number"
            min={0}
            max={longMaxValue}
            onKeyUp={handleIdKeyUp}
            value={id}
            onChange={handleId}
            disabled={disableIdField}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="provider-name">Nome</label>
          <input
            id="provider-name"
            type="text"
            maxLength={100}
            value={name}
            onChange={handleName}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="provider-cnpj">CNPJ</label>
          <input
            id="provider-cnpj"
            type="text"
            ref={inputCNPJ}
            value={CNPj}
            onChange={handleCNPJ}
            maxLength={maskCNPJ.length}
            placeholder={maskCNPJ}
          />
        </FlexContainer>

        <FlexContainer>
          <FlexContainer
            direction="column"
            alignItems="left"
            minWidht="auto"
            maxWidht="128px"
            padding="0 16px 0 0"
          >
            <label htmlFor="provider-uf">UF</label>
            <select id="provider-uf" value={selectedUF} onChange={handleUF}>
              <option value="-1">Selecione</option>
              {availableUFs.length &&
                availableUFs.map((uf, key) => (
                  <option key={key} value={uf.toLocaleLowerCase()}>
                    {uf}
                  </option>
                ))}
            </select>
          </FlexContainer>
          <FlexContainer
            direction="column"
            alignItems="left"
            minWidht="auto"
            maxWidht="auto"
            flexGrow={1}
          >
            <label htmlFor="provider-city">Cidade</label>
            <select id="provider-city" onChange={handleCity}>
              <option value="-1">Selecione</option>
              {availableCites.length &&
                availableCites.map((city, key) => (
                  <option
                    key={key}
                    value={city.replace(" ", "-").toLocaleLowerCase()}
                  >
                    {city}
                  </option>
                ))}
            </select>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer>
          <FlexContainer
            direction="column"
            alignItems="left"
            flexGrow={1}
            padding="0 16px 0 0"
          >
            <label htmlFor="provider-neighbourhood">Bairro</label>
            <input
              id="provider-neighbourhood"
              type="text"
              maxLength="100"
              value={neighbourhood}
              onChange={handleNeighbourhood}
            />
          </FlexContainer>
          <FlexContainer direction="column" alignItems="left" flexGrow={10}>
            <label htmlFor="provider-address">Cidade</label>
            <input
              id="provider-address"
              type="text"
              maxLength="200"
              value={address}
              onChange={handleAddress}
            />
          </FlexContainer>
        </FlexContainer>
      </form>

      <FlexContainer>
        {options.map(({ text, iconName, action }, key) => (
          <IconButton
            key={key}
            widht="19%"
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

export default Providers;
