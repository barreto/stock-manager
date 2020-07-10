import React from "react";
import { useState } from "react";
import Loading from "./Loading";

const PagesContext = React.createContext([Boolean, () => Boolean]);

const isLoadingIndex = 0;
const setIsLoadingIndex = 1;

const PagesProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <PagesContext.Provider value={[isLoading, setIsLoading]}>
      {isLoading && <Loading />}
      {props.children}
    </PagesContext.Provider>
  );
};
export default PagesContext;
export { PagesProvider, isLoadingIndex, setIsLoadingIndex };
