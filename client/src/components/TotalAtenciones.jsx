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

  const valorSinBoletaAtencion = 20000;
  const valorConBoletaAtencion = 25000;

  const ValorEvaluacionNino = 28000;
  const ValorEvaluacionAdulto = 30000;
  const valorAseo = 11000;
  const valorAdministracion = 80000;

  useEffect(() => {
    let contadorSinBoleta = 0;
    let contadorConBoleta = 0;
    let contadorAseo = 0;
    let contadorAdministracion = 0;

    sesiones.forEach((sesion) => {
      const fecha = new Date(sesion.fecha);

      const fechaUTC = new Date(
        Date.UTC(
          fecha.getUTCFullYear(),
          fecha.getUTCMonth(),
          fecha.getUTCDate()
        )
      );

      const yearSesion = fechaUTC.getUTCFullYear();
      const monthSesion = fechaUTC.getUTCMonth();

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
        ? contadorSinBoleta * valorSinBoletaAtencion +
          contadorConBoleta * valorConBoletaAtencion +
          contadorAseo * valorAseo
        : contadorSinBoleta * ValorEvaluacionNino +
          contadorConBoleta * ValorEvaluacionAdulto;

    total += contadorAdministracion * valorAdministracion;

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
