import React from "react";
import { Link } from "react-router-dom";
import routesPath from "../../constants/routesPath";
import HeadingContainer from "../../components/HeadingContainer";
import colorPallet from "../../constants/colorPallet";

const PalletColors = () => {
  return (
    <HeadingContainer heading="Paleta de cores">
      {Object.entries(colorPallet).map((entry, key, arr) => {
        const [colorName, colors] = entry;
        console.log(colorName, colors);

        const colorsContainers = Object.values(colors).map(
          (color, key, arr) => (
            <div
              style={{
                backgroundColor: color,
                width: `${100 / arr.length}%`,
                height: 50,
                border: "1px solid #333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {color}
            </div>
          )
        );

        return (
          <div key={key} style={{ marginBottom: 16 }}>
            <h3>{colorName}</h3>
            <div style={{ display: "flex" }}>{colorsContainers}</div>
          </div>
        );
      })}

      <Link to={routesPath.Home}>Voltar para HOme</Link>
    </HeadingContainer>
  );
};

export default PalletColors;
