import { useState, useEffect } from "react";

function ResumenMensual({ sesiones }) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [totalAseo, setTotalAseo] = useState(0);
  const [totalAdministracion, setTotalAdministracion] = useState(0);

  let contadorAtenciones = 0;
  let contadorEvaluaciones = 0;
  let contadorAseo = 0;
  let contadorAdministracion = 0;

  useEffect(() => {
    sesiones.forEach((sesion) => {
      if (sesion.tipo === "Atención") {
        contadorAtenciones += 1;
      } else if (sesion.tipo === "Evaluación") {
        contadorEvaluaciones += 1;
      } else if (sesion.tipo === "Aseo") {
        contadorAseo += 1;
      } else if (sesion.tipo === "Administración") {
        contadorAdministracion += 1;
      }
    });
    setTotalAtenciones(contadorAtenciones);
    setTotalEvaluaciones(contadorEvaluaciones);
    setTotalAseo(contadorAseo);
    setTotalAdministracion(contadorAdministracion);
  }, [sesiones]);

  const montoAtenciones = totalAtenciones * 8000;
  const montoEvaluaciones = totalEvaluaciones * 70000;
  const montoAseo = totalAseo * 11000;
  const montoAdministracion = totalAdministracion * 80000;
  const totalMes =
    montoAtenciones + montoEvaluaciones - montoAseo - montoAdministracion;

  console.log(totalAdministracion);

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
          {totalEvaluaciones} evaluaciones)
        </h3>
        <h3>Egresos por aseo: ${montoAseo.toLocaleString()}</h3>
        <h3>
          Egresos por administración: ${montoAdministracion.toLocaleString()}
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
