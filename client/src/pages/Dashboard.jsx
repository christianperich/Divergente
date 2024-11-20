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

  const tipoDeSesion = [{ nombre: "Atención" }, { nombre: "Aseo" }];
  const tipodeSesionNombres = "Aseo";

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (!user?._id || isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(
          `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}`,
          tipodeSesionNombres
        );
        console.log(response.data);
        setSesiones(response.data);
      } catch (err) {
        console.error("Error al obtener las sesiones:", err);
      }
    };
    fetchSesiones();
  }, [user, mesActivo, yearActivo]);

  const handleNuevaAtencion = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}&tipoDeSesion=${tipodeSesionNombres}`
    );
    setSesiones(response.data);
  };

  const handleDelete = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${mesActivo}&year=${yearActivo}&tipoDeSesion=${tipodeSesionNombres}`
    );
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
      <div>
        <div>
          <MonthSelector onDateChange={handleDateChange} />
          <TotalAtenciones
            sesiones={sesiones}
            mesActivo={mesActivo}
            yearActivo={yearActivo}
            tipoDeSesion={tipoDeSesion}
          />
          <TodasLasAtenciones
            user={user}
            sesiones={sesiones}
            onDelete={handleDelete}
            mesActivo={mesActivo}
          />
          <NuevaAtencion
            user={user}
            onNuevaAtencion={handleNuevaAtencion}
            tipoDeSesion={tipoDeSesion}
          />
        </div>
      </div>
    </>
  );
}
