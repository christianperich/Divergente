import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonthSelector from "../components/MonthSelector";
import TodasLasAtenciones from "../components/TodasLasAtenciones";
import UserInfo from "../components/UserInfo";

export default function PatientInfo({ user }) {
  const [nombre, setNombre] = useState("");
  const [apoderado, setApoderado] = useState("");
  const [sesiones, setSesiones] = useState([]);
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [yearActivo, setYearActivo] = useState(new Date().getFullYear());

  const { id } = useParams();

  const valorSinBoleta = 28000;
  const valorConBoleta = 32500;

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

  const handleDateChange = async (month, year) => {
    setMesActivo(month);
    setYearActivo(year);
    const fetchSesiones = await axios.get(
      `/api/user-info/${id}?month=${mesActivo}&year=${yearActivo}`
    );

    setSesiones(fetchSesiones.data);
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>{nombre}</h1>
      <MonthSelector onDateChange={handleDateChange} />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Profesional</th>
              <th>Tipo de atención</th>
              <th>Pagado a Divergente</th>
              <th>Pagado a Profesional</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr>
                <td>{new Date(sesion.fecha).toISOString().split("T")[0]}</td>
                <td>{sesion.usuario.nombre}</td>
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
        <h2>${totalAtenciones.toLocaleString()}</h2>
        <h3>Persona que paga:</h3>
        <h2>{apoderado}</h2>
      </div>
    </>
  );
}
