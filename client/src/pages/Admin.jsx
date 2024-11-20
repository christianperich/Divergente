import MonthSelector from "../components/MonthSelector";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [sesiones, setSesiones] = useState([]);
  const [mesActivo, setMesActivo] = useState(new Date().getMonth());
  const [yearActivo, setYearActivo] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        if (isNaN(mesActivo) || isNaN(yearActivo)) {
          console.error("Error: Parámetros inválidos al hacer la solicitud.");
          return;
        }
        const response = await axios.get(
          `/api/sesiones/?month=${mesActivo}&year=${yearActivo}`
        );

        setSesiones(response.data);
      } catch (err) {
        console.error("Error al obtener las sesiones:", err);
      }
    };
    fetchSesiones();
  }, [mesActivo, yearActivo]);

  const handleDateChange = async (month, year) => {
    setMesActivo(month);
    setYearActivo(year);
  };

  const handlePagoADivergente = async (id, estaPagado) => {
    try {
      if (estaPagado) {
        await axios.put(`/api/sesiones/${id}/`, { pagadoDivergente: false });
        console.log("Pago actualizado");
        return;
      } else {
        await axios.put(`/api/sesiones/${id}/`, { pagadoDivergente: true });
        console.log("Pago actualizado");
      }
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  const handlePagoAProfesional = async (id, estaPagado) => {
    try {
      if (estaPagado) {
        await axios.put(`/api/sesiones/${id}/`, { pagadoProfesional: false });
        console.log("Pago actualizado");
        return;
      } else {
        await axios.put(`/api/sesiones/${id}/`, { pagadoProfesional: true });
        console.log("Pago actualizado");
      }
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  return (
    <>
      <MonthSelector onDateChange={handleDateChange} />

      <div className="card">
        <h1>
          Atenciones {mesActivo + 1}/{yearActivo}
        </h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Profesional</th>
              <th>Usuario</th>
              <th>Tipo de sesión</th>
              <th>Pagado a Chris</th>
              <th>Pagado a Prof.</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion._id}>
                <td>{new Date(sesion.fecha).toISOString().split("T")[0]}</td>
                <td>{sesion.profesional.nombre}</td>
                <td>{sesion.usuario.nombre}</td>
                <td>{sesion.tipo}</td>
                <td>
                  {sesion.pagadoDivergente ? (
                    <a
                      className="btn btn-success"
                      onClick={() =>
                        handlePagoADivergente(
                          sesion._id,
                          sesion.pagadoDivergente
                        )
                      }
                    >
                      Pagado
                    </a>
                  ) : (
                    <a
                      className="btn btn-warning"
                      onClick={() =>
                        handlePagoADivergente(
                          sesion._id,
                          sesion.pagadoDivergente
                        )
                      }
                    >
                      Pendiente
                    </a>
                  )}
                </td>
                <td>
                  {sesion.pagadoProfesional ? (
                    <a
                      className="btn btn-success"
                      onClick={() =>
                        handlePagoAProfesional(
                          sesion._id,
                          sesion.pagadoProfesional
                        )
                      }
                    >
                      Pagado
                    </a>
                  ) : (
                    <a
                      className="btn btn-warning"
                      onClick={() =>
                        handlePagoAProfesional(
                          sesion._id,
                          sesion.pagadoProfesional
                        )
                      }
                    >
                      Pendiente
                    </a>
                  )}
                </td>
                <td className="actions">
                  <a
                    className="action"
                    onClick={() => handleDelete(sesion._id)}
                  ></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
