import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/Frank1.png";
import './UserDashboard.scss';
import { UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Modal } from 'antd';
import { destroyAccount } from '../../api';
const avatar = require.context('../../assets/avatar');



const UserDashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Perfil');
  const [showCancelAccountButton, setShowCancelAccountButton] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [userDocument, setuserDocument] = useState("");
  const token = localStorage.getItem("accessToken");
  let document = "";

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate('/');
  };

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const menuOptions = [
    { label: 'Perfil', icon: <UserOutlined /> },
    { label: 'Configuración', icon: <SettingOutlined /> }
  ];


  useEffect(() => {
    const decodedToken = jwtDecode(token);
    document = decodedToken.document
    setuserDocument(document);
    console.log(document);

    if (!token) {
      navigate('/');
    } else {
      try {
        if (decodedToken && decodedToken.role !== "user") {
          navigate('/');
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
        navigate('/');
      }
    }
    if (successModalVisible) {
      Modal.success({
        title: 'Cuenta cancelada con éxito',
        content: 'Gracias por usar nuestro servicio. Serás redirigido a la página principal.',
        onOk() {
          setSuccessModalVisible(false);
          navigate('/');
        },
      });
    }
  }, [successModalVisible, navigate,token, document]);

  const handleCancelAccount = async () => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas cancelar tu cuenta?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      async onOk() {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            console.error('No se encontró el token de acceso.');
            return;
          }

          await destroyAccount(token);
          setSuccessModalVisible(true);
        } catch (error) {
          console.error('Error al cancelar la cuenta:', error.message);
        }
      },
      onCancel() {
        console.log('Operación de cancelación de cuenta cancelada');
      },
    });
  };


  return (
    <div>
      <div className='header'>
        <img className="uamLogo" src={logo} alt="Logo UAM" />
        <button className="menu-button" onClick={toggleMenu}>
          {menuVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className='body-container'>
        <div className='slidecontainer'>
          <div className="icon-container">
            {menuOptions.map((option) => (
              <div className={`icon ${selectedOption === option.label ? 'selected' : ''}`} key={option.label} onClick={() => handleMenuClick(option.label)}>
                {option.icon}
                {menuVisible && <span className='menu-option-text'>{option.label}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className='contentuser'>
          {selectedOption === 'Perfil' && (
            <div className='avatar-container'>
              <img  className="avatar-user" src={avatar.keys().includes(`./${userDocument}.png`) ? avatar(`./${userDocument}.png`) : require('../../assets/images/defaultFrank.png')} alt="Imagen de usuario" style={{ cursor: 'pointer' }}/>
            </div>
          )}
          {selectedOption === 'Configuración' && (
            <div className='configuration-panel'>
              <h2>Configuración</h2>
              <Button type="danger" onClick={handleCancelAccount}>
                Cancelar Cuenta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
