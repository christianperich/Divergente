import MonthSelector from "../components/MonthSelector";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSort } from "react-icons/fa";
import ResumenMensual from "../components/ResumenMensual";

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
  }, [mesActivo, yearActivo]);

  const handleDateChange = (selectedMonthYear) => {
    const [year, month] = selectedMonthYear.split("-").map(Number);
    setMesActivo(month);
    setYearActivo(year);
    console.log(month);
  };

  const handleSort = (criterio) => {
    const sortedSesiones = [...sesiones].sort((a, b) => {
      if (criterio === "fecha") {
        return new Date(a.fecha) - new Date(b.fecha);
      } else if (criterio === "profesional") {
        return a.profesional.nombre.localeCompare(b.profesional.nombre);
      } else if (criterio === "usuario") {
        return a.usuario.nombre.localeCompare(b.usuario.nombre);
      } else if (criterio === "tipoDeSesion") {
        return a.tipo.localeCompare(b.tipo);
      } else if (criterio === "pagadoChris") {
        return a.pagadoDivergente - b.pagadoDivergente;
      } else if (criterio === "pagadoProfesional") {
        return a.pagadoProfesional - b.pagadoProfesional;
      } else if (criterio === "boleta") {
        return a.boleta - b.boleta;
      } else {
        return 0;
      }
    });
    setSesiones(sortedSesiones);
  };

  const handlePagoADivergente = async (id, estaPagado) => {
    try {
      const updatedPago = !estaPagado; // Invertimos el estado actual
      await axios.put(`/api/sesiones/${id}/`, {
        pagadoDivergente: updatedPago,
      });

      // Actualizamos el estado local
      setSesiones((prevSesiones) =>
        prevSesiones.map((sesion) =>
          sesion._id === id
            ? { ...sesion, pagadoDivergente: updatedPago }
            : sesion
        )
      );
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  const handlePagoAProfesional = async (id, estaPagado) => {
    try {
      const updatedPago = !estaPagado; // Invertimos el estado actual
      await axios.put(`/api/sesiones/${id}/`, {
        pagadoProfesional: updatedPago,
      });

      // Actualizamos el estado local
      setSesiones((prevSesiones) =>
        prevSesiones.map((sesion) =>
          sesion._id === id
            ? { ...sesion, pagadoProfesional: updatedPago }
            : sesion
        )
      );
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  return (
    <>
      <MonthSelector onMonthYearChange={handleDateChange} />

      <div className="card">
        <h1>Atenciones del mes</h1>
        <table>
          <thead>
            <tr>
              <th>
                Fecha{" "}
                <a onClick={() => handleSort("fecha")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Profesional{" "}
                <a onClick={() => handleSort("profesional")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Usuario{" "}
                <a onClick={() => handleSort("usuario")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Tipo de sesión{" "}
                <a onClick={() => handleSort("tipoDeSesion")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Boleta{" "}
                <a onClick={() => handleSort("boleta")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Pagado a Chris{" "}
                <a onClick={() => handleSort("pagadoChris")}>
                  <FaSort />
                </a>
              </th>
              <th>
                Pagado a Prof.{" "}
                <a onClick={() => handleSort("pagadoProfesional")}>
                  <FaSort />
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion._id}>
                <td>{new Date(sesion.fecha).toISOString().split("T")[0]}</td>
                <td>{sesion.profesional.nombre}</td>
                <td>
                  {
                    <a href={`/user-info/${sesion.usuario._id}`}>
                      {sesion.usuario.nombre}
                    </a>
                  }
                </td>
                <td>{sesion.tipo}</td>
                <td>{sesion.boleta ? "Si" : "No"}</td>
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

      <ResumenMensual sesiones={sesiones} />
    </>
  );
}
