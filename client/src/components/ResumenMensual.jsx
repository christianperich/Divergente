import { useState, useEffect } from "react";

const tarifas2025 = {
  valorAtencion: 8000,
  valorEvaluacion: 70000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

const tarifas2026 = {
  valorAtencion: 9510,
  valorEvaluacion: 70000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

function ResumenMensual({
  sesiones,
  yearActivo = new Date().getFullYear(),
  mesActivo = 1,
}) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);
  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [totalAseo, setTotalAseo] = useState(0);
  const [totalAdministracion, setTotalAdministracion] = useState(0);

  // Tarifas 2026 aplican desde marzo 2026 (mes 1-12: marzo = 3)
  const usarTarifas2026 =
    yearActivo > 2026 || (yearActivo === 2026 && mesActivo >= 3);
  const tarifas = usarTarifas2026 ? tarifas2026 : tarifas2025;

  let contadorAtenciones = 0;
  let contadorAseo = 0;
  let contadorAdministracion = 0;
  const evaluadosUnicos = new Set();

  useEffect(() => {
    sesiones.forEach((sesion) => {
      if (sesion.tipo === "Atención") {
        contadorAtenciones += 1;
      } else if (sesion.tipo === "Evaluación") {
        if (sesion.usuario.nombre) {
          evaluadosUnicos.add(sesion.usuario.nombre); // o el campo correcto de ID único
        }
      } else if (sesion.tipo === "Aseo") {
        contadorAseo += 1;
      } else if (sesion.tipo === "Administración") {
        contadorAdministracion += 1;
      }
    });
    setTotalAtenciones(contadorAtenciones);
    setTotalEvaluaciones(evaluadosUnicos.size);
    setTotalAseo(contadorAseo);
    setTotalAdministracion(contadorAdministracion);
  }, [sesiones]);

  // Calcular considerando tarifas diferenciadas por usuario cuando corresponda
  let montoAtenciones = 0;
  let montoEvaluaciones = 0;
  let montoAseo = totalAseo * tarifas.valorAseo;
  let montoAdministracion = totalAdministracion * tarifas.valorAdministracion;

  sesiones.forEach((sesion) => {
    if (sesion.tipo === "Atención") {
      if (sesion.usuario && sesion.usuario.tarifaDiferenciada) {
        montoAtenciones += Number(sesion.usuario.montoDivergente || 0);
      } else {
        montoAtenciones += tarifas.valorAtencion;
      }
    } else if (sesion.tipo === "Evaluación") {
      montoEvaluaciones += tarifas.valorEvaluacion;
    }
  });

  const totalMes =
    montoAtenciones + montoEvaluaciones - montoAseo - montoAdministracion;

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
