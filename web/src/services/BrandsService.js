import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: "*",
  },
});

const BrandsService = {
  getBrands() {
    return api.get("/brand").then((response) => {
      if (response.data) {
        return response.data;
      }

      return [];
    });
  },
  getBrand(id) {
    return api.get(`/brand/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  newBrand(provider) {
    return api.post(`/brand`, provider).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  updateBrand(id, category) {
    return api.put(`/brand/${id}`, category).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  deleteBrand(id) {
    return api.delete(`/brand/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
};

export default BrandsService;
