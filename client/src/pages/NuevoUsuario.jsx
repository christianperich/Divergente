import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/UserInfo";

export default function NuevoUsuario({ user }) {
  const [newUserNombre, setNewUserName] = useState("");
  const [newUserApoderado, setNewUserApoderado] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombre = newUserNombre;
    const apoderado = newUserApoderado;

    const nuevoUsuario = {
      nombre,
      apoderado,
    };

    try {
      const response = await axios.post("/api/agregar-usuario", nuevoUsuario);
      console.log(response.data);
      setMsg(response.data);
      setNewUserName("");
      setNewUserApoderado("");
    } catch (error) {
      console.error(error);
      setMsg("Error al agregar usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <UserInfo user={user} />
      <h1>Agregar un Nuevo Usuario</h1>
      <div className="card">
        <h2>Ingresar un nuevo usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-info">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del atendido(a)"
              value={newUserNombre}
              onChange={(e) => setNewUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-info">
            <input
              type="text"
              name="apoderado"
              placeholder="Nombre del apoderado(a)"
              value={newUserApoderado}
              onChange={(e) => setNewUserApoderado(e.target.value)}
              required
            />
          </div>
          <button>Agregar</button>
        </form>
        {msg && <p className="msg">{msg}</p>}
      </div>
    </>
  );
}
