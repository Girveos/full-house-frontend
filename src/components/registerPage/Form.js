// Importaciones
import React from "react";
import { Button, Input } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined, SolutionOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Form.scss';


export const RegistrationForm = () => {

    const handleRegistrationSubmit = (values) => {
        console.log(values);
    };


    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
        documentType: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        document: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        country: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        department: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        municipality: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        statelocalitation: Yup.string().required("El apellido es requerido"), /*PENDIENTE*/
        email: Yup.string().email("Ingresa un correo electrónico válido").required("El correo es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
        confirmpassword: Yup.string().required("La contraseña es requerida"), /*PENDIENTE*/
    });

    return (
        <Formik
            initialValues={{ Name: "", lastname: "", email: "", password: "", documentType: "", document: "", country: "", confirmpassword: "", department: "", municipality: "", statelocalitation: "" }}
            validationSchema={validationSchema}
            onSubmit={handleRegistrationSubmit}
            validateOnBlur={false}
        >
            <Form>
                <div className="form-container">
                    <div className="column1">
                        <div className="form-group">
                            <label htmlFor="Name" className="titles"></label>
                            <Field
                                id="Name"
                                name="Name"
                                as={Input}
                                prefix={<UserOutlined />}
                                placeholder="Nombre"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="Name"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="email" className="titles"></label>
                            <Field
                                id="email"
                                name="email"
                                as={Input}
                                prefix={<MailOutlined />}
                                placeholder="Correo Electrónico"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="email"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="document" className="titles"></label>
                            <Field
                                id="document"
                                name="document"
                                as={Input}
                                prefix={<SolutionOutlined />}
                                placeholder="Documento"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="document"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="department" className="titles"></label>
                            <Field
                                id="department"
                                name="department"
                                as={Input}
                                placeholder="Departamento"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="department"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="statelocalitation" className="titles"></label>
                            <Field
                                id="statelocalitation"
                                name="statelocalitation"
                                as={Input}
                                placeholder="Estado"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="statelocalitation"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                    </div>

                    <div className="column2">
                        <div className="form-group">
                            <label htmlFor="lastname" className="titles"></label>
                            <Field
                                id="lastname"
                                name="lastname"
                                as={Input}
                                prefix={<UserSwitchOutlined />}
                                placeholder="Apellido"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="lastname"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="documentType" className="titles"></label>
                            <Field
                                id="documentType"
                                name="documentType"
                                as={Input}
                                placeholder="Tipo de documento"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="documentType"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="county" className="titles"></label>
                            <Field
                                id="county"
                                name="county"
                                as={Input}
                                placeholder="Pais"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="country"
                                render={(msg) => <div className="error-message">{msg}</div>}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="municipality" className="titles"></label>
                            <Field
                                id="municipality"
                                name="municipality"
                                as={Input}
                                placeholder="Municipio"
                                className="inputs"
                            />
                            <ErrorMessage
                                name="municipality"
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
                        <div className="form-group">
                            <label htmlFor="confirmpassword" className="titles"></label>
                            <Field
                                id="confirmpassword"
                                name="confirmpassword"
                                type="confirmpassword"
                                as={Input.Password}
                                placeholder="Confirmar contraseña"
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
                    </div>
                </div>


                <div className="buttonsContainer">
                    <Button className="log-in" type="primary" htmlType="submit">
                        REGISTRARSE
                    </Button>
                    <label className="sign-in-text">
                        ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                    </label>
                </div>
            </Form>
        </Formik>
    );
};
