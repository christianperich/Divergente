import { useState, useEffect } from "react";

export default function TotalAtenciones({
  sesiones,
  mesActivo,
  yearActivo,
  tipoDeSesion,
}) {
  const [totalAtenciones, setTotalAtenciones] = useState(0);
  const [sinBoleta, setSinBoleta] = useState(0);
  const [conBoleta, setConBoleta] = useState(0);
  const [aseo, setAseo] = useState(0);
  const [administracion, setAdministracion] = useState(0);

  // Tarifas 2025 y anteriores
  const tarifas2025 = {
    valorSinBoletaAtencion: 20000,
    valorConBoletaAtencion: 25000,
    valorEvaluacionNino: 28000,
    valorEvaluacionAdulto: 30000,
    valorAseo: 11000,
    valorAdministracion: 88000,
  };

  // Tarifas 2026 (reajuste)
  const tarifas2026 = {
    valorSinBoletaAtencion: 21000, // Ajustar según reajuste 2026
    valorConBoletaAtencion: 26000,
    valorEvaluacionNino: 28000,
    valorEvaluacionAdulto: 30000,
    valorAseo: 11000,
    valorAdministracion: 88000,
  };

  // Tarifas 2026 aplican desde marzo 2026 (mes índice 2)
  const usarTarifas2026 =
    yearActivo > 2026 || (yearActivo === 2026 && mesActivo >= 2);
  const tarifas = usarTarifas2026 ? tarifas2026 : tarifas2025;

  useEffect(() => {
    let contadorSinBoleta = 0;
    let contadorConBoleta = 0;
    let contadorAseo = 0;
    let contadorAdministracion = 0;
    let descontarConTarifaDiferenciada = 0;

    sesiones.forEach((sesion) => {
      const fecha = new Date(sesion.fecha);

      const fechaUTC = new Date(
        Date.UTC(
          fecha.getUTCFullYear(),
          fecha.getUTCMonth(),
          fecha.getUTCDate(),
        ),
      );

      const yearSesion = fechaUTC.getUTCFullYear();
      const monthSesion = fechaUTC.getUTCMonth();

      if (sesion.usuario.tarifaDiferenciada && sesion.usuario.boleta) {
        descontarConTarifaDiferenciada +=
          tarifas.valorConBoletaAtencion - sesion.usuario.montoProfesional;
      } else if (sesion.usuario.tarifaDiferenciada && !sesion.usuario.boleta) {
        descontarConTarifaDiferenciada +=
          tarifas.valorSinBoletaAtencion - sesion.usuario.montoProfesional;
      }

      if (
        sesion.tipo === tipoDeSesion[0].nombre &&
        monthSesion === mesActivo &&
        yearSesion === yearActivo
      ) {
        if (sesion.boleta) {
          contadorConBoleta++;
        } else {
          contadorSinBoleta++;
        }
      }

      if (
        sesion.tipo === "Aseo" &&
        monthSesion === mesActivo &&
        yearSesion === yearActivo
      ) {
        contadorAseo++;
      }

      if (
        sesion.tipo === "Administración" &&
        monthSesion === mesActivo &&
        yearSesion === yearActivo
      ) {
        contadorAdministracion++;
      }
    });

    // Actualizar los estados
    setSinBoleta(contadorSinBoleta);
    setConBoleta(contadorConBoleta);
    setAseo(contadorAseo);
    setAdministracion(contadorAdministracion);

    let total =
      tipoDeSesion[0].nombre === "Atención"
        ? contadorSinBoleta * tarifas.valorSinBoletaAtencion +
          contadorConBoleta * tarifas.valorConBoletaAtencion +
          contadorAseo * tarifas.valorAseo
        : contadorSinBoleta * tarifas.valorEvaluacionNino +
          contadorConBoleta * tarifas.valorEvaluacionAdulto;

    total +=
      contadorAdministracion * tarifas.valorAdministracion -
      descontarConTarifaDiferenciada;

    setTotalAtenciones(total);
  }, [sesiones, mesActivo, yearActivo, tipoDeSesion]);

  return (
    <div className="card">
      <div className="card-info">
        <div className="card-info-item">
          <h3>Este mes has realizado:</h3>

          <p>
            {tipoDeSesion[0].nombre === "Evaluación"
              ? "Evaluación Niño(a)"
              : "Atención sin boleta"}
            : {sinBoleta}
          </p>
          <p>
            {tipoDeSesion[0].nombre === "Evaluación"
              ? "Evaluación Adulto(a)"
              : "Atención con boleta"}
            : {conBoleta}
          </p>
        </div>

        <div className="card-info-item">
          <h3>Total a recibir:</h3>

          <p className="money">${totalAtenciones.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
