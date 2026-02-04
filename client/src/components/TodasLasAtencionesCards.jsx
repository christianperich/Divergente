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
      "¿Estás seguro de que deseas eliminar esta sesión?",
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/sesiones/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error al eliminar la sesión:", error);
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Atención":
        return "#3498db";
      case "Evaluación":
        return "#9b59b6";
      case "Aseo":
        return "#2ecc71";
      case "Administración":
        return "#f1c40f";
      default:
        return "#3498db";
    }
  };

  return (
    <div className="atencionesCard-compact">
      <div className="compact-header">
        <h3>Atenciones realizadas ({sesiones.length})</h3>
        <select
          name="sort"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
          className="compact-sort"
        >
          <option value="">Ordenar por...</option>
          <option value="fecha">Ordenar por fecha</option>
          <option value="usuario">Ordenar por usuario</option>
        </select>
      </div>

      <div className="atencionCard-list">
        {sesiones.length === 0 ? (
          <div className="no-sesiones">No hay atenciones registradas</div>
        ) : (
          sesiones.map((sesion) => (
            <div key={sesion._id} className="atencionCard-row">
              <div
                className="tipo-badge"
                style={{ backgroundColor: getTipoColor(sesion.tipo) }}
                title={sesion.tipo}
              >
                {sesion.tipo.charAt(0)}
              </div>

              <div className="row-info">
                <div className="row-main">
                  <span className="fecha">
                    {sesion.fecha.split("T")[0].split("-").reverse().join("/")}
                  </span>
                  <span className="usuario">{sesion.usuario.nombre}</span>
                  <span className="tipo-text">{sesion.tipo}</span>
                </div>

                <div className="row-status">
                  <span
                    className={`status-badge ${
                      sesion.pagadoProfesional ? "paid" : "pending"
                    }`}
                  >
                    {sesion.pagadoProfesional ? "✓ Pagado" : "○ Pendiente"}
                  </span>
                  <span
                    className={`boleta-badge ${sesion.boleta ? "yes" : "no"}`}
                  >
                    {sesion.boleta ? "Boleta" : "Sin boleta"}
                  </span>
                </div>
              </div>

              <button
                className="btn-delete-compact"
                onClick={() => handleDelete(sesion._id)}
                title="Eliminar sesión"
              >
                <MdOutlineDeleteForever />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodasLasAtencionesCards;
