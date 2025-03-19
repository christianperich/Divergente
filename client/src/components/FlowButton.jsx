import React, { useState, useEffect } from "react";
import Select from "react-select";
import btnPagar from "../assets/img/btn-flow-blanco.png";

function FlowButton() {
  const [valor, setValor] = useState(50000);
  const [link, setLink] = useState(
    "https://www.flow.cl/btn.php?token=zef26f407cee2f16c20f4512c92a0084991c0539"
  );

  const options = [
    { value: "1", label: "Segundo Bloque - $50.000" },
    { value: "2", label: "1 clase - $30.000" },
  ];

  const handleChange = (e) => {
    console.log(e);
    if (e.value === "1") {
      setLink(
        "https://www.flow.cl/btn.php?token=zef26f407cee2f16c20f4512c92a0084991c0539"
      );
      setValor(50000);
    } else if (e.value === "2") {
      setLink(
        "https://www.flow.cl/btn.php?token=s829d9163ddbed8834beff8236418d574b461cbd"
      );
      setValor(30000);
    }
  };

  console.log(valor);

  return (
    <div style={{ width: "40%", margin: "0 auto" }}>
      <label htmlFor="">Seleccionar un artículo:</label>
      <Select
        name="clases"
        id=""
        className="form-select"
        options={options}
        defaultValue={options[0]}
        onChange={(e) => handleChange(e)}
      />

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={btnPagar} style={{ width: "150px" }} alt="Pagar con Flow" />
        </a>
      </div>
    </div>
  );
}

export default FlowButton;
