import React from "react";

const ExtraIdInfo = ({ isDisabled }) => {
  if (isDisabled) {
    return <i>Id (O valor de ID só será usado para realizar buscas)</i>;
  } else {
    return (
      <i>
        Id (Para pesquisar pressione <b>Enter</b>)
      </i>
    );
  }
};

export default ExtraIdInfo;
