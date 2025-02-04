import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

function UpdateSesionForm({ sesionToUpdate, closeModal }) {
  const [profesionales, setProfesionales] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [sesionUpdated, setSesionUpdated] = useState(sesionToUpdate);

  useEffect(() => {
    const fetchProfesionales = async () => {
      try {
        const response = await axios.get("/api/profesionales");
        setProfesionales(response.data);
      } catch (err) {
        console.error("Error al obtener los profesionales:", err);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/api/usuarios");
        setUsuarios(response.data);
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
      }
    };

    fetchProfesionales();
    fetchUsuarios();
  }, []);

  if (!sesionToUpdate) {
    return null;
  }

  const profesionalOptions = profesionales.map((profesional) => ({
    value: profesional._id,
    label: profesional.nombre,
  }));

  const usuarioOptions = usuarios.map((usuario) => ({
    value: usuario._id,
    label: usuario.nombre,
  }));

  const handleChange = (e) => {
    const profesional = profesionales.find(
      (profesional) => profesional._id === e.value
    );
    const usuario = usuarios.find((usuario) => usuario._id === e.value);

    if (profesional) {
      setSesionUpdated({
        ...sesionUpdated,
        profesional: profesional,
      });
    } else if (usuario) {
      setSesionUpdated({
        ...sesionUpdated,
        usuario: usuario,
      });
    } else if (e.target.type === "checkbox") {
      setSesionUpdated({
        ...sesionUpdated,
        boleta: e.target.checked,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/sesiones/${sesionToUpdate._id}`, sesionUpdated);
      closeModal();
    } catch (err) {
      console.error("Error al actualizar la sesión:", err);
    }

    // Actualizar la lista de sesiones
  };

  return (
    <>
      <h1>Editar Sesion</h1>
      <form className="form-info">
        <label>Profesional:</label>
        <Select
          options={profesionalOptions}
          defaultValue={{
            value: sesionToUpdate.profesional._id,
            label: sesionToUpdate.profesional.nombre,
          }}
          onChange={handleChange}
        />

        <label>Usuario:</label>
        <Select
          options={usuarioOptions}
          defaultValue={{
            value: sesionToUpdate.usuario._id,
            label: sesionToUpdate.usuario.nombre,
          }}
          onChange={handleChange}
        />

        <div>
          <label>Requiere boleta:</label>
          <input
            type="checkbox"
            checked={sesionUpdated.boleta}
            onChange={handleChange}
            style={{
              width: "18px",
              height: "18px",
              marginLeft: "10px",
            }}
          />
        </div>

        <div style={{ marginTop: "40px" }}>
          <button type="submit" onClick={handleSubmit}>
            Guardar Cambios
          </button>
          <button
            type="reset"
            onClick={() => {
              closeModal();
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateSesionForm;
