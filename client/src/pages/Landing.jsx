import { FaPeopleGroup } from "react-icons/fa6";
import UserInfo from "../components/UserInfo";
import { useEffect, useState } from "react";

export default function Landing() {
  const [user, setUser] = useState(null); // guarda la info del usuario
  const [loading, setLoading] = useState(true); // para mostrar "Cargando..." si quieres

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user-info", {
          credentials: "include", // ¡Importante para enviar cookies de sesión!
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      {loading ? <h1>Cargando...</h1> : user ? <UserInfo user={user} /> : null}

      <div className="fondo">
        <img className="fondo-img" src="/img/fondo.jpg" alt="" />
        <h1 className="fondo-title">
          Evaluaciones y atenciones en{" "}
          <span className="remark">Espectro del Autismo</span> realizadas por un
          equipo multidisciplinario.
        </h1>
      </div>

      <div className="icons-container">
        <a className="icon-container" href="/quienes-somos">
          <FaPeopleGroup className="icon" />
          <h3>Quiénes somos</h3>
        </a>
      </div>

      <h2 style={{ marginTop: "50px", fontSize: "2rem" }}>Nuestros cursos</h2>
      <p style={{ margin: "0 20px", fontSize: "1.3rem" }}>
        Aquí encontrarás los cursos online que realizamos para entregarte
        herramientas prácticas, contenidos actualizados y una experiencia
        educativa dinámica.
      </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          className="imagen-curso"
          src="/img/corregulacion.jpg"
          alt="curso-online"
          style={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
        />
        <a
          href="/curso-online/coregulacion-y-educacion-emocional"
          className="btn"
          style={{ marginTop: "20px" }}
        >
          Más información
        </a>
      </div>
    </>
  );
}
