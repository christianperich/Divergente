function CoregulacionYEducacionEmocional() {
  return (
    <>
      <div className="card curso-online" style={{ textAlign: "justify" }}>
        <h3>Curso Online:</h3>
        <h1>
          Estrategias de corregulación y educación emocional para personas
          dentro del espectro del autismo.
        </h1>
        <div style={{ textAlign: "center" }}>
          <img
            className="imagen-curso"
            src="/img/curso-corregulacion.jpg"
            alt=""
            style={{ marginBottom: "40px" }}
          />
        </div>
        <h2>Objetivo General:</h2>
        <p style={{ marginBottom: "70px", fontSize: "1.3rem" }}>
          Promover el desarrollo de habilidades de educación emocional y
          estrategias de corregulación en personas dentro del espectro del
          autismo, con el fin de mejorar su bienestar emocional y su capacidad
          para gestionar sus respuestas y relaciones sociales.
        </p>
        <h2 style={{ marginTop: "40px" }}>Aprendizajes esperados:</h2>
        <ul
          style={{ marginBottom: "70px", padding: "30px", fontSize: "1.1rem" }}
        >
          <li>
            Definir y reconocer las situaciones desafiantes en contextos
            educativos y su impacto en el aprendizaje.
          </li>
          <li>
            Explicar los conceptos de regulación, desregulación y co regulación
            en el desarrollo socioemocional de estudiantes autistas.
          </li>
          <li>
            Comprender los principios neurocientíficos básicos relacionados con
            la regulación emocional y conductual.
          </li>
        </ul>

        <section className="bloque-clases">
          <img src="/img/clase1.png" alt="Clase 1" className="clase" />

          <img src="/img/clase2.png" alt="Clase 2" className="clase" />
        </section>

        <section className="bloque-clases">
          <a
            href="https://drive.google.com/file/d/1gzvX0n6j26idcCYGjFnv203MMW3_rT5y/view?usp=sharing"
            className="btn"
          >
            Ver el programa completo
          </a>
        </section>
        <h1>Relatores</h1>
        <div className="relatores-card">
          <div className="relator-card">
            <img
              src="/img/arleen.jpg"
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

          <div className="relator-card">
            <img
              src="/img/jose.jpg"
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
        </div>

        <div className="valor">
          <p style={{ marginBottom: "70px", fontSize: "1.3rem" }}>
            El costo total del curso, que incluye las dos jornadas, es de
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {" "}
              $40.000 por persona.
            </span>{" "}
            Alternativamente, quienes deseen participar en jornadas individuales
            pueden hacerlo por un valor de $25.000 cada una.
          </p>
          <p style={{ fontSize: "1.3rem", marginBottom: "70px" }}>
            Para inscribirte debes llenar el formulario de inscripción y enviar
            el comprobante de transferencia a fundaciondivergente@gmail.com
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            className="btn"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfznB_Vcj4_MVgVdY5qREDNRXZ5Qv1FPXmvCXbTqM0x5AKutg/viewform?usp=sharing"
            target="_blank"
          >
            Ir al formulario de inscripción
          </a>
        </div>

        <div className="datos-transferencia">
          <h2>Datos de transferencia</h2>
          Christian Adrián Perich Lara <br /> RUT: 15.309.850-6 <br /> Banco:
          BCI <br /> Cuenta Vista 777015309850 <br />{" "}
          fundaciondivergente@gmail.com
        </div>
      </div>
    </>
  );
}

export default CoregulacionYEducacionEmocional;
