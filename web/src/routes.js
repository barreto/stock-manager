import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import StockManager from "./pages/StockManager";
import PalletColors from "./pages/PalletColors";
import routesPath from "./constants/routesPath";
import Brands from "./pages/Brands";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path={routesPath.Home} exact component={Home} />
      <Route path={routesPath.StockManager} component={StockManager} />
      <Route path={routesPath.PalletColors} component={PalletColors} />
      <Route path={routesPath.Brands} component={Brands} />
    </BrowserRouter>
  );
};

export default Routes;
