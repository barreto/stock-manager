import { create } from "apisauce";

const api = create({
  baseURL: "http://localhost:8080/stock/",
  headers: {
    accept: "*",
    "Content-Type": "application/json",
    "Referrer-Policy": "no-referrer-when-downgrade",
  },
});

const StockService = {
  getStock() {
    return api.get("/").then((response) => {
      if (response.data) {
        return response.data;
      }

      return [];
    });
  },
  getProductFromStock(productId) {
    return api.get(`/${productId}`).then((response) => {
      if (response.data) {
        const { id, product, amount } = response.data;
        const { name, description, price, brand, category, provider } = product;
        return {
          id,
          name,
          description,
          price,
          amount,
          brandId: brand.id,
          categoryId: category.id,
          providerId: provider.id,
        };
      }
      return {};
    });
  },
  updateProductAmount(productId, amount) {
    const body = JSON.stringify({ amount });
    return api.put(`/changeAmount/${productId}`, body).then((response) => {
      if (response.data) {
        return response.data;
      }
      return {};
    });
  },
};

export default StockService;
