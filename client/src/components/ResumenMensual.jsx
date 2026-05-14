import { useState, useEffect } from "react";

const tarifas2025 = {
  valorConBoleta: 8000,
  valorSinBoleta: 8000,
  valorEvaluacion: 70000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

const tarifas2026 = {
  valorConBoleta: 9510,
  valorSinBoleta: 9000,
  valorEvaluacion: 70000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

function ResumenMensual({
  sesiones,
  yearActivo = new Date().getFullYear(),
  mesActivo = 1,
}) {
  const [totalConBoleta, setTotalConBoleta] = useState(0);
  const [totalSinBoleta, setTotalSinBoleta] = useState(0);
  const [totalDiferenciado, setTotalDiferenciado] = useState(0);

  const [totalEvaluaciones, setTotalEvaluaciones] = useState(0);
  const [totalAseo, setTotalAseo] = useState(0);
  const [totalAdministracion, setTotalAdministracion] = useState(0);

  // Tarifas 2026 desde marzo
  const usarTarifas2026 =
    yearActivo > 2026 || (yearActivo === 2026 && mesActivo >= 3);

  const tarifas = usarTarifas2026 ? tarifas2026 : tarifas2025;

  useEffect(() => {
    let contadorConBoleta = 0;
    let contadorSinBoleta = 0;
    let contadorDiferenciado = 0;
    let contadorAseo = 0;
    let contadorAdministracion = 0;

    const evaluadosUnicos = new Set();

    sesiones.forEach((sesion) => {
      if (sesion.tipo === "Atención") {
        // Arancel diferenciado
        if (sesion.usuario?.tarifaDiferenciada) {
          contadorDiferenciado += 1;
        }

        // Con boleta
        else if (sesion.boleta === true) {
          contadorConBoleta += 1;
        }

        // Sin boleta
        else {
          contadorSinBoleta += 1;
        }
      } else if (sesion.tipo === "Evaluación") {
        if (sesion.usuario?.nombre) {
          evaluadosUnicos.add(sesion.usuario.nombre);
        }
      } else if (sesion.tipo === "Aseo") {
        contadorAseo += 1;
      } else if (sesion.tipo === "Administración") {
        contadorAdministracion += 1;
      }
    });

    setTotalConBoleta(contadorConBoleta);
    setTotalSinBoleta(contadorSinBoleta);
    setTotalDiferenciado(contadorDiferenciado);

    setTotalEvaluaciones(evaluadosUnicos.size);
    setTotalAseo(contadorAseo);
    setTotalAdministracion(contadorAdministracion);
  }, [sesiones]);

  // MONTOS
  let montoConBoleta = totalConBoleta * tarifas.valorConBoleta;

  let montoSinBoleta = totalSinBoleta * tarifas.valorSinBoleta;

  let montoDiferenciado = 0;

  sesiones.forEach((sesion) => {
    if (sesion.tipo === "Atención" && sesion.usuario?.tarifaDiferenciada) {
      montoDiferenciado += Number(sesion.usuario?.montoDivergente || 0);
    }
  });

  const montoEvaluaciones = totalEvaluaciones * tarifas.valorEvaluacion;

  const montoAseo = totalAseo * tarifas.valorAseo;

  const montoAdministracion = totalAdministracion * tarifas.valorAdministracion;

  const totalMes =
    montoConBoleta +
    montoSinBoleta +
    montoDiferenciado +
    montoEvaluaciones -
    montoAseo -
    montoAdministracion;

  return (
    <div className="card">
      <h1>Resumen mensual Divergente</h1>

      <h3>
        Atenciones con boleta: ${montoConBoleta.toLocaleString()} (
        {totalConBoleta} atenciones)
      </h3>

      <h3>
        Atenciones sin boleta: ${montoSinBoleta.toLocaleString()} (
        {totalSinBoleta} atenciones)
      </h3>

      <h3>
        Atenciones arancel diferenciado: ${montoDiferenciado.toLocaleString()} (
        {totalDiferenciado} atenciones)
      </h3>

      <h3>
        Evaluaciones: ${montoEvaluaciones.toLocaleString()} ({totalEvaluaciones}{" "}
        evaluaciones)
      </h3>

      <h3>Egresos por aseo: ${montoAseo.toLocaleString()}</h3>

      <h3>
        Egresos por administración: ${montoAdministracion.toLocaleString()}
      </h3>

      <h2>
        Total mes:
        <span className="money">${totalMes.toLocaleString()}</span>
      </h2>
    </div>
  );
}

export default ResumenMensual;
