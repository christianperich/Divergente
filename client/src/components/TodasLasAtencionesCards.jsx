import { MdOutlineDeleteForever } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

function TodasLasAtencionesCards({ sesiones: initialSesiones, onDelete }) {
  const [sesiones, setSesiones] = useState(initialSesiones);
  const [criterioOrden, setCriterioOrden] = useState(null);

  const ordenarSesiones = (criterio, datos) => {
    const sorted = [...datos].sort((a, b) => {
      if (criterio === "fecha") {
        return new Date(a.fecha) - new Date(b.fecha);
      } else if (criterio === "usuario") {
        return a.usuario.nombre.localeCompare(b.usuario.nombre);
      } else {
        return 0;
      }
    });
    setSesiones(sorted);
  };

  const handleSort = (criterio) => {
    setCriterioOrden(criterio);
    ordenarSesiones(criterio, sesiones);
  };

  useEffect(() => {
    setSesiones(initialSesiones);
    if (criterioOrden) {
      ordenarSesiones(criterioOrden, initialSesiones);
    }
  }, [initialSesiones]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta sesión?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/sesiones/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error al eliminar la sesión:", error);
    }
  };

  return (
    <>
      <div className="atencionesCard">
        <select
          name="sort"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Ordenar por...</option>
          <option value="fecha">Ordenar por fecha</option>
          <option value="usuario">Ordenar por usuario</option>
        </select>
        {sesiones.map((sesion) => (
          <div key={sesion._id}>
            <div className="atencionCard">
              <p
                style={{
                  backgroundColor: "rgb(226, 117, 38)",
                  width: "100%",
                  color: "white",
                  marginBottom: "7px",
                }}
              >
                {sesion.fecha.split("T")[0].split("-").reverse().join("/")} -{" "}
                <strong>{sesion.usuario.nombre}</strong>
              </p>
              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <div>
                  <p>Tipo de sesión: {sesion.tipo}</p>
                  <p>
                    Estado de pago:{" "}
                    {sesion.pagadoProfesional ? (
                      <span style={{ color: "rgb(10, 161, 8)" }}>Pagado</span>
                    ) : (
                      <span style={{ color: "rgb(255, 119, 0)" }}>
                        Pendiente
                      </span>
                    )}
                  </p>
                  <p>Con boleta: {sesion.boleta ? "Sí" : "No"}</p>
                </div>
                <div>
                  <a onClick={() => handleDelete(sesion._id)}>Eliminar</a>
                  <br />
                  <a href="">Editar</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodasLasAtencionesCards;
