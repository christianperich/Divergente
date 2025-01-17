import "../assets/css/userInfo.css";
import profileImg from "../assets/img/user-icon.png";

export default function UserInfo({ user }) {
  return (
    <>
      <div className="user-info">
        <img className="profile-img" src={profileImg} alt="" />
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
