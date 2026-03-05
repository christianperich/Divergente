import { useState, useEffect } from "react";

const tarifas2025 = {
  valorConBoletaAtencion: 25000,
  valorSinBoletaAtencion: 20000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

const tarifas2026 = {
  valorConBoletaAtencion: 26490,
  valorSinBoletaAtencion: 21000,
  valorAseo: 11000,
  valorAdministracion: 88000,
};

// Tarifas 2026 aplican desde marzo 2026 (mes 1-12: marzo = 3)
const usarTarifas2026 = (yearActivo, mesActivo) =>
  yearActivo > 2026 || (yearActivo === 2026 && mesActivo >= 3);

const calcularMontosPorProfesional = (sesiones, yearActivo, mesActivo = 1) => {
  const tarifas = usarTarifas2026(yearActivo, mesActivo)
    ? tarifas2026
    : tarifas2025;

  const montos = sesiones.reduce((acc, sesion) => {
    const profesionalId = sesion.profesional._id;
    let monto = 0;

    if (sesion.tipo === "Atención") {
      if (sesion.usuario && sesion.usuario.tarifaDiferenciada) {
        monto = Number(sesion.usuario.montoProfesional || 0);
      } else {
        monto = sesion.boleta
          ? tarifas.valorConBoletaAtencion
          : tarifas.valorSinBoletaAtencion;
      }
    } else if (sesion.tipo === "Aseo") {
      monto = tarifas.valorAseo;
    } else if (sesion.tipo === "Administración") {
      monto = tarifas.valorAdministracion;
    }

    if (!acc[profesionalId]) {
      acc[profesionalId] = {
        nombre: sesion.profesional.nombre,
        total: 0,
      };
    }

    acc[profesionalId].total += monto;
    return acc;
  }, {});

  return Object.values(montos);
};

export default function App({
  sesiones,
  yearActivo = new Date().getFullYear(),
  mesActivo = 1,
}) {
  const [montosPorProfesional, setMontosPorProfesional] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(0);

  useEffect(() => {
    if (sesiones.length > 0) {
      const montosCalculados = calcularMontosPorProfesional(
        sesiones,
        yearActivo,
        mesActivo,
      );
      setMontosPorProfesional(montosCalculados);

      // Calcular la suma total
      const total = montosCalculados.reduce(
        (acc, profesional) => acc + profesional.total,
        0,
      );
      setSumaTotal(total);
    } else {
      setMontosPorProfesional([]);
      setSumaTotal(0);
    }
  }, [sesiones, yearActivo, mesActivo]);

  return (
    <div className="card">
      <h2>Montos por Profesional</h2>
      <ul
        style={{ listStyle: "none", textAlign: "center", fontSize: "1.2rem" }}
      >
        {montosPorProfesional.map((profesional) => (
          <li key={profesional.nombre}>
            {profesional.nombre}: ${profesional.total.toLocaleString()}
          </li>
        ))}
      </ul>

      <h3>Total General: ${sumaTotal.toLocaleString()}</h3>
    </div>
  );
}
