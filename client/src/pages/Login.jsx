import "../assets/css/forms.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("api/login", user);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setErrMsg("Usuario y/o contraseña incorrectos");
    }
  };

  return (
    <>
      <div className="card">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
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
          <p className="errMsg">{errMsg}</p>
          <button type="submit">Ingresar</button>
        </form>
        <p>
          ¿Todavía no te has registrado?{" "}
          <span>
            <a href="/register">Regístrate aquí</a>
          </span>
        </p>
      </div>
    </>
  );
}
