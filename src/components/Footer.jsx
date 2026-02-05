import "./Footer.css";
import logo from "../assets/JJ.logo.PNG";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <img className="footer-logo" src={logo} alt="Tic-Tasker logo" />

        <p className="footer-text">
          © {year} Tic-Tasker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
