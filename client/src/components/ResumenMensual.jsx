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
  const usarTarifas2026 =
    yearActivo > 2026 || (yearActivo === 2026 && mesActivo >= 3);

  const tarifas = usarTarifas2026 ? tarifas2026 : tarifas2025;

  let totalConBoleta = 0;
  let totalSinBoleta = 0;
  let totalDiferenciado = 0;

  let montoConBoleta = 0;
  let montoSinBoleta = 0;
  let montoDiferenciado = 0;

  let totalEvaluaciones = 0;
  let totalAseo = 0;
  let totalAdministracion = 0;

  const evaluadosUnicos = new Set();

  sesiones.forEach((sesion) => {
    // ======================
    // ATENCIONES
    // ======================

    if (sesion.tipo === "Atención") {
      // Diferenciado
      if (sesion.usuario?.tarifaDiferenciada) {
        totalDiferenciado += 1;

        montoDiferenciado += Number(sesion.usuario?.montoDivergente || 0);
        console.log("Monto por usuario:", sesion.usuario?.montoDivergente);
        console.log("Total diferenciado acumulado:", montoDiferenciado);
      }

      // Con boleta
      else if (sesion.boleta === true) {
        totalConBoleta += 1;

        montoConBoleta += tarifas.valorConBoleta;
      }

      // Sin boleta
      else {
        totalSinBoleta += 1;

        montoSinBoleta += tarifas.valorSinBoleta;
      }
    }

    // ======================
    // EVALUACIONES
    // ======================
    else if (sesion.tipo === "Evaluación") {
      if (sesion.usuario?.nombre) {
        evaluadosUnicos.add(sesion.usuario.nombre);
      }
    }

    // ======================
    // ASEO
    // ======================
    else if (sesion.tipo === "Aseo") {
      totalAseo += 1;
    }

    // ======================
    // ADMINISTRACIÓN
    // ======================
    else if (sesion.tipo === "Administración") {
      totalAdministracion += 1;
    }
  });

  totalEvaluaciones = evaluadosUnicos.size;

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
        Atenciones con boleta: ${montoConBoleta.toLocaleString()}(
        {totalConBoleta} atenciones)
      </h3>

      <h3>
        Atenciones sin boleta: ${montoSinBoleta.toLocaleString()}(
        {totalSinBoleta} atenciones)
      </h3>

      <h3>
        Atenciones arancel diferenciado: ${montoDiferenciado.toLocaleString()}(
        {totalDiferenciado} atenciones)
      </h3>

      <h3>
        Evaluaciones: ${montoEvaluaciones.toLocaleString()}({totalEvaluaciones}{" "}
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
