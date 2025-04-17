import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user-info", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
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
          <img src="/img/divergente.png" alt="" className="logo" />
        </a>
        <div className="menu-center">
          <a href="/">Inicio</a>
          <a href="/quienes-somos">Quiénes somos</a>
        </div>
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
