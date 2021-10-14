import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <section className="header">
      <Logo />
      <Navigation />
    </section>
  );
}

export default Header;
