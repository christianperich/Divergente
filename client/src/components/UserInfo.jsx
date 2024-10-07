import "../assets/css/userInfo.css";
import profileImg from "../assets/img/user-icon.png";

export default function UserInfo({ user }) {
  return (
    <>
      <div className="user-info">
        <img className="profile-img" src={profileImg} alt="" />
        <h2>{user.nombre}</h2>
        <p>{user.email}</p>
      </div>
    </>
  );
}
