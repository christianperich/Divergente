import UserInfo from "../components/UserInfo";
import NuevaAtencion from "../components/NuevaAtencion";

import { useEffect, useState } from "react";
import axios from "axios";
import MonthSelector from "../components/MonthSelector";
import { MdOutlineDeleteForever } from "react-icons/md";

export default function Evaluaciones({ user }) {
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [yearActivo, setYearActivo] = useState(new Date().getFullYear());
  const [evaluaciones, setEvaluaciones] = useState([]);

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        if (!user?._id || isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(
          `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}`
        );

        const esEvaluacion = (sesion) => sesion.tipo === "Evaluación";
        const sesionesEvaluaciones = response.data.filter(esEvaluacion);

        setEvaluaciones(sesionesEvaluaciones);
      } catch (err) {
        console.error("Error al obtener las evaluaciones:", err);
      }
    };

    fetchEvaluaciones();
  }, [user, mesActivo, yearActivo]);

  console.log(evaluaciones);

  const handleDateChange = (month, year) => {
    setMesActivo(month);
    setYearActivo(year);
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>Mis Evaluaciones</h1>
      <div className="container">
        <MonthSelector onDateChange={handleDateChange} />
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Estado de pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((evaluacion) => (
              <tr key={evaluacion._id}>
                <td>
                  {new Date(evaluacion.fecha).toISOString().split("T")[0]}
                </td>
                <td>{evaluacion.usuario.nombre}</td>
                <td>{evaluacion.pagadoProfesional ? "Pagada" : "Pendiente"}</td>
                <td className="actions">
                  <a
                    className="action"
                    onClick={() => handleDelete(sesion._id)}
                  >
                    <MdOutlineDeleteForever />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {evaluaciones.length === 0 && <p>No hay evaluaciones ingresadas.</p>}
      </div>
      <NuevaAtencion />
    </>
  );
}
