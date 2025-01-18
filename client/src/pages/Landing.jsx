import fondo from "../assets/img/fondo.jpg";
import afiche_curso from "../assets/img/afiche-curso-online.png";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Landing() {
  return (
    <>
      <div className="fondo">
        <img className="fondo-img" src={fondo} alt="" />
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
        <img className="imagen-curso" src={afiche_curso} alt="" />
        <a href="/curso-online" className="btn" style={{ marginTop: "20px" }}>
          Más información
        </a>
      </div>
    </>
  );
}
