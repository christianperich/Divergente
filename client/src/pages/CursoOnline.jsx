import afiche from "../assets/img/afiche-curso-online.png";
import jose from "../assets/img/jose.jpg";
import arleen from "../assets/img/arleen.jpeg";
import marjorie from "../assets/img/marjorie.jpg";
import ghilian from "../assets/img/ghilian.png";
import btnPagar from "../assets/img/btn-flow-blanco.png";
import PayPalButton from "../components/PayPalButton";
import FlowButton from "../components/FlowButton";

function CursoOnline() {
  return (
    <>
      <div className="card curso-online" style={{ textAlign: "justify" }}>
        <h3>Curso Online:</h3>
        <h1>
          Estrategias de abordaje de las necesidades educativas y
          desregulaciones emocionales de personas dentro del espectro del
          autismo
        </h1>
        <div style={{ textAlign: "center" }}>
          <img
            className="imagen-curso"
            src={afiche}
            alt=""
            style={{ marginBottom: "40px" }}
          />
        </div>
        <h2>Competencia a desarrollar:</h2>
        <p>
          Aplicar estrategias de abordaje de las necesidades educativas y las
          desregulaciones emocionales de personas dentro del espectro del
          autismo desde un enfoque de derechos
        </p>
        <h2 style={{ marginTop: "40px" }}>Aprendizajes esperados:</h2>
        <ul style={{ marginBottom: "70px", padding: "30px" }}>
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
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <a
            className="btn btn-big"
            href="https://drive.google.com/file/d/1gRHGUakmG0JI0uyvDImC3fPfTn7Vm5Xy/view?usp=sharing"
            target="_blank"
          >
            Ver el programa
          </a>
        </div>

        <h2 style={{ marginTop: "40px" }}>Relatores:</h2>

        <div className="relatores-card">
          <div>
            <img
              src={jose}
              alt="jose"
              style={{ width: "200px", borderRadius: "100%", rotate: "30deg" }}
            />
            <h2>José Perich</h2>
            <p>
              Licenciado en educación diferencial, activista por los derechos de
              las personas autistas, fundador del Colectivo Autismo Chile, padre
              de un joven dentro del espectro autista. Co-Fundador del Centro
              Divergente.
            </p>
          </div>
          <div>
            <img
              src={arleen}
              alt="arleen"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <h2>Arleen Sorkin</h2>
            <p>
              Docente de lenguaje, activista y autodefensora autista. Conocida
              por sus redes sociales Autistrad, donde comparte contenido
              educativo sobre el autismo y neurodiversidad. Es miembro de AUTE,
              PALAA, Maternidad Autista e Infinitamente.
            </p>
          </div>

          <div>
            <img
              src={ghilian}
              alt="ghilian"
              style={{ width: "200px", borderRadius: "100%" }}
            />
            <h2>Ghilian Navea</h2>
            <p>
              Titulada de Pedagogía en Inglés y Licenciada en Psicología.
              Diplomada en Diagnóstico y tratamiento de Personas en el Espectro
              Autista. Diplomada en Intervención del Abuso Infantil.
            </p>
          </div>
          <div>
            <img
              src={marjorie}
              alt="marjorie"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <h2>Marjorie Barrera</h2>
            <p>
              Educadora Diferencial, Diplomada en inclusión educativa y madre de
              una joven dentro del espectro autista. Co-Fundadora del Centro
              Divergente.
            </p>
          </div>
        </div>
        <div className="valor">
          <h1>Valor</h1>
          <p style={{ marginBottom: "70px" }}>
            El costo total del curso, que incluye las cuatro jornadas, es de
            $100.000 por persona. Alternativamente, quienes deseen participar en
            jornadas individuales pueden hacerlo por un valor de $30.000 cada
            una.
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            className="btn btn-big"
            href="https://docs.google.com/forms/d/e/1FAIpQLSf8RTdwEzjj7a9Hu2WW3Jy_L36j9Nl_isFeJTkcPxBw99WlbA/viewform?usp=sharing"
            target="_blank"
          >
            Ir al formulario de inscripción
          </a>
        </div>

        <h1 style={{ marginTop: "70px" }}>Pagar inscripción</h1>
        <p>
          Una vez que hayas enviado el formulario de inscripción, debes pagar la
          cantidad de clases seleccionadas.
        </p>

        <br />

        <FlowButton />

        <p style={{ marginTop: "70px" }}>
          Te esperamos! Para más información, escríbenos a
          <a href="http://wa.me/56959282351" target="_blank">
            {" "}
            +56 9 5928 2351
          </a>
        </p>
      </div>

      <div className="card">
        <h1>¿No eres de Chile? Puedes pagar con PayPal</h1>
        <PayPalButton />
      </div>
    </>
  );
}

export default CursoOnline;
