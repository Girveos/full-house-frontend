import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Form.scss'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';



export const LoginForm = () => {
  const history = useNavigate();
  const location = useLocation();

  let accessToken = null;

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const handleForgotPasswordClick = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setForgotPasswordModalVisible(false);
  };

  const handleSendEmail = (values) => {
    console.log("handleSendEmail function executed");
    console.log("Values received:", values);
    console.log(
      "Correo electrónico para recuperación de contraseña:",
      values.recoveryEmail
    );
    setForgotPasswordModalVisible(false);
  };

  const handleLoginSubmit = async (values) => {

    if (!values.loginEmail || !values.password) {
      setShowErrorMessage(true);
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    setShowErrorMessage(false);
    setErrorMessage("");

    const urlParams = new URLSearchParams(location.search);
    const activationToken = urlParams.get('token');
    if (activationToken) {
      const decodedTokenVerify = jwtDecode(activationToken);

      const activationResponse = await fetch(`http://localhost:3001/api/v1/user/activate-account/${decodedTokenVerify.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } else {
      console.log('No se encontró un token en la URL');
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.loginEmail,
          password: values.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        let decodedToken = "";
        try {
          decodedToken = jwtDecode(responseData.access);
          localStorage.setItem("accessToken", responseData.access);
          localStorage.setItem("refreshToken", responseData.refresh);
        } catch (error) {
          console.error("Error al decodificar el token:", error.message);
          return;
        }

        if (decodedToken && decodedToken.role === "user") {
          history(`/DashboardUserFullHouse`);
        } else if (decodedToken && decodedToken.role === "admin") {
          history(`/DashboardAdminFullHouse`);
        }
        else {
          console.error("Token inválido o rol incorrecto:", decodedToken);
        }
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setErrorModalMessage(errorData.msg);
          setIsErrorModalVisible(true);
        } else {
          console.error("Error en la autenticación:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const validationSchema = Yup.object().shape({
    loginEmail: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const handleErrorModalOk = () => {
    setIsErrorModalVisible(false);
  };

  const handleErrorModalCancel = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <Formik
      initialValues={{ loginEmail: "", password: "", recoveryEmail: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLoginSubmit}
      validateOnBlur={false}
    >
      <Form className="form">
        <div className="form-group">
          <label htmlFor="loginEmail" className="titles"></label>
          <Field
            id="loginEmail"
            name="loginEmail"
            as={Input}
            prefix={<UserOutlined />}
            placeholder="Correo electrónico"
            className="inputs"
          />
          <ErrorMessage
            name="loginEmail"
            render={(msg) => <div className="error-message">{msg}</div>}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password" className="titles"></label>
          <Field
            id="password"
            name="password"
            type="password"
            as={Input.Password}
            placeholder="Contraseña"
            className="inputs"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <ErrorMessage
            name="password"
            render={(msg) => <div className="error-message">{msg}</div>}
          />
        </div>
        <br />
        <div className="buttonsContainer">
          <Button className="log-in" type="primary" htmlType="submit">
            INICIAR SESIÓN
          </Button>
          <label className="forgotPassword">
            <Link onClick={handleForgotPasswordClick}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Modal
              title="Recuperar Contraseña"
              open={forgotPasswordModalVisible}
              onCancel={handleForgotPasswordCancel}
              footer={null}
            >
              <p>
                Ingresa tu correo electrónico y te enviaremos un enlace para la
                recuperación de tu contraseña.
              </p>
              <Formik
                initialValues={{ recoveryEmail: "" }}
                validationSchema={Yup.object().shape({
                  recoveryEmail: Yup.string()
                    .email("Correo electrónico inválido")
                    .required("El correo es requerido"),
                })}
                onSubmit={handleSendEmail}
              >
                <Form>
                  <div className="form-group">
                    <Field
                      type="email"
                      name="recoveryEmail"
                      as={Input}
                      prefix={<MailOutlined />}
                      placeholder="Correo electrónico"
                    />
                    <ErrorMessage
                      name="recoveryEmail"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button-forgot-password"
                  >
                    Enviar
                  </Button>
                </Form>
              </Formik>
            </Modal>
            <Modal
              title="Error de Autenticación"
              open={isErrorModalVisible}
              onOk={handleErrorModalOk}
              onCancel={handleErrorModalCancel}
            >
              <p>{errorModalMessage}</p>
            </Modal>
          </label>
          <label className="sign-in-text">¡Registrate!</label>
        </div>
      </Form>
    </Formik>
  );
};
