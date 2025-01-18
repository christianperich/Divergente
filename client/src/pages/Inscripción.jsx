import React, { useState } from "react";

function Inscripción() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    clases: [], // Inicializamos como array vacío
  });

  const [valor, setValor] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedClases = [...formData.clases];

    if (checked) {
      updatedClases.push(value); // Agregamos la clase seleccionada
    } else {
      updatedClases = updatedClases.filter((clase) => clase !== value); // Quitamos la clase deseleccionada
    }

    setFormData({ ...formData, clases: updatedClases });
    cantidadDeClases(updatedClases); // Pasamos la lista actualizada de clases
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el correo con EmailJS o tu backend
    alert("Formulario enviado con éxito. ¡Gracias por inscribirte!");
    console.log(formData);
  };

  const cantidadDeClases = (clases) => {
    const cantidad = clases.length;
    console.log(cantidad);

    if (cantidad === 4) {
      setValor(100000); // Precio especial si se seleccionan todas las clases
    } else {
      setValor(cantidad * 30000); // Precio por clase
    }
  };

  return (
    <div className="card">
      <h1>Inscripción</h1>
      <form className="form-info" onSubmit={handleSubmit}>
        <label>
          Nombre completo:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Selecciona clases:
          <div>
            <label>
              <input
                type="checkbox"
                value="clase1"
                checked={formData.clases.includes("clase1")}
                onChange={handleCheckboxChange}
              />
              Clase 1
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="clase2"
                checked={formData.clases.includes("clase2")}
                onChange={handleCheckboxChange}
              />
              Clase 2
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="clase3"
                checked={formData.clases.includes("clase3")}
                onChange={handleCheckboxChange}
              />
              Clase 3
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="clase4"
                checked={formData.clases.includes("clase4")}
                onChange={handleCheckboxChange}
              />
              Clase 4
            </label>
          </div>
        </label>
        <br />
        <button type="submit">Enviar Inscripción</button>
      </form>
      <h2>Total a pagar: ${valor}</h2>
      <a
        href="https://www.flow.cl/uri/X4mc600kz"
        className="btn"
        target="_blank"
      >
        Quiero pagar
      </a>
    </div>
  );
}

export default Inscripción;
