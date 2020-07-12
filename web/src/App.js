import React from "react";
import "./global.css";
import Routes from "./routes";
import { PagesProvider } from "./pages/PagesContext";
import logStockManagerInConsole from "./helpers/logStockManagerInConsole";

function App() {
  logStockManagerInConsole();

  return (
    <PagesProvider>
      <Routes />
    </PagesProvider>
  );
}

export default App;
