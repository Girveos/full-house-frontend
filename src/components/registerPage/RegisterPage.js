import React from 'react';
import './RegisterPage.scss';
import logo from '../../assets/images/LogoNuevo.png';
import { Button, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import  {RegistrationForm}  from './Form';

const RegisterPage = () => {
  const navigate = useNavigate();

  // Puedes agregar lógica adicional aquí si es necesario

  return (
    <div className="register-page-container">
      <div className="logo-container">
        <h2>Crea una cuenta</h2>
        <h5>¡Es rápido y fácil!</h5>
        <img src={logo} alt="Logo" className='full-house-logo' />
      </div>
      <div className="form-container">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegisterPage;
