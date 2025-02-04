import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonthSelector from "../components/MonthSelector";
import { FaSort } from "react-icons/fa";

export default function PatientInfo() {
  const [nombre, setNombre] = useState("");
  const [apoderado, setApoderado] = useState("");
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

  const { id } = useParams();

  const valorSinBoleta = 28000;
  const valorConBoleta = 33000;

  const atencionesConBoleta = sesiones.filter(
    (sesion) => sesion.boleta === true && sesion.tipo === "Atención"
  );

  const atencionesSinBoleta = sesiones.filter(
    (sesion) => sesion.boleta === false && sesion.tipo === "Atención"
  );

  const totalAtenciones =
    atencionesConBoleta.length * valorConBoleta +
    atencionesSinBoleta.length * valorSinBoleta;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUserInfo = await axios.get(`/api/user-data/${id}`);
        const fetchSesiones = await axios.get(
          `/api/user-info/${id}?month=${mesActivo}&year=${yearActivo}`
        );

        setNombre(fetchUserInfo.data.nombre);
        setApoderado(fetchUserInfo.data.apoderado);
        setSesiones(fetchSesiones.data);
      } catch (err) {
        console.error("Error al obtener información del usuario:", err);
      }
    };

    fetchData();
  }, [id, mesActivo, yearActivo]);

  const handleDateChange = (selectedMonthYear) => {
    const [year, month] = selectedMonthYear.split("-").map(Number);
    setMesActivo(month - 1); // `month` está en formato 1-12
    setYearActivo(year);
  };

  const handleSort = (criterio) => {
    const sortedSesiones = [...sesiones].sort((a, b) => {
      if (criterio === "fecha") {
        return new Date(a.fecha) - new Date(b.fecha);
      } else if (criterio === "profesional") {
        return a.profesional.nombre.localeCompare(b.profesional.nombre);
      } else {
        return 0;
      }
    });
    setSesiones(sortedSesiones);
  };

  return (
    <>
      <div className="card">
        <h1>{nombre}</h1>
        <h3>Resumen de las atenciones en el mes seleccionado</h3>
      </div>

      <MonthSelector onMonthYearChange={handleDateChange} />
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>
                Fecha{" "}
                <a onClick={() => handleSort("fecha")}>
                  <FaSort />
                </a>
              </th>
              <th>Usuario</th>
              <th>
                Profesional{" "}
                <a onClick={() => handleSort("profesional")}>
                  <FaSort />
                </a>
              </th>
              <th>Tipo de atención</th>
              <th>Pagado a Divergente</th>
              <th>Pagado a Profesional</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion._id}>
                <td>{new Date(sesion.fecha).toISOString().split("T")[0]}</td>
                <td>
                  <a href={"/user-info/" + sesion.usuario._id}>
                    {sesion.usuario.nombre}
                  </a>
                </td>
                <td>{sesion.profesional.nombre}</td>
                <td>{sesion.tipo}</td>
                <td>{sesion.pagadoDivergente ? "Si" : "No"}</td>
                <td>{sesion.pagadoProfesional ? "Si" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3>Total a pagar</h3>
        <p>(Este monto solo considera las atenciones.)</p>
        <h2>${totalAtenciones.toLocaleString()}</h2>

        <h3>Persona que paga:</h3>
        <h2>{apoderado}</h2>
      </div>
    </>
  );
}
