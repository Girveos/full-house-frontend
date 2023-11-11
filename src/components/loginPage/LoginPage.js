import React from 'react'
import "./LoginPage.scss";
import logo from '../../assets/images/LogoNuevo.png'
import { LoginForm } from './Form';
import { Button, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className='contentLogin'>
        <div className='Logo'>
        <img className="fullHouseLogo" src={logo} alt="Logo FullHouse" />
        </div>
        <h2>Iniciar sesión</h2>
        <div className='inputs-box'>
        <LoginForm/>
        </div>
        <div className='button-container'>
        <Button className="sign-up" type="secondary" htmlType="submit" onClick={() => (navigate("/SignUp"))}>
            CREAR CUENTA NUEVA
          </Button>
        </div>
    </div>
  )
}

export default LoginPage
