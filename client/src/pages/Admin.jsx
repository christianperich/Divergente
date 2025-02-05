import MonthSelector from "../components/MonthSelector";
import { useEffect, useState } from "react";
import axios from "axios";
import ResumenMensual from "../components/ResumenMensual";
import ResumenMensualProfesionales from "../components/ResumenMensualProfesionales";
import TodasLasAtencionesAdmin from "../components/TodasLasAtencionesAdmin";

export default function Admin() {
  const [sesiones, setSesiones] = useState([]);
  const [mesActivo, setMesActivo] = useState(() => {
    const storedDate = localStorage.getItem("selectedMonthYear");
    return storedDate
      ? parseInt(storedDate.split("-")[1])
      : new Date().getMonth();
  });
  const [yearActivo, setYearActivo] = useState(() => {
    const storedDate = localStorage.getItem("selectedMonthYear");
    return storedDate
      ? parseInt(storedDate.split("-")[0])
      : new Date().getFullYear();
  });
  const [adminVisualization, setAdminVisualization] = useState(true);

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(
          `/api/sesiones?month=${mesActivo - 1}&year=${yearActivo}`
        );
        setSesiones(response.data);
      } catch (err) {
        console.error("Error al obtener las sesiones:", err);
      }
    };

    fetchSesiones();
  }, [mesActivo, yearActivo, adminVisualization]);

  console.log(sesiones);
  const handleDateChange = (selectedMonthYear) => {
    const [year, month] = selectedMonthYear.split("-").map(Number);
    setMesActivo(month);
    setYearActivo(year);
  };

  const updateSesiones = (sorted) => {
    setSesiones(sorted);
  };

  const updateAdminVisualization = () => {
    setAdminVisualization(!adminVisualization);
  };

  return (
    <>
      <MonthSelector onMonthYearChange={handleDateChange} />

      <TodasLasAtencionesAdmin
        sesiones={sesiones}
        updateSesiones={updateSesiones}
        updateAdminVisualization={updateAdminVisualization}
      />

      <ResumenMensual sesiones={sesiones} />

      <ResumenMensualProfesionales sesiones={sesiones} />
    </>
  );
}
