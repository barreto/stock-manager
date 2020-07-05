import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
import longMaxValue from "../../constants/longMaxValue";
import BrandsService from "../../services/BrandsService";
import CategoriesService from "../../services/CategoriesService";
import ProvidersService from "../../services/ProvidersService";
import ProductsService from "../../services/ProductsService";
import { notAllDataErrorMessage } from "../../constants/notAllDataErrorMessage";
import ExtraIdInfo from "../../components/ExtraIdInfo";
import { notValidIdMessage } from "../../constants/notValidIdMessage";

const Products = () => {
  const minPriceValue = "0,00";
  const unselected = -1;
  const inputIdField = useRef(null);
  const inputNameField = useRef(null);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(minPriceValue);
  const [amount, setAmount] = useState(0);

  const [disableIdField, setDisableIdField] = useState(true);
  const [disableAmountField, setDisableAmountField] = useState(false);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableProviders, setAvailableProviders] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(unselected);
  const [selectedCategoryId, setSelectedCategoryId] = useState(unselected);
  const [selectedProviderId, setSelectedProviderId] = useState(unselected);

  const handleId = (event) => setId(event.target.value);
  const handleName = (event) => setName(event.target.value);
  const handleAmount = (event) => setAmount(event.target.value);
  const handlePrice = (event) => {};
  const handlePriceKeyDown = (event) => {
    const numericKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const allowedKeys = [...numericKeys, "Backspace"];
    const pressedKey = event.key;
    const safeDiff = 1000;
    const alreadyOnMaxLength =
      Number(removeComma(price) - safeDiff) >= longMaxValue;

    if (allowedKeys.includes(pressedKey)) {
      if (!alreadyOnMaxLength && numericKeys.includes(pressedKey)) {
        setNumberAtEndOfPrice(pressedKey);
        return;
      }
      removeLastPriceCharacter();
    }
  };

  const handleDescription = (event) => setDescription(event.target.value);
  const handleBrand = (event) => setSelectedBrandId(event.target.value);
  const handleCategory = (event) => setSelectedCategoryId(event.target.value);
  const handleProvider = (event) => setSelectedProviderId(event.target.value);

  const setFocusOnIdField = () => inputIdField.current.focus();
  const setFocusOnNameField = () => inputNameField.current.focus();

  function setCommaAtRightDecimalPlace(value) {
    const lastCharacterIndex = value.length - 2;
    return (
      value.substr(0, lastCharacterIndex) +
      "," +
      value.substr(lastCharacterIndex, 2)
    );
  }

  function removeFirstCharacterIfIsZero(value) {
    if (value[0] === "0") {
      return value.substr(1, value.length - 1);
    }
    return value;
  }

  function setNumberAtEndOfPrice(pressedKey) {
    const newPrice = removeComma(price) + pressedKey;
    const newPriceWithDecimalPlaces = setCommaAtRightDecimalPlace(newPrice);
    const nonInitialZeroNewPrice = removeFirstCharacterIfIsZero(
      newPriceWithDecimalPlaces
    );
    setPrice(nonInitialZeroNewPrice);
  }

  function removeComma(value) {
    return value.replace(",", "");
  }

  function removeLastPriceCharacter() {
    const lastCharacterIndex = price.length - 2;
    const newPrice = removeComma(price).substr(0, lastCharacterIndex);
    let rightPrice = newPrice;
    if (newPrice.length < minPriceValue.length) {
      rightPrice = "0" + newPrice;
    }
    const newPriceWithDecimalPlaces = setCommaAtRightDecimalPlace(rightPrice);
    setPrice(newPriceWithDecimalPlaces);
  }

  function getFormData() {
    return {
      id,
      name,
      description,
      price: price.replace(",", "."),
      amount,
      brandId: selectedBrandId,
      categoryId: selectedCategoryId,
      providerId: selectedProviderId,
    };
  }
  const setFormData = (product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(parseFloat(product.price).toFixed(2).toString().replace(".", ","));
    setSelectedBrandId(product.brandId);
    setSelectedCategoryId(product.categoryId);
    setSelectedProviderId(product.providerId);
  };

  async function handleAdd() {
    const newProduct = getFormData();
    if (!checkIfIsValidProduct(newProduct)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await ProductsService.newProduct(newProduct);
      alert("Produto cadastrada com sucesso!");
      handleClear();
    } catch (error) {
      alert("Erro ao cadastrar produto. Tente novamente mais tarde!");
      console.log("Error!", error);
    }
  }

  function handleSearch() {
    const safeDelay = 100;
    handleClear();
    setDisableIdField(false);
    setDisableAmountField(true);
    setTimeout(setFocusOnIdField, safeDelay);
  }

  async function handleEdit() {
    const productToEdit = getFormData();
    if (!checkIfIsValidProduct(productToEdit)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await ProductsService.updateProduct(id, productToEdit);
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar produto. Tente novamente mais tarde!");
      console.log("Error!", error);
    }
  }
  async function handleDelete() {
    const productToDelete = getFormData();
    if (!checkIfIsValidProduct(productToDelete)) {
      alert(
        "Antes de remover um produto pesquise-o e verifique se realmente deseja o excluir."
      );
      return;
    }
    const deleteConfirmation = window.confirm(
      `Você realmente deseja deletar os dados referentes ao produto: ${name}`
    );

    if (deleteConfirmation) {
      try {
        await ProductsService.deleteProduct(id);
        alert("Produto removido com sucesso!");
        handleClear();
      } catch (error) {
        alert("Erro ao remover produto. Tente novamente mais tarde!");
        console.log("Error!", error);
      }
    }
  }

  function handleClear() {
    setId("");
    setDisableIdField(true);
    setDisableAmountField(false);
    setName("");
    setAmount(0);
    setPrice(minPriceValue);
    setDescription("");
    setSelectedBrandId(unselected);
    setSelectedCategoryId(unselected);
    setSelectedProviderId(unselected);
    setFocusOnNameField();
  }

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
    { text: "Limpar", iconName: "FiDelete", action: handleClear },
  ];

  const checkIfIsValidProduct = (product) => {
    return (
      !!product &&
      !!product.name &&
      !!product.description &&
      product.price > 0 &&
      product.brandId !== unselected &&
      product.categoryId !== unselected &&
      product.providerId !== unselected
    );
  };

  async function findProduct(id) {
    const isValidId = Boolean(id) === true && id > 0;
    if (!isValidId) {
      alert(notValidIdMessage);
      handleClear();
      return;
    }

    const response = await ProductsService.getProduct(id);
    const isValidProduct = checkIfIsValidProduct(response);
    if (!isValidProduct) {
      alert("Esse produto não foi encontrada.");
      handleClear();
      return;
    }

    setFormData(response);
  }

  const handleIdKeyUp = (event) => {
    const key = event.key;
    const listenedKey = "Enter";
    if (key === listenedKey) {
      findProduct(id);
      setDisableIdField(true);
      setFocusOnNameField();
    }
  };

  const handleIdOnBlur = () => {
    setDisableIdField(true);
  };

  const getAvailableCategories = async () => {
    try {
      setAvailableCategories(await CategoriesService.getCategories());
    } catch (error) {
      console.log("Error at getAvailableCategories:", error);
    }
  };
  async function getAvailableBrands() {
    try {
      setAvailableBrands(await BrandsService.getBrands());
    } catch (error) {
      console.log("Error at getAvailableBrands:", error);
    }
  }
  async function getAvailableProviders() {
    try {
      setAvailableProviders(await ProvidersService.getProviders());
    } catch (error) {
      console.log("Error at getAvailableProviders:", error);
    }
  }

  useEffect(() => {
    getAvailableCategories();
    getAvailableBrands();
    getAvailableProviders();
  }, []);

  return (
    <HeadingContainer heading="Produtos" minWidth="700px" maxWidth="900px">
      <form>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-id">
            <ExtraIdInfo isDisabled={disableIdField} />
          </label>
          <input
            ref={inputIdField}
            id="product-id"
            type="number"
            min={1}
            value={id}
            max={longMaxValue}
            onKeyUp={handleIdKeyUp}
            onBlur={handleIdOnBlur}
            onChange={handleId}
            disabled={disableIdField}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-name">Nome</label>
          <input
            id="product-name"
            type="text"
            value={name}
            ref={inputNameField}
            onChange={handleName}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-description">Descrição</label>
          <textarea
            id="product-description"
            type="text"
            value={description}
            onChange={handleDescription}
          />
        </FlexContainer>

        <FlexContainer>
          <FlexContainer
            direction="column"
            alignItems="left"
            padding="0 16px 0 0"
            flexGrow={1}
          >
            <label htmlFor="product-brand">Marca</label>
            <select
              id="product-brand"
              value={selectedBrandId}
              onChange={handleBrand}
            >
              <option value="unselected">Selecione</option>
              {availableBrands.length &&
                availableBrands.map(({ id, name, description }, key) => (
                  <option key={key} value={id} title={description}>
                    {name}
                  </option>
                ))}
            </select>
          </FlexContainer>
          <FlexContainer direction="column" alignItems="left" flexGrow={1}>
            <label htmlFor="product-category">Categoria</label>
            <select
              id="product-category"
              value={selectedCategoryId}
              onChange={handleCategory}
            >
              <option value="unselected">Selecione</option>
              {availableCategories.length &&
                availableCategories.map(({ id, name, description }, key) => (
                  <option key={key} value={id} title={description}>
                    {name}
                  </option>
                ))}
            </select>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer>
          <FlexContainer
            direction="column"
            alignItems="left"
            padding="0 16px 0 0"
            flexGrow={1}
          >
            <label htmlFor="product-provider">Fornecedor</label>
            <select
              id="product-provider"
              value={selectedProviderId}
              onChange={handleProvider}
            >
              <option value="unselected">Selecione</option>
              {availableProviders.length &&
                availableProviders.map(({ id, name, address }, key) => (
                  <option key={key} value={id} title={address}>
                    {name}
                  </option>
                ))}
            </select>
          </FlexContainer>
          <FlexContainer direction="column" alignItems="left">
            <label htmlFor="product-amount">
              Quantidade inicial (Somente para inclusões)
            </label>
            <input
              id="product-amount"
              type="number"
              min={0}
              max={longMaxValue}
              value={amount}
              disabled={disableAmountField}
              onChange={handleAmount}
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left" flexGrow={1}>
          <label htmlFor="product-price">Preço</label>
          <FlexContainer justifyContent="none" alignItems="left" flexGrow={1}>
            <FlexContainer
              padding="8px 16px"
              borderRadius="10px 0 0 10px"
              margin="0 -8px 16px 0"
              width="auto"
              minWidth="auto"
              backgroundColor={colorPallet.blue.lighter}
            >
              R$
            </FlexContainer>
            <FlexContainer alignItems="left" flexGrow={1}>
              <input
                id="product-price"
                type="text"
                min={1}
                maxLength="10"
                value={price}
                onChange={handlePrice}
                onKeyDown={handlePriceKeyDown}
              />
            </FlexContainer>
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

export default Products;
