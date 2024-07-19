import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import logoform from '../../assets/img/logoform.png';
import './Logo.css'; // Arquivo de animação personalizado

export const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <img src={logo} className="w-10 h-10 logo-form animate-rotate-reverse" alt="Logo" />
    </Link>
  );
};

export const Logoform = () => {
  return (
    <Link to="/" className="logo-link">
      <img src={logoform} className="w-18 h-16 logo-form animate-rotate-reverse" alt="Logo Form" />
    </Link>
  );
};
