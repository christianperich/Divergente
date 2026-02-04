import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "../components/UserInfo";

export default function NuevoUsuario({ user }) {
  const [newUserNombre, setNewUserName] = useState("");
  const [newUserApoderado, setNewUserApoderado] = useState("");
  const [newTarifaDiferenciada, setNewTarifaDiferenciada] = useState(false);
  const [newMontoProfesional, setNewMontoProfesional] = useState(12500);
  const [newMontoDivergente, setNewMontoDivergente] = useState(5000);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nombre = newUserNombre;
    const apoderado = newUserApoderado;
    const tarifaDiferenciada = newTarifaDiferenciada;
    const montoProfesional = newMontoProfesional;
    const montoDivergente = newMontoDivergente;

    const nuevoUsuario = {
      nombre,
      apoderado,
      tarifaDiferenciada,
      montoProfesional,
      montoDivergente,
    };

    try {
      const response = await axios.post("/api/agregar-usuario", nuevoUsuario);
      console.log(response.data);
      setMsg(response.data);
      setNewUserName("");
      setNewUserApoderado("");
      setNewTarifaDiferenciada(false);
      setNewMontoProfesional(12500);
      setNewMontoDivergente(5000);
    } catch (error) {
      console.error(error);
      setMsg("Error al agregar usuario. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <UserInfo user={user} />
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
          <div className="form-info">
            <label>
              <input
                type="checkbox"
                checked={newTarifaDiferenciada}
                onChange={(e) => setNewTarifaDiferenciada(e.target.checked)}
              />
              Tarifa diferenciada
            </label>
          </div>
          {newTarifaDiferenciada && (
            <>
              <label htmlFor="montoProfesional">Monto para Profesional</label>
              <div className="form-info">
                <input
                  type="number"
                  name="montoProfesional"
                  placeholder="Monto Profesional"
                  value={newMontoProfesional}
                  onChange={(e) => setNewMontoProfesional(e.target.value)}
                  required
                />
              </div>
              <label htmlFor="montoDivergente">Monto para Divergente</label>
              <div className="form-info">
                <input
                  type="number"
                  name="montoDivergente"
                  placeholder="Monto Divergente"
                  value={newMontoDivergente}
                  onChange={(e) => setNewMontoDivergente(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button>Agregar</button>
        </form>
        {msg && <p className="msg">{msg}</p>}
      </div>
    </>
  );
}
