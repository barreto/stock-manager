import React, { useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import FlexContainer from "../../components/FlexContainer";
import colorPallet from "../../constants/colorPallet";
import { FiArrowLeft } from "react-icons/fi";
import IconButton from "../../components/IconButton/icon";
import { useState } from "react";
import ApiService from "../../services/ApiService";
const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = () => {
    alert("Yeeeah!");
  };
  const inputIdField = useRef(null);
  const [disableIdField, setDisableIdField] = useState(true);
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedBrandId, setSelectedBrandId] = useState(-1)
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1)
  const [selectedProviderId, setSelectedProviderId] = useState(-1)
  const [provider, setProvider] = useState([])
  const [selectedProvider, setSelectedProvider] = useState("")
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const setFocusOnIdField = () => inputIdField.current.focus();
  const getBrands = async () => {
    const response = await ApiService.getBrands()
    setBrands(response.map(({id, name})=>({id,name})))
  };
  const getProvider = async () => {
    const response = await ApiService.getProvider()
    setProvider(response.map(({id, name})=>({id,name})))
  };
  const getCategory = async () => {
    const response = await ApiService.getCategory()
    setCategory(response.map(({id, name})=>({id,name})))
  };
  useEffect(() => {
    getBrands();
    getProvider();
    getCategory();
  }, []);

  const handleAdd = () => {
    console.log(brands[0].id)
    const json = {amount:amount, brandId: selectedBrandId, categoryId: selectedCategoryId, description:description,
      name:name, price: price,providerId: selectedProviderId}
    console.log(JSON.stringify(json))
    console.log(ApiService.insertProduct(JSON.stringify(json)))
    alert("Produto Inserido com Sucesso")
  };
  
  const handleSearch = async ()=> {
    const safeDelay = 100;
    setDisableIdField(false);
    setTimeout(setFocusOnIdField, safeDelay);
    const response = await ApiService.getProduct(document.getElementById("product-id").value)
    const response_amount = await ApiService.getAmount(document.getElementById("product-id").value)
    
    
    setName(response.name)
    setDescription(response.description)
    setPrice(response.price)
    console.log(response_amount)
    setAmount(response_amount.amount)
    
    setSelectedBrandId(response.brand?.id)
    setSelectedCategoryId(response.category?.id)
    setSelectedProviderId(response.provider?.id)
    console.log(response)
   
  };

  const handleEdit = () => {
    console.log(brands[0].id)
    const json = {amount:amount, brandId: selectedBrandId, categoryId: selectedCategoryId, description:description,
    name:name, price: price,providerId: selectedProviderId}
    console.log(JSON.stringify(json))
    console.log(ApiService.updateProduct(document.getElementById("product-id").value,JSON.stringify(json)))
    alert("Produto Editado com Sucesso")
  };
  const handleDelete = () => {
    console.log(ApiService.removeProducts(document.getElementById("product-id").value))
    alert("Produto Excluido com Sucesso")
  };
  const handleBrandonChange = event=>{
    const value = event.target.value
    console.log("handleBrandonChange value: ",value)
    setSelectedBrandId(value)
  }
  const handleCategoryChange = event=>{
    const value = event.target.value
    console.log("handleBrandonChange value: ",value)
    setSelectedCategoryId(value)
  }
  const handleProviderChange = event=>{
    const value = event.target.value
    console.log("handleBrandonChange value: ",value)
    setSelectedProviderId(value)
  }

  const options = [
    { text: "Incluir", iconName: "FiPlusCircle", action: handleAdd },
    { text: "Pesquisar", iconName: "FiSearch", action: handleSearch },
    { text: "Editar", iconName: "FiEdit", action: handleEdit },
    { text: "Remover", iconName: "FiTrash2", action: handleDelete },
  ];

  return (
    <HeadingContainer heading="Produtos" maxWidth="500px">
      <form action="handleFormSubmit">
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-id">
            Id {!disableIdField && "(caso for pesquisar pressione Enter)"}
          </label>
          <input
            ref={inputIdField}
            id="product-id"
            type="number"
            min={0}
            disabled={disableIdField}
          />
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-name">Nome</label>
          <input id="product-name" type="text"  value = {name}/>
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-description">Descrição</label>
          <textarea id="product-description" type="text" value ={description}/>
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-price">Preço</label>
          <textarea id="product-price" type="text" value = {price}/>
        </FlexContainer>
        <FlexContainer direction="column" alignItems="left">
          <label htmlFor="product-amount">Quantidade</label>
          <textarea id="product-amount" type="text" value = {amount}/>
        </FlexContainer>

        <FlexContainer
            direction="column"
            alignItems="left"
            minWidht="auto"
            maxWidht="auto"
            flexGrow={1}
          >
            <label htmlFor="product-brand">Marca</label>
            <select id="product-brand" value={selectedBrandId} onChange={handleBrandonChange}>
              <option value="-1">Selecione</option>
              {brands.length &&
                brands.map((brand) => (
                  <option key = {brand.id} value={brand.id}>
                    {brand.name}
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
            <label htmlFor="product-category">Categoria</label>
            <select id="product-category" value={selectedCategoryId} onChange={handleCategoryChange}>
              <option value="-1">Selecione</option>
              {category.length &&
                category.map((category) => (
                  <option key = {category.id} value={category.id}>
                    {category.name}
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
            <label htmlFor="product-provider">Fornecedor</label>
            <select id="product-provider" value={selectedProviderId} onChange={handleProviderChange}>
              <option value="-1">Selecione</option>
              {provider.length &&
                provider.map((provider) => (
                  <option key = {provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
            </select>
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

export default Products;
