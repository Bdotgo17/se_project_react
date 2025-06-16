import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__name">Developed by Baruc Gomez</span>
      <span className="footer__year">{currentYear}</span>
    </footer>
  );
}

export default Footer;
