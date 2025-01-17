import afiche from "../assets/img/afiche-curso-online.png";
import jose from "../assets/img/jose.jpg";

function CursoOnline() {
  return (
    <>
      <div className="card" style={{ textAlign: "justify" }}>
        <h3>Curso Online:</h3>
        <h1>
          Estrategias de abordaje de las necesidades educativas y
          desregulaciones emocionales de personas dentro del espectro del
          autismo
        </h1>
        <div style={{ textAlign: "center" }}>
          <img
            src={afiche}
            alt=""
            style={{ width: "400px", marginBottom: "40px" }}
          />
        </div>
        <h2>Competencia a desarrollar:</h2>
        <p>
          Aplicar estrategias de abordaje de las necesidades educativas y las
          desregulaciones emocionales de personas dentro del espectro del
          autismo desde un enfoque de derechos
        </p>
        <h2 style={{ marginTop: "40px" }}>Aprendizajes esperados:</h2>
        <ul>
          <li>
            Comprender los fundamentos teóricos del autismo y su impacto en la
            cognición y conducta.
          </li>
          <li>
            Aplicar estrategias de abordaje de las necesidades educativas de
            estudiantes dentro del espectro del autismo
          </li>
          <li>
            Diseñar planes de acompañamientos que permitan abordar las
            necesidades individuales con estrategias de apoyo emocional,
            regulación conductual y adaptación curricular
          </li>
          <li>
            Aplicar estrategias de adecuación curricular acorde al marco
            normativo y de derechos
          </li>
          <li>
            Implementar adecuaciones de acceso y evaluación que favorezcan el
            aprendizaje inclusivo.{" "}
          </li>
        </ul>

        <div className="jornadas">
          <h2>
            JORNADA 1: Modelo cubo para el entendimiento del autismo. Cognición,
            aprendizaje y conducta.
          </h2>
          <div className="jornada-container">
            <div className="relatores">
              <img className="relator" src={jose} alt="" />
              <h3 className="relator-nombre">José Perich</h3>
              <img className="relator" src={jose} alt="" />
              <h3 className="relator-nombre">José Perich</h3>
            </div>
            <ul>
              <li>
                Manifestación conductual de los diferentes criterios
                diagnósticos en el EA.
              </li>
              <li>Modelo Cubo para el entendimiento del autismo.</li>
              <li>Cognición, aprendizaje y conducta.</li>
              <li>Procesamiento sensorial.</li>
              <li>Regulación y alerta en el contexto educativo.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CursoOnline;
