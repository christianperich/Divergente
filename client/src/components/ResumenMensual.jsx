import { useState, useEffect } from "react";

function ResumenMensual({ sesiones }) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);

  let contador = 0;

  const montoAtenciones = totalAtenciones * 8000;
  const montoEvaluaciones = (sesiones.length - totalAtenciones) * 70000;
  const totalMes = montoAtenciones + montoEvaluaciones;

  useEffect(() => {
    sesiones.forEach((sesion) => {
      if (sesion.tipo === "Atención") {
        contador += 1;
      }
    });
    setTotalAtenciones(contador);
  }, [sesiones]);

  return (
    <>
      <div className="card">
        <h1>Resumen mensual Divergente</h1>
        <h3>
          Ingresos por atenciones: ${montoAtenciones.toLocaleString()} (
          {totalAtenciones} atenciones)
        </h3>
        <h3>
          Ingresos por evaluaciones: ${montoEvaluaciones.toLocaleString()} (
          {sesiones.length - totalAtenciones} evaluaciones)
        </h3>

        <h2>
          Ingresos totales:{" "}
          <span className="money">${totalMes.toLocaleString()}</span>
        </h2>
      </div>
    </>
  );
}

export default ResumenMensual;
