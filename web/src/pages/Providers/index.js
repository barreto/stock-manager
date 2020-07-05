import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
import { formatCNPJ, formatNumeric } from "../../helpers/formatter";
import IBGEApi from "../../services/IBGEApi";
import longMaxValue from "../../constants/longMaxValue";
import ProvidersService from "../../services/ProvidersService";
import ExtraIdInfo from "../../components/ExtraIdInfo";
import { notAllDataErrorMessage } from "../../constants/notAllDataErrorMessage";

const Providers = () => {
  const maskCNPJ = "00.000.000/0000-00";

  const inputIdField = useRef(null);
  const inputNameField = useRef(null);
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

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
    { text: "Limpar", iconName: "FiDelete", action: handleClear },
  ];

  const setFocusOnIdField = () => inputIdField.current.focus();
  const setFocusOnNameField = () => inputNameField.current.focus();

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

  const handleId = (event) => {
    const value = event.target.value;
    const formatedValue = formatNumeric(value);
    setId(formatedValue);
  };

  const handleName = (event) => setName(event.target.value);

  const handleUF = (event) => setSelectedUF(event.target.value);

  const handleCity = (event) => setSelectedCity(event.target.value);

  const handleNeighbourhood = (event) => setNeighbourhood(event.target.value);

  const handleAddress = (event) => setAddress(event.target.value);

  function getFormData() {
    return {
      name,
      cnpj: CNPj,
      address: `${selectedCity}(${selectedUF}), bairro ${neighbourhood} - ${address}`.toLowerCase(),
    };
  }

  function setFormData(provider) {
    setName(provider.name);
    setCPNJ(provider.cnpj);
    setSelectedUF(provider.uf || "");
    setSelectedCity(provider.city || "");
    setNeighbourhood(provider.neighbourhood || "");
    setAddress(provider.address || "");
  }

  async function handleAdd() {
    const newProvider = getFormData();
    if (!checkIfIsValidProvider(newProvider)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await ProvidersService.newProvider(newProvider);
      alert("Fornecedor cadastrado com sucesso!");
      handleClear();
    } catch (error) {
      alert("Erro ao cadastrar fornecedor. Tente novamente mais tarde!");
      console.log("Error!", error);
    }
  }

  function handleSearch() {
    const safeDelay = 100;
    handleClear();
    setDisableIdField(false);
    setTimeout(setFocusOnIdField, safeDelay);
  }

  async function handleEdit() {
    const newProvider = getFormData();
    if (!checkIfIsValidProvider(newProvider)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await ProvidersService.updatePovider(id, newProvider);
      alert("Fornecedor atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar fornecedor. Tente novamente mais tarde!");
      console.log("Error!", error);
    }
  }
  async function handleDelete() {
    const newProvider = getFormData();
    if (!checkIfIsValidProvider(newProvider)) {
      alert(
        "Antes de remover um fornecedor pesquise-o e verifique se realmente deseja o excluir."
      );
      return;
    }
    const deleteConfirmation = window.confirm(
      `Você realmente deseja deletar os dados referentes ao fornecedor: ${name}`
    );

    if (deleteConfirmation) {
      try {
        await ProvidersService.deleteProvider(id);
        alert("Fornecedor removido com sucesso!");
        handleClear();
      } catch (error) {
        alert("Erro ao remover fornecedor. Tente novamente mais tarde!");
        console.log("Error!", error);
      }
    }
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
    setFocusOnNameField();
  }

  const handleCNPJ = (event) => {
    const value = event.target.value;
    const formatedValue = formatCNPJ(value);
    setCPNJ(formatedValue);
  };

  const checkIfIsValidProvider = (provider) => {
    return (
      !!provider && !!provider.name && !!provider.cnpj && !!provider.address
    );
  };

  function separateAddressInfo(address) {
    //  exemple:  "são matheus(mg), bairro urbano - rua das xpto";
    return {
      uf: address.substr(address.indexOf("(") + 1, 2),
      city: address.substr(0, address.indexOf("(")),
      neighbourhood: address
        .substring(address.indexOf("bairro") + 6, address.indexOf("-") - 1)
        .trim(),
      address: address
        .substring(address.indexOf("-") + 1, address.length)
        .trim(),
    };
  }

  const createMappedProvider = (providerResponse) => {
    const { uf, city, neighbourhood, address } = separateAddressInfo(
      providerResponse.address
    );

    const mappedProvider = {
      name: providerResponse.name,
      cnpj: providerResponse.cnpj,
      uf,
      city,
      neighbourhood,
      address,
    };

    return mappedProvider;
  };

  async function findProvider(id) {
    const response = await ProvidersService.getProvider(id);
    const isValidProvider = checkIfIsValidProvider(response);
    if (!isValidProvider) {
      alert("Esse fornecedor não foi encontrado.");
      handleClear();
      return;
    }

    const mappedProvider = createMappedProvider(response);
    setFormData(mappedProvider);
  }

  const handleIdKeyUp = (event) => {
    const key = event.key;
    const listenedKey = "Enter";
    if (key === listenedKey) {
      findProvider(id);
      setDisableIdField(true);
      setFocusOnNameField();
    }
  };

  const handleIdOnBlur = () => {
    setDisableIdField(true);
  };

  return (
    <HeadingContainer heading="Fornecedores" maxWidth="700px">
      <form>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="provider-id">
            <ExtraIdInfo isDisabled={disableIdField} />
          </label>
          <input
            ref={inputIdField}
            id="provider-id"
            type="number"
            min={1}
            max={longMaxValue}
            onKeyUp={handleIdKeyUp}
            value={id}
            onBlur={handleIdOnBlur}
            onChange={handleId}
            disabled={disableIdField}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="provider-name">Nome</label>
          <input
            id="provider-name"
            ref={inputNameField}
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
            <select
              id="provider-city"
              value={selectedCity}
              onChange={handleCity}
            >
              <option value="-1">Selecione</option>
              {availableCites.length &&
                availableCites.map((city, key) => (
                  <option key={key} value={city.toLowerCase()}>
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
            <label htmlFor="provider-address">
              Logradouro (Ex: avenida, rua, travessa...)
            </label>
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
            width="19%"
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
