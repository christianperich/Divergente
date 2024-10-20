import { MdOutlineDeleteForever } from "react-icons/md";
import axios from "axios";

export default function TodasLasAtenciones({ sesiones, onDelete }) {
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

  return (
    <div className="card">
      <div>
        <h3>Sesiones realizadas</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Estado de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion._id}>
                <td>{new Date(sesion.fecha).toISOString().split("T")[0]}</td>
                <td>
                  {
                    <a href={`/user-info/${sesion.usuario._id}`}>
                      {sesion.usuario.nombre}
                    </a>
                  }
                </td>
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
