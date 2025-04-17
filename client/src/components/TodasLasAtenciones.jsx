import { MdOutlineDeleteForever } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";

export default function TodasLasAtenciones({
  sesiones: initialSesiones,
  onDelete,
}) {
  const [sesiones, setSesiones] = useState(initialSesiones);

  useEffect(() => {
    setSesiones(initialSesiones); // Actualizar estado si cambia la prop
  }, [initialSesiones]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta sesión?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/sesiones/${id}`);
        onDelete();
      } catch (error) {
        console.error("Error al eliminar la sesión:", error);
      }
    }
  };

  const handleSort = (criterio) => {
    const sortedSesiones = [...sesiones].sort((a, b) => {
      if (criterio === "fecha") {
        return new Date(a.fecha) - new Date(b.fecha);
      } else if (criterio === "usuario") {
        return a.usuario.nombre.localeCompare(b.usuario.nombre);
      } else if (criterio === "tipoDeSesion") {
        return a.tipo.localeCompare(b.tipo);
      } else if (criterio === "estadoDePago") {
        return a.pagadoProfesional - b.pagadoProfesional;
      } else {
        return 0;
      }
    });
    setSesiones(sortedSesiones);
  };

  return (
    <div className="card">
      <div>
        <h3>Sesiones realizadas</h3>
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
                Estado de Pago{" "}
                <a onClick={() => handleSort("estadoDePago")}>
                  <FaSort />
                </a>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion._id}>
                <td>
                  {new Date(sesion.fecha)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </td>
                <td>
                  {
                    <a href={`/user-info/${sesion.usuario._id}`}>
                      {sesion.usuario.nombre}
                    </a>
                  }
                </td>
                <td>{sesion.tipo}</td>
                <td>{sesion.pagadoProfesional ? "Pagado" : "Pendiente"}</td>
                <td className="actions">
                  <a
                    className="action"
                    onClick={() => handleDelete(sesion._id)}
                  >
                    <MdOutlineDeleteForever />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sesiones.length === 0 && <p>No hay sesiones ingresadas.</p>}
      </div>
    </div>
  );
}
