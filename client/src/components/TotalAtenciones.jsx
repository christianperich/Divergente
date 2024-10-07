import { useState, useEffect } from "react";

export default function TotalAtenciones({ sesiones, mesActivo, yearActivo }) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);

  let sinBoleta = 0;
  let conBoleta = 0;
  let aseo = 0;

  const evaluaciones = sesiones.filter(
    (sesion) => sesion.tipo === "Evaluación"
  );

  const valorSinBoleta = 20000;
  const valorConBoleta = 24500;
  const valorAseo = 11000;

  useEffect(() => {
    sesiones.forEach((sesion) => {
      const fecha = new Date(sesion.fecha);

      if (
        sesion.tipo === "Atención" &&
        fecha.getMonth() === mesActivo &&
        fecha.getFullYear() === yearActivo
      ) {
        if (sesion.boleta) {
          conBoleta++;
        } else {
          sinBoleta++;
        }
      }

      if (
        sesion.tipo === "Aseo" &&
        fecha.getMonth() === mesActivo &&
        fecha.getFullYear() === yearActivo
      ) {
        aseo++;
      }
    });

    const total =
      conBoleta * valorConBoleta +
      sinBoleta * valorSinBoleta +
      aseo * valorAseo;
    setTotalAtenciones(total);
  }, [sesiones]);

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-item">
          <h3>Este mes has realizado:</h3>

          <p>Atenciones sin boleta: {sinBoleta}</p>
          <p>Atenciones con boleta: {conBoleta}</p>
          <p>Evaluaciones: {evaluaciones.length}</p>
        </div>

        <div className="card-info-item">
          <h3>Total a recibir:</h3>

          <p className="money">${totalAtenciones.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
