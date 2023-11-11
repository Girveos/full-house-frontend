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

export const LoginForm = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);

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

  const handleLoginSubmit = (values) => {
    console.log(values);
    console.log("Correo electrónico para iniciar sesión:", values.loginEmail);
    console.log("Contraseña para iniciar sesión:", values.password);

    if (!values.loginEmail || !values.password) {
      setShowErrorMessage(true);
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    setShowErrorMessage(false);
    setErrorMessage("");

    // Continuar con la lógica de inicio de sesión si las validaciones son exitosas
    // ...
  };

  const validationSchema = Yup.object().shape({
    loginEmail: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

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
          </label>
          <label className="sign-in-text">¡Registrate!</label>
        </div>
      </Form>
    </Formik>
    
  );
};
