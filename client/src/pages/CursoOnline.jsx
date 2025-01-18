import afiche from "../assets/img/afiche-curso-online.png";
import jose from "../assets/img/jose.jpg";
import arleen from "../assets/img/arleen.png";
import marjorie from "../assets/img/marjorie.jpeg";
import ghilian from "../assets/img/ghilian.png";
import btnPagar from "../assets/img/btn-flow-blanco.png";

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
            href="https://drive.google.com/file/d/1D1kClXASL-aAE-ux7zfkDYwvOrp4if5m/view?usp=sharing"
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
              de un joven dentro del espectro autista.
            </p>
          </div>
          <div>
            <img
              src={arleen}
              alt="arleen"
              style={{ width: "200px", borderRadius: "100%" }}
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
              style={{ width: "200px", borderRadius: "100%" }}
            />
            <h2>Marjorie Barrera</h2>
            <p>
              Educadora Diferencial, Diplomada en inclusión educativa y madre de
              una joven dentro del espectro autista.
            </p>
          </div>
        </div>
        <h1>Valor</h1>
        <p style={{ marginBottom: "70px" }}>
          El costo total del curso, que incluye las cuatro jornadas, es de
          $100.000 por persona. Alternativamente, quienes deseen participar en
          jornadas individuales pueden hacerlo por un valor de $30.000 cada una.
        </p>
        <div style={{ textAlign: "center" }}>
          <a className="btn btn-big" href="/inscripcion">
            Ir al formulario de inscripción
          </a>
        </div>

        <h1 style={{ marginTop: "70px" }}>Pagar inscripción</h1>
        <p>
          Una vez que hayas enviado el formulario de inscripción, debes pagar la
          cantidad de clases seleccionadas.
        </p>

        <br />

        <div
          className="card payments"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <h3 style={{ alignItems: "center" }}>
            Seleccioné todas las clases: $100.000
          </h3>
          <a
            href="https://www.flow.cl/btn.php?token=e982c861213756fb0d35761730ee380710f23f0f"
            target="_blank"
          >
            <img src={btnPagar} alt="" />
          </a>
        </div>

        <div
          className="card payments"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <h3 style={{ alignItems: "center" }}>
            Seleccioné solo 3 clases: $90.000
          </h3>
          <a
            href="https://www.flow.cl/btn.php?token=w1e5fd73da55e3a2f1639f867e7b321ffac7733f"
            target="_blank"
          >
            <img src={btnPagar} alt="" />
          </a>
        </div>

        <div
          className="card payments"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <h3 style={{ alignItems: "center" }}>
            Seleccioné solo 2 clases: $60.000
          </h3>
          <a
            href="https://www.flow.cl/btn.php?token=cb3d870b703f4aaf0775bd0003f6c918d6f2fc1a"
            target="_blank"
          >
            <img src={btnPagar} alt="" />
          </a>
        </div>

        <div
          className="card payments"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <h3 style={{ alignItems: "center" }}>
            Seleccioné solo 1 clase: $30.000
          </h3>
          <a
            href="https://www.flow.cl/btn.php?token=s829d9163ddbed8834beff8236418d574b461cbd"
            target="_blank"
          >
            <img src={btnPagar} alt="" />
          </a>
        </div>

        <p style={{ marginTop: "70px" }}>
          Te esperamos! Para más información, escríbenos a
          <a href="http://wa.me/56959282351" target="_blank">
            {" "}
            +56 9 5928 2351
          </a>
        </p>
      </div>
    </>
  );
}

export default CursoOnline;
