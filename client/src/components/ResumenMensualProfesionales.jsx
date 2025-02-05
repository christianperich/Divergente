import { useState, useEffect } from "react";

const calcularMontosPorProfesional = (sesiones) => {
  const montos = sesiones.reduce((acc, sesion) => {
    const profesionalId = sesion.profesional._id;
    let monto = 0;

    // Determinar el monto según el tipo de sesión
    if (sesion.tipo === "Atención") {
      monto = sesion.boleta ? 25000 : 20000;
    } else if (sesion.tipo === "Aseo") {
      monto = 11000;
    } else if (sesion.tipo === "Administración") {
      monto = 80000;
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

  return Object.values(montos); // Convertir objeto en array
};

export default function App({ sesiones }) {
  const [montosPorProfesional, setMontosPorProfesional] = useState([]);
  const [sumaTotal, setSumaTotal] = useState(0);

  useEffect(() => {
    if (sesiones.length > 0) {
      const montosCalculados = calcularMontosPorProfesional(sesiones);
      setMontosPorProfesional(montosCalculados);

      // Calcular la suma total
      const total = montosCalculados.reduce(
        (acc, profesional) => acc + profesional.total,
        0
      );
      setSumaTotal(total);
    } else {
      setMontosPorProfesional([]);
      setSumaTotal(0);
    }
  }, [sesiones]);

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
