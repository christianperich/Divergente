function QuienesSomos() {
  return (
    <>
      <div className="card">
        <h1>Quiénes somos</h1>
        <p className="text-large-justified">
          En Centro Divergente trabajamos por la inclusión, el respeto y el
          desarrollo integral de las personas dentro del espectro autista. Somos
          un equipo multidisciplinario comprometido con brindar atención y
          diagnóstico de calidad, adaptado a las necesidades únicas de cada
          persona y su familia.
        </p>
        <p className="text-large-justified">
          Desde su creación, Centro Divergente ha impactado positivamente a
          comunidades educativas, familias y profesionales, aportando
          conocimientos y estrategias que promueven la inclusión y el respeto
          por la diversidad. Además, somos voceros activos en temas relacionados
          con el autismo, fortaleciendo redes y fomentando cambios desde un
          enfoque de derechos.
        </p>
        <p className="text-large-justified">
          <span style={{ fontWeight: "bold" }}>Nuestra misión</span> es ofrecer
          un espacio acogedor y profesional para acompañar a las familias en el
          camino del diagnóstico y la entrega de apoyos, empoderando a cada
          persona para que alcance su máximo potencial.
        </p>
        <p className="text-large-justified">
          <span style={{ fontWeight: "bold" }}>Nuestra visión</span> es ser un
          referente nacional en la atención, diagnóstico y capacitación en torno
          al espectro autista, promoviendo una sociedad más inclusiva y
          consciente.
        </p>
        <h2>Contáctanos al +56 9 5928 2351</h2>

        <div className="galeria-imagenes">
          <img src="/img/centro1.jpg" alt="" />
          <img src="/img/centro2.jpg" alt="" />
        </div>

        <div className="ubicacion">
          <h2>Nuestra ubicación</h2>
          <p>Av. Providencia 2315, Providencia, Región Metropolitana</p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.0934393419834!2d-70.6125592074313!3d-33.42080820481867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf68f0f9bacb%3A0xd0ad951d78a81a84!2sAv.%20Providencia%202315%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1737147383769!5m2!1ses-419!2scl"
            width="400"
            height="250"
            style={{ border: "0", marginTop: "2rem" }}
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default QuienesSomos;
