import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: "*",
  },
});

const ProvidersService = {
  getProviders() {
    return api.get("/provider").then((response) => {
      if (response.data) {
        return response.data;
      }

      return [];
    });
  },
  getProvider(id) {
    return api.get(`/provider/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  newProvider(provider) {
    return api.post(`/provider`, provider).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  updatePovider(id, provider) {
    return api.put(`/provider/${id}`, provider).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
  deleteProvider(id) {
    return api.delete(`/provider/${id}`).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
};

export default ProvidersService;
