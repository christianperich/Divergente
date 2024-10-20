import { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import TotalAtenciones from "../components/TotalAtenciones";
import TodasLasAtenciones from "../components/TodasLasAtenciones";
import NuevaAtencion from "../components/NuevaAtencion";
import MonthSelector from "../components/MonthSelector";

export default function Dashboard({ user }) {
  const [sesiones, setSesiones] = useState([]);
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [yearActivo, setYearActivo] = useState(new Date().getFullYear());

  const sesionesString = `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}`;

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (!user?._id || isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(sesionesString);

        const esSesion = (sesion) => {
          const fechaSesion = new Date(sesion.fecha);
          const mesSesion = fechaSesion.getMonth();
          const yearSesion = fechaSesion.getFullYear();

          return (
            (sesion.tipo === "Atención" || sesion.tipo === "Aseo") &&
            mesSesion === mesActivo &&
            yearSesion === yearActivo
          );
        };

        const sesionesEvaluaciones = response.data.filter(esSesion);

        setSesiones(sesionesEvaluaciones);
      } catch (err) {
        console.error("Error al obtener las sesiones:", err);
      }
    };
    fetchSesiones();
  }, [user, mesActivo, yearActivo]);

  const handleNuevaAtencion = async () => {
    const response = await axios.get(sesionesString);
    setSesiones(response.data);
  };

  const handleDelete = async () => {
    const response = await axios.get(sesionesString);
    setSesiones(response.data);
  };

  const handleDateChange = (month, year) => {
    setMesActivo(month);
    setYearActivo(year);
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>Mis Atenciones</h1>
      <div className="container">
        <div>
          <MonthSelector onDateChange={handleDateChange} />
          <TotalAtenciones
            sesiones={sesiones}
            mesActivo={mesActivo}
            yearActivo={yearActivo}
          />
          <TodasLasAtenciones
            user={user}
            sesiones={sesiones}
            onDelete={handleDelete}
            mesActivo={mesActivo}
          />
          <NuevaAtencion user={user} onNuevaAtencion={handleNuevaAtencion} />
        </div>
      </div>
    </>
  );
}
