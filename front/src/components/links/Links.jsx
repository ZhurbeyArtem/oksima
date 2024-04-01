import { Link } from "react-router-dom";
import style from "./style.module.css";
const Links = () => {
  return (
    <div className={style.container}>
      <Link className={style.link} to="/login">
        Login
      </Link>{" "}
      /{" "}
      <Link className={style.link} to="/register">
        Registration
      </Link>
    </div>
  );
};

export default Links;
