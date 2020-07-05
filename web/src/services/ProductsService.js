import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: "*",
  },
});

const ProductService = {
  getProducts() {
    return api.get("/product").then((response) => {
      if (response.data) {
        return response.data;
      }

      return [];
    });
  },
  getProduct(id) {
    return api.get(`/product/${id}`).then((response) => {
      if (response.data) {
        const {
          id,
          name,
          description,
          price,
          brand,
          category,
          provider,
        } = response.data;
        return {
          id,
          name,
          description,
          price,
          brandId: brand.id,
          categoryId: category.id,
          providerId: provider.id,
        };
      }
      return {};
    });
  },
  newProduct(product) {
    return api.post(`/product`, product).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  updateProduct(id, product) {
    return api.put(`/product/${id}`, product).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  deleteProduct(id) {
    return api.delete(`/product/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
};

export default ProductService;
