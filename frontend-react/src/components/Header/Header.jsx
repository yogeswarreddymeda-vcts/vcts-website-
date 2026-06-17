import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>VCTS</h2>
        <span>Engineering Intelligence</span>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/vlsi">VLSI</Link>
        <Link to="/embedded">Embedded</Link>
        <a href="#">Technologies</a>
        <a href="#">Industries</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </nav>

      <button className="expert-btn">
        Talk to Experts →
      </button>
    </header>
  );
}

export default Header;