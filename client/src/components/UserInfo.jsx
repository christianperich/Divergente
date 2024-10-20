import "../assets/css/userInfo.css";
import profileImg from "../assets/img/user-icon.png";

export default function UserInfo({ user }) {
  return (
    <>
      <div className="user-info">
        <img className="profile-img" src={profileImg} alt="" />
        <h2>{user.nombre}</h2>
        <div className="user-links">
          <a href="/">Mis Atenciones</a>
          <a href="/evaluaciones">Mis Evaluaciones</a>
          <a href="/nuevo-usuario">Nuevo Usuario</a>
        </div>
      </div>
    </>
  );
}
