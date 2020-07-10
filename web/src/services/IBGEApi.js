import { create } from "apisauce";

const api = create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/",
});

const IBGEApi = {
  getUFs() {
    return api.get("/localidades/estados").then((response) => {
      if (response.data) {
        return response.data.map(({ sigla }) => sigla);
      }

      return [];
    });
  },
  getCities(uf) {
    return api.get(`/localidades/estados/${uf}/municipios`).then((response) => {
      if (response.data) {
        return response.data.map(({ nome }) => nome);
      }
      return [];
    });
  },
};

export default IBGEApi;
