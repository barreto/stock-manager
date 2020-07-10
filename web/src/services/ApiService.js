const ApiService ={
  getProduct: id =>{
    return fetch('http://localhost:8080/product/+'+id)
      .then(res => res.json());
  },
  insertProduct: product =>{
    return fetch('http://localhost:8080/product', {method: 'POST', headers:{'content-type': 'application/json'}, body:product})
      .then(res => res.json())
  },
  getProducts: ()=>{
    return fetch('http://localhost:8080/product')
      .then(res => res.json());
  },
  removeProducts: id=>{
    return fetch('http://localhost:8080/product/'+id, {method: 'DELETE', Headers: {'content-type': 'application/json'}})
      .then(res => res.json());
  },
  updateProduct: (id,product) =>{
    return fetch('http://localhost:8080/product/'+id, {method: 'PUT', headers:{'content-type': 'application/json'}, body:product})
      .then(res => res.json())
  },
  getBrands: ()=>{
    return fetch('http://localhost:8080/brand')
      .then(res => res.json());
  },
  getProvider: ()=>{
    return fetch('http://localhost:8080/provider')
      .then(res => res.json());
  },
  getCategory: ()=>{
    return fetch('http://localhost:8080/category')
      .then(res => res.json());
  },
  getAmount: id=>{
    return fetch('http://localhost:8080/stock/'+id)
      .then(res => res.json());
  }
}

export default ApiService
