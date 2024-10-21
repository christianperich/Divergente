import { useState, useEffect } from "react";

export default function TotalAtenciones({ sesiones, mesActivo, yearActivo }) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);
  const [sinBoleta, setSinBoleta] = useState(0);
  const [conBoleta, setConBoleta] = useState(0);
  const [aseo, setAseo] = useState(0);

  const valorSinBoleta = 20000;
  const valorConBoleta = 24500;
  const valorAseo = 11000;

  useEffect(() => {
    let contadorSinBoleta = 0;
    let contadorConBoleta = 0;
    let contadorAseo = 0;

    sesiones.forEach((sesion) => {
      const fecha = new Date(sesion.fecha);

      if (
        sesion.tipo === "Atención" &&
        fecha.getMonth() === mesActivo &&
        fecha.getFullYear() === yearActivo
      ) {
        if (sesion.boleta) {
          contadorConBoleta++;
        } else {
          contadorSinBoleta++;
        }
      }

      if (
        sesion.tipo === "Aseo" &&
        fecha.getMonth() === mesActivo &&
        fecha.getFullYear() === yearActivo
      ) {
        contadorAseo++;
      }
    });

    // Actualizar los estados
    setSinBoleta(contadorSinBoleta);
    setConBoleta(contadorConBoleta);
    setAseo(contadorAseo);

    const total =
      contadorConBoleta * valorConBoleta +
      contadorSinBoleta * valorSinBoleta +
      contadorAseo * valorAseo;
    setTotalAtenciones(total);
  }, [sesiones, mesActivo, yearActivo]);

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-item">
          <h3>Este mes has realizado:</h3>

          <p>Atenciones sin boleta: {sinBoleta}</p>
          <p>Atenciones con boleta: {conBoleta}</p>
        </div>

        <div className="card-info-item">
          <h3>Total a recibir:</h3>

          <p className="money">${totalAtenciones.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
