import style from "./style.module.css";

const Header = () => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li>User role</li>
        <li>Balance: 100000000$</li>

        <li className={style.item}>Profile</li>
        <li className={style.item}>Proposals</li>
        <li className={style.item}>Users</li>
        <li className={style.item}>Support</li>
        <li className={style.item}>LogOut</li>
      </ul>
    </div>
  );
};

export default Header;
