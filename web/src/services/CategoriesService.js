import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: "*",
  },
});

const CategoriesService = {
  getCategories() {
    return api.get("/category").then((response) => {
      if (response.data) {
        return response.data;
      }

      return [];
    });
  },
  getCategory(id) {
    return api.get(`/category/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  newCategory(provider) {
    return api.post(`/category`, provider).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  updateCategory(id, category) {
    return api.put(`/category/${id}`, category).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  deleteCategory(id) {
    return api.delete(`/category/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
};

export default CategoriesService;
