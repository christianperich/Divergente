import React from "react";

import { FaSort } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import axios from "axios";

import Modal from "react-modal";
import UpdateSesionForm from "./UpdateSesionForm";

Modal.setAppElement("#root");

import { useState } from "react";

function TodasLasAtencionesAdmin({
  sesiones,
  updateSesiones,
  updateAdminVisualization,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sesionToUpdate, setSesionToUpdate] = useState(null);

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
    updateSesiones(sortedSesiones);
  };

  const handlePagoADivergente = async (id, estaPagado) => {
    try {
      const updatedPago = !estaPagado;
      await axios.put(`/api/sesiones/${id}/`, {
        pagadoDivergente: updatedPago,
      });

      const updatedSesiones = (prevSesiones) =>
        prevSesiones.map((sesion) =>
          sesion._id === id
            ? { ...sesion, pagadoDivergente: updatedPago }
            : sesion
        );

      updateSesiones(updatedSesiones);
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  const handlePagoAProfesional = async (id, estaPagado) => {
    try {
      const updatedPago = !estaPagado;
      await axios.put(`/api/sesiones/${id}/`, {
        pagadoProfesional: updatedPago,
      });

      const updatedSesiones = (prevSesiones) =>
        prevSesiones.map((sesion) =>
          sesion._id === id
            ? { ...sesion, pagadoProfesional: updatedPago }
            : sesion
        );

      updateSesiones(updatedSesiones);
    } catch (err) {
      console.error("Error al actualizar el pago:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta sesión?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/api/sesiones/${id}`);
        const updatedSesiones = (prevSesiones) =>
          prevSesiones.filter((sesion) => sesion._id !== id);

        updateSesiones(updatedSesiones);
      } catch (err) {
        console.error("Error al eliminar la sesión:", err);
      }
    }
  };

  const handleUpdate = (id) => {
    const sesion = sesiones.find((sesion) => sesion._id === id);
    setSesionToUpdate(sesion);
    setModalIsOpen(true);
  };

  const closeModal = async () => {
    setModalIsOpen(false);
    setSesionToUpdate(null);

    updateAdminVisualization();
  };

  return (
    <section className="card">
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
            <th>Acciones</th>
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
                      handlePagoADivergente(sesion._id, sesion.pagadoDivergente)
                    }
                  >
                    Pagado
                  </a>
                ) : (
                  <a
                    className="btn btn-warning"
                    onClick={() =>
                      handlePagoADivergente(sesion._id, sesion.pagadoDivergente)
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
                <a className="action" onClick={() => handleDelete(sesion._id)}>
                  <MdOutlineDeleteForever />
                </a>
                <a className="action" onClick={() => handleUpdate(sesion._id)}>
                  <AiOutlineEdit />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <UpdateSesionForm
          sesionToUpdate={sesionToUpdate}
          closeModal={closeModal}
        />
      </Modal>
    </section>
  );
}

export default TodasLasAtencionesAdmin;
