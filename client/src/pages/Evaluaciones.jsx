import UserInfo from "../components/UserInfo";
import NuevaAtencion from "../components/NuevaAtencion";

import { useEffect, useState } from "react";
import axios from "axios";
import MonthSelector from "../components/MonthSelector";
import TodasLasAtenciones from "../components/TodasLasAtenciones";
import TotalAtenciones from "../components/TotalAtenciones";

export default function Evaluaciones({ user }) {
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [yearActivo, setYearActivo] = useState(new Date().getFullYear());
  const [sesiones, setSesiones] = useState([]);

  const tipoDeSesion = [{ nombre: "Evaluación" }];
  const tipoDeSesionNombre = "Evaluación";

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        if (!user?._id || isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(
          `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}&tipoDeSesion=${tipoDeSesionNombre}`
        );

        setSesiones(response.data);
      } catch (err) {
        console.error("Error al obtener las evaluaciones:", err);
      }
    };

    fetchEvaluaciones();
  }, [user, mesActivo, yearActivo]);

  const handleDateChange = (month, year) => {
    setMesActivo(month);
    setYearActivo(year);
  };

  const handleDelete = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}&tipoDeSesion=${tipoDeSesionNombre}`
    );
    setSesiones(response.data);
  };

  const handleNuevaEvaluacion = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}&tipoDeSesion=${tipoDeSesionNombre}`
    );
    setSesiones(response.data);
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>Mis Evaluaciones</h1>

      <MonthSelector onDateChange={handleDateChange} />

      <TotalAtenciones
        sesiones={sesiones}
        mesActivo={mesActivo}
        yearActivo={yearActivo}
        tipoDeSesion={tipoDeSesion}
      />

      <TodasLasAtenciones
        sesiones={sesiones}
        onDelete={handleDelete}
        tipoDeSesion={tipoDeSesion}
        mesActivo={mesActivo}
        yearActivo={yearActivo}
      />

      <NuevaAtencion
        user={user}
        tipoDeSesion={tipoDeSesion}
        onNuevaAtencion={handleNuevaEvaluacion}
      />
    </>
  );
}
