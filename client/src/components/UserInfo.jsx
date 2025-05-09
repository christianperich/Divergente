import "../assets/css/userInfo.css";

export default function UserInfo({ user }) {
  if (!user) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <div className="user-info">
        <img className="profile-img" src="/img/user-icon.png" alt="" />
        <h2>{user.nombre}</h2>
        <div className="user-links">
          <a href="/">Inicio</a>
          {user.role === "admin" ||
            (user.role === "profesional" && (
              <>
                <a href="/dashboard">Mis Atenciones</a>
                <a href="/evaluaciones">Mis Evaluaciones</a>
              </>
            ))}

          {user.role === "admin" && (
            <>
              <a href="/atenciones">Mis Atenciones</a>
              <a href="/evaluaciones">Mis Evaluaciones</a>
              <a href="/nuevo-usuario">Nuevo Usuario</a>{" "}
              <a href="/register">Nuevo Profesional</a>
              <a href="/admin">Admin</a>
            </>
          )}
        </div>
      </div>
    </>
  );
}
