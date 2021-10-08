import "./Logo.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="logo__link">
      <img src={logo} alt="Логотип" className="logo" />
    </Link>
  );
}

export default Logo;
