import React, { useRef } from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
import longMaxValue from "../../constants/longMaxValue";
import CategoriesService from "../../services/CategoriesService";
import ExtraIdInfo from "../../components/ExtraIdInfo";
import { notAllDataErrorMessage } from "../../constants/notAllDataErrorMessage";
const Categories = () => {
  const inputIdField = useRef(null);
  const inputNameField = useRef(null);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disableIdField, setDisableIdField] = useState(true);

  const handleId = (event) => setId(event.target.value);
  const handleName = (event) => setName(event.target.value);
  const handleDescription = (event) => setDescription(event.target.value);

  const setFocusOnIdField = () => inputIdField.current.focus();
  const setFocusOnNameField = () => inputNameField.current.focus();

  function getFormData() {
    return {
      id,
      name,
      description,
    };
  }

  const setFormData = (category) => {
    setName(category.name);
    setDescription(category.description);
  };

  async function handleAdd() {
    const newCategory = getFormData();
    if (!checkIfIsValidCategory(newCategory)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await CategoriesService.newCategory(newCategory);
      alert("Categoria cadastrado com sucesso!");
      handleClear();
    } catch (error) {
      alert("Erro ao cadastrar categoria. Tente novamente mais tarde!");
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
    const categoryToEdit = getFormData();
    if (!checkIfIsValidCategory(categoryToEdit)) {
      alert(notAllDataErrorMessage);
      return;
    }
    try {
      await CategoriesService.updateCategory(id, categoryToEdit);
      alert("Categoria atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar categoria. Tente novamente mais tarde!");
      console.log("Error!", error);
    }
  }
  async function handleDelete() {
    const categoryToDelete = getFormData();
    if (!checkIfIsValidCategory(categoryToDelete)) {
      alert(
        "Antes de remover uma categoria pesquise-o e verifique se realmente deseja o excluir."
      );
      return;
    }
    const deleteConfirmation = window.confirm(
      `Você realmente deseja deletar os dados referentes à categoria: ${name}`
    );

    if (deleteConfirmation) {
      try {
        await CategoriesService.deleteCategory(id);
        alert("Categoria removido com sucesso!");
        handleClear();
      } catch (error) {
        alert("Erro ao remover categoria. Tente novamente mais tarde!");
        console.log("Error!", error);
      }
    }
  }

  function handleClear() {
    setId("");
    setDisableIdField(true);
    setName("");
    setDescription("");
    setFocusOnNameField();
  }

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
    { text: "Limpar", iconName: "FiDelete", action: handleClear },
  ];

  const checkIfIsValidCategory = (category) => {
    return !!category && !!category.name && !!category.description;
  };

  async function findCategory(id) {
    const response = await CategoriesService.getCategory(id);
    const isValidCategory = checkIfIsValidCategory(response);
    if (!isValidCategory) {
      alert("Essa categoria não foi encontrada.");
      handleClear();
      return;
    }

    setFormData(response);
  }

  const handleIdKeyUp = (event) => {
    const key = event.key;
    const listenedKey = "Enter";
    if (key === listenedKey) {
      findCategory(id);
      setDisableIdField(true);
      setFocusOnNameField();
    }
  };

  const handleIdOnBlur = () => {
    setDisableIdField(true);
  };

  return (
    <HeadingContainer heading="Categorias" maxWidth="500px">
      <form>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="category-id">
            <ExtraIdInfo isDisabled={disableIdField} />
          </label>
          <input
            ref={inputIdField}
            id="category-id"
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
          <label htmlFor="category-name">Nome</label>
          <input
            id="category-name"
            type="text"
            value={name}
            ref={inputNameField}
            onChange={handleName}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="category-description">Descrição</label>
          <textarea
            id="category-description"
            type="text"
            value={description}
            onChange={handleDescription}
          />
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

export default Categories;
