import logo from "../assets/img/divergente.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user-info");
        setIsAuthenticated(true);
      } catch (err) {
        "Error al intentar verificar si el usuario está autenticado", err;
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = async () => {
    setIsAuthenticated(false);
    const response = await axios.get("/api/logout");
    navigate("/login");
  };
  return (
    <>
      <nav>
        <a href="/">
          <img src={logo} alt="" className="logo" />
        </a>
        <div className="menu">
          {isAuthenticated ? (
            <>
              <a className="link" onClick={handleClick}>
                Cerrar Sesión
              </a>
            </>
          ) : (
            <>
              <a href="/login">Iniciar Sesión</a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
