import React, { useState, useEffect } from "react";
import Select from "react-select";
import btnPagar from "../assets/img/btn-flow-blanco.png";

function FlowButton() {
  const [valor, setValor] = useState(100000);
  const [link, setLink] = useState(
    "https://www.flow.cl/btn.php?token=e982c861213756fb0d35761730ee380710f23f0f"
  );

  const options = [
    { value: "1", label: "Curso Completo - $100.000" },
    { value: "2", label: "1 clase - $30.000" },
    { value: "3", label: "2 clases - $60.000" },
    { value: "4", label: "3 clases - $90.000" },
  ];

  const handleChange = (e) => {
    console.log(e);
    if (e.value === "1") {
      setLink(
        "https://www.flow.cl/btn.php?token=e982c861213756fb0d35761730ee380710f23f0f"
      );
      setValor(100000);
    } else if (e.value === "2") {
      setLink(
        "https://www.flow.cl/btn.php?token=s829d9163ddbed8834beff8236418d574b461cbd"
      );
      setValor(30000);
    } else if (e.value === "3") {
      setLink(
        "https://www.flow.cl/btn.php?token=cb3d870b703f4aaf0775bd0003f6c918d6f2fc1a"
      );
      setValor(60000);
    } else if (e.value === "4") {
      setLink(
        "https://www.flow.cl/btn.php?token=w1e5fd73da55e3a2f1639f867e7b321ffac7733f"
      );
      setValor(90000);
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
