import React from "react";
import "./global.css";
import Routes from "./routes";
import { PagesProvider } from "./pages/PagesContext";

function App() {
  return (
    <PagesProvider>
      <Routes />
    </PagesProvider>
  );
}

export default App;
