import "../assets/css/forms.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != password2) {
      setErrMsg("Las contraseñas no coinciden");
      return;
    } else if (password.length < 6) {
      setErrMsg("La contraseña debe contener al menos 6 caracteres");
    }

    const nuevoProfesional = {
      nombre,
      email,
      password,
    };

    try {
      const response = await axios.post("api/register", nuevoProfesional);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrMsg("El correo electrónico ya está registrado.");
      } else {
        console.error("Error en el registro:", err);
        setErrMsg(
          "Ocurrió un error al registrarse. Por favor, inténtelo de nuevo."
        );
      }
    }
  };

  return (
    <>
      <div className="card">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-info">
            <label htmlFor="username">Nombre: </label>
            <input
              type="text"
              name="username"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
            />
          </div>

          <div className="form-info">
            <label htmlFor="email">Correo Electrónico: </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-info">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="form-info">
            <label htmlFor="password">Repite Contraseña</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              required
            />
          </div>
          <p className="errMsg">{errMsg}</p>

          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya te registraste?{" "}
          <span>
            <a href="/register">Inicia sesión</a>
          </span>
        </p>
      </div>
    </>
  );
}
