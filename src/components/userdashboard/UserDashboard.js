import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/Frank1.png";
import './UserDashboard.scss';
import { UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Button, Modal } from 'antd';
import { destroyAccount } from '../../api';
import Pqrsf from "../PQRSF/Pqrsf";
const avatar = require.context('../../assets/avatar');



const UserDashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Perfil');
  const [showCancelAccountButton, setShowCancelAccountButton] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [UserData, setUserData] = useState({});
  const [userDocument, setuserDocument] = useState("");
  const token = localStorage.getItem("accessToken");
  const [newAvatar, setNewAvatar] = useState(null);
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
    { label: 'Configuración', icon: <SettingOutlined /> },
    { label: 'PQRSF', icon: <QuestionCircleOutlined /> }
  ];

  

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    document = decodedToken.document
    const userId = decodedToken.user_id;
    setuserDocument(document);
    const fetchUserData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          const userData1 = userData[0];
          setUserData(userData1);
        } else {
          console.log(response);
          console.error(
            "Error al obtener información del usuario:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error en la solicitud:", error.message);
      }
    };
    fetchUserData(userId);
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

  const handleAvatarChange = (file) => {
    if (file) {
      setNewAvatar(file);
    }
  };
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleClick= () => {
    navigate("/ChangePassword");
  }
  return (
    <div>
      <div className='header'>
        <img className="uamLogo" src={logo} alt="Logo UAM" />
        <button className="menu-button" onClick={toggleMenu}>
          {menuVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <button className="home" onClick={handleHomeClick}>
          Inicio
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
              <h1>¡Bienvenido!</h1>
              <div className="avatar-overlay">
              </div>
            <label htmlFor="avatarInput" className="avatar-label">
            
              {newAvatar ? (
                <img className="avatar-user" src={URL.createObjectURL(newAvatar)} alt="Vista previa del avatar" />
              ) : (
                <img
                  className="avatar-user"
                  src={avatar.keys().includes(`./${userDocument}.png`) ? avatar(`./${userDocument}.png`) : require('../../assets/images/defaultFrank.png')}
                  alt="Imagen de usuario"
                />
              )}
              
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarChange(e.target.files[0])}
              style={{ display: 'none' }}
            />

            <h1> Información </h1>

              <table>
                <tbody>
                  <tr>
                    <td>Correo Electrónico:</td>
                    <td>{UserData?.email}</td>
                  </tr>
                  <tr>
                    <td>No. Documento:</td>
                    <td>{UserData?.document}</td>
                  </tr>
                  <tr>
                    <td>Pais:</td>
                    <td>{UserData?.country}</td>
                  </tr>
                  <tr>
                    <td>Estado:</td>
                    <td>{UserData?.state}</td>
                  </tr>
                  <tr>
                    <td>Departamento:</td>
                    <td>{UserData?.depto}</td>
                  </tr>
                  <tr>
                    <td>Municipio:</td>
                    <td>{UserData?.municipality}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          
          )}
          {selectedOption === 'Configuración' && (
            <div className='configuration-panel'>
              <h2>Configuración</h2>
              <div className='buttonCambiarContraseña'>
              <Button onClick={handleClick}>
                Cambiar contraseña
              </Button>
              </div>
              <br/>
              <Button type="danger" onClick={handleCancelAccount}>
                Cancelar Cuenta
              </Button>
            </div>
          )}
          {selectedOption === 'PQRSF' && (
            <Pqrsf/>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
