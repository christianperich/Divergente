import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function NuevaAtencion({ user, onNuevaAtencion, tipoDeSesion }) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [sesion, setSesion] = useState("");
  const [usuarios, setUsuarios] = useState();
  const [boleta, setBoleta] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchData();
  }, []);

  const todosLosUsuarios = usuarios?.map((usuario) => ({
    value: usuario._id,
    label: usuario.nombre,
  }));

  const tipoDeSesiones = tipoDeSesion.map((sesion) => ({
    value: sesion.nombre,
    label: sesion.nombre,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = nombre.value;
    const profesionalId = user._id;
    const tipoDeSesion = sesion.value;
    const fechaUTC = new Date(fecha).toISOString();

    const nuevaSesion = {
      fecha: fechaUTC,
      usuarioId,
      tipoDeSesion,
      profesionalId,
      boleta,
    };

    try {
      const response = await axios.post("/api/agregar-sesion", nuevaSesion);
      setMsg(response.data);
      onNuevaAtencion();
      setNombre("");
      setFecha("");
      setSesion("");
    } catch (err) {
      console.error("Error al ingresar la sesión:", err);
    }
  };

  return (
    <div className="card">
      <h3>Ingresar una nueva sesión</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-info">
          <label htmlFor="nombre">Fecha: </label>
          <input
            type="date"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="form-info">
          <Select
            placeholder="Seleciona un usuario"
            options={todosLosUsuarios}
            value={nombre}
            onChange={(e) => setNombre(e)}
            required
          />
        </div>

        <div className="form-info">
          <Select
            placeholder="Selecciona el tipo de atención"
            options={
              tipoDeSesion[0].nombre === "Evaluación"
                ? tipoDeSesiones
                : tipoDeSesiones
            }
            value={sesion}
            onChange={(e) => setSesion(e)}
            required
          />
        </div>

        <div>
          <label htmlFor="boleta">
            {tipoDeSesion[0].nombre === "Evaluación"
              ? "¿Es adulto?"
              : "Requiere boleta"}{" "}
          </label>
          <input
            className="checkbox"
            type="checkbox"
            onChange={(e) => setBoleta(e.target.checked)}
          />
        </div>

        <br />
        <button>Ingresar</button>
      </form>

      <p className="msg">{msg}</p>
    </div>
  );
}
