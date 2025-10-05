import React from "react";
import "./Header.css";
import LogoImg from "../assets/WhatsApp_Image_2025-10-05_at_12.20.16_69f8251a-removebg-preview.png"; // تأكد من إعادة تسمية الصورة إلى logo.png داخل src/assets/

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-section">
          <div className="logo">
            <img src={LogoImg} alt="Nova Quest Logo" className="logo-icon" />
            <div className="logo-texts">
              <h1 className="logo-title">Nova Quest</h1>
              <p className="logo-subtitle">Sponsored by NASA</p>
            </div>
          </div>
        </div>

        <div className="links-section">
          <a href="#exoplanets" className="nav-link">Exoplanets Challenge</a>
          <a href="#missions" className="nav-link">Missions</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
