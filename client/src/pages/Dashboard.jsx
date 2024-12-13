import { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/UserInfo";
import TotalAtenciones from "../components/TotalAtenciones";
import TodasLasAtenciones from "../components/TodasLasAtenciones";
import NuevaAtencion from "../components/NuevaAtencion";
import MonthSelector from "../components/MonthSelector";

export default function Dashboard({ user }) {
  const [sesiones, setSesiones] = useState([]);
  const [mesActivo, setMesActivo] = useState(() => {
    const storedDate = localStorage.getItem("selectedMonthYear");
    return storedDate
      ? parseInt(storedDate.split("-")[1]) - 1
      : new Date().getMonth();
  });
  const [yearActivo, setYearActivo] = useState(() => {
    const storedDate = localStorage.getItem("selectedMonthYear");
    return storedDate
      ? parseInt(storedDate.split("-")[0])
      : new Date().getFullYear();
  });

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
        setSesiones(response.data);
      } catch (err) {
        console.error("Error al obtener las sesiones:", err);
      }
    };
    fetchSesiones();
  }, [user, mesActivo, yearActivo]);

  const handleNuevaAtencion = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${
        mesActivo + 1
      }&year=${yearActivo}&tipoDeSesion=${tipodeSesionNombres}`
    );
    setSesiones(response.data);
  };

  const handleDelete = async () => {
    const response = await axios.get(
      `/api/sesiones/${user._id}?month=${
        mesActivo + 1
      }&year=${yearActivo}&tipoDeSesion=${tipodeSesionNombres}`
    );
    setSesiones(response.data);
  };

  const handleDateChange = (selectedMonthYear) => {
    const [year, month] = selectedMonthYear.split("-").map(Number);
    setMesActivo(month - 1); // `month` está en formato 1-12
    setYearActivo(year);
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>Mis Atenciones</h1>
      <div>
        <div>
          <MonthSelector onMonthYearChange={handleDateChange} />
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
