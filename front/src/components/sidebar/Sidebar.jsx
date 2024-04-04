import style from "./style.module.css";
import { useUserStore } from "../../store/user.store";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.logout);

  const logOutHandle = () => {
    localStorage.removeItem("user");
    logOut();
  };

  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li>{user.role.toUpperCase()}</li>
        <li>
          Balance: <p>{user.balance}$</p>
        </li>

        <li className={style.item}>
          <Link className={style.link} to="profile">
            Profile
          </Link>
        </li>
        <li className={style.item}>
          <Link className={style.link} to="proposals">
            Proposals
          </Link>
        </li>
        <li className={style.item}>Users</li>
        <li className={style.item}>Support</li>
        <li className={`${style.item} ${style.link}`} onClick={logOutHandle}>
          LogOut
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
