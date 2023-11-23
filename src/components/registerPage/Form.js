// Importaciones
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, Checkbox, Modal, Upload, message } from "antd";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined, SolutionOutlined, UserSwitchOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import defaultAvatar from '../../assets/images/defaultFrank.png';
import * as Yup from "yup";
import './Form.scss';
import { useNavigate } from 'react-router-dom';


export const RegistrationForm = (props) => {
    const { Option } = Select;
    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoDisabled, setDepartamentoDisabled] = useState(true);
    const [municipalityDisabled, setMunicipalityDisabled] = useState(true);
    const [statelocalitationDisabled, setStatelocalitationDisabled] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [paises, setPaises] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userID, setuserID] = useState("");
    const history = useNavigate();

    const handleDepartamentoChange = (value, { setFieldValue }) => {
        setFieldValue("department", value);
        fetchMunicipios(value);
    };
    const handleTipoDocumentoChange = (value, { setFieldValue }) => {
        setFieldValue("documentType", value);
    };


    const handleRegistrationSubmit = async (values, { setSubmitting }) => {
        if (values.country !== 'Colombia') {
            values.department = '';
            values.municipality = '';
        }
        
        const formData = new FormData();
        formData.append("firstname", values.Name);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("country", values.country);
        formData.append("depto", values.department);
        formData.append("municipality", values.municipality);
        formData.append("state", values.statelocalitation);
        formData.append("documentType", values.documentType);
        formData.append("document", values.document);
        /* if (avatar) {
            formData.append("avatar", avatar, `${values.document}`);
          } */

        try {

            const response = await fetch("http://localhost:3001/api/v1/register", {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();

            if (response.ok) {
                setIsModalVisible(true);

            } else {
                const errorData = await responseData;
                console.log(errorData);
                setErrorModalMessage(errorData.msg);
                setIsErrorModalVisible(true);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalOk = () => {
        history("/login")
        setIsModalVisible(false);
    };

    const handleErrorModalOk = () => {
        setIsErrorModalVisible(false);
    };

    const handleErrorModalCancel = () => {
        setIsErrorModalVisible(false);
    };



    useEffect(() => {
        fetchPaises();
        fetchDepartamentos();
        fetchMunicipios();
    }, []);


    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("El nombre es requerido"),
        lastname: Yup.string().required("El apellido es requerido"),
        email: Yup.string()
            .email("Correo inválido")
            .required("El correo es requerido"),
        password: Yup.string()
            .required("La contraseña es requerida")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Es necesario al menos una mayúscula, una minúscula, un número y tener como mínimo 8 caracteres"
            ),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Las contraseñas deben ser iguales")
            .required("Debes confirmar la contraseña"),
        documentType: Yup.string()
            .required("El tipo de documento es requerido")
            .oneOf(
                [
                    "CC",
                    "TI",
                    "Cédula de Extranjería",
                    "Pasaporte",
                ],
                "Tipo de documento inválido"
            ),
        document: Yup.string()
            .required("El documento es requerido")
            .matches(/^[0-9]+$/, "El documento debe contener solo números"),
        country: Yup.string().required("El pais es requerido"),
        department: Yup.string().test('required-if-colombia', 'El departamento es requerido', function (value) {
            const { country } = this.parent;
            return country === 'Colombia' ? !!value : true;
        }),
        municipality: Yup.string().test('required-if-colombia', 'El municipio es requerido', function (value) {
            const { country } = this.parent;
            return country === 'Colombia' ? !!value : true;
        }),
        termsAndConditions: Yup.boolean()
            .oneOf([true], "Debe aceptar los términos y condiciones")
            .required("Debe aceptar los términos y condiciones")
    });


    const fetchDepartamentos = async () => {
        try {
            const response = await axios.get(
                "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento"
            );
            const dataFilter = [...new Set(response.data.map(JSON.stringify))].map(
                JSON.parse
            );

            const sortedDepartamentos = dataFilter.sort((a, b) =>
                a.departamento.localeCompare(b.departamento)
            );

            setDepartamentos(sortedDepartamentos);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMunicipios = async (departamento) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&departamento=${departamento}`
            );

            const sortedMunicipios = response.data.sort((a, b) =>
                a.municipio.localeCompare(b.municipio)
            );

            setMunicipios(sortedMunicipios);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchPaises = async () => {
        try {
            const response = await axios.get(
                "https://restcountries.com/v3.1/all?fields=name"
            );

            const sortedPaises = response.data.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );
            setPaises(sortedPaises);

        } catch (error) {
            console.error(error);
        }
    };

    const handleCountryChange = (selectedCountry) => {

        if (selectedCountry === "Colombia") {
            setDepartamentoDisabled(false);
            setMunicipalityDisabled(false);
            setStatelocalitationDisabled(true);
        } else {
            setDepartamentoDisabled(true);
            setMunicipalityDisabled(true);
            setStatelocalitationDisabled(false);
        }
    };


    return (
        <Formik
            initialValues={{ Name: "", lastname: "", email: "", password: "", documentType: "", document: "", country: "", confirmpassword: "", department: "", municipality: "", statelocalitation: "", avatar: null, }}
            validationSchema={validationSchema}
            onSubmit={handleRegistrationSubmit}
            validateOnBlur={false}
            enableReinitialize={true}
        >
            {({ values, setFieldValue }) => (
                <Form enctype="multipart/form-data">
                    <div className="form-container">
                        <div className="column1">
                            <div className="form-group">
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
                                <Field
                                    id="department"
                                    name="department"
                                >
                                    {({ field, form }) => (
                                        <div className="form-group">
                                            <Select
                                                {...field}
                                                className="inputs"
                                                value={field.value}
                                                onChange={(value) => {
                                                    form.setFieldValue("department", value);
                                                    fetchMunicipios(value);
                                                }}
                                                onBlur={() => form.setFieldTouched("department", true)}
                                                placeholder="Departamento"
                                                disabled={form.values.country !== "Colombia"} // Deshabilitar si el país no es Colombia
                                            >
                                                <Option value="" disabled>
                                                    Departamento
                                                </Option>
                                                {departamentos.map((departamento) => (
                                                    <Option
                                                        key={departamento.departamento}
                                                        value={departamento.departamento}
                                                    >
                                                        {departamento.departamento}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {form.errors.department && form.touched.department && form.values.country === "Colombia" && (
                                                <div className="error-message">{form.errors.department}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>


                            </div>
                            <br />
                            <div className="form-group">
                                <Field
                                    id="statelocalitation"
                                    name="statelocalitation"
                                    as={Input}
                                    placeholder="Estado"
                                    className="inputs"
                                    disabled={statelocalitationDisabled}
                                />
                                <ErrorMessage
                                    name="statelocalitation"
                                    render={(msg) => <div className="error-message">{msg}</div>}
                                />
                            </div>
                            <br />
                            {/* <div className="textAvatar">Seleccione un avatar</div>
                            <div className="avatar">
                                {avatar ? (
                                    <img src={URL.createObjectURL(avatar)} alt="avatar" />
                                ) : (
                                    <img src={defaultAvatar} alt="avatar" />
                                )}
                            </div>
                            <div className="button-upload">
                                <Upload
                                    customRequest={({ file, onSuccess }) => {
                                        setAvatar(file);
                                        onSuccess();
                                    }}
                                    showUploadList={false}
                                >
                                    <Button icon={<UserOutlined />} className="avatar-upload-btn">
                                        Subir Avatar
                                    </Button>
                                </Upload>
                            </div> */}

                        </div>
                        <div className="column2">
                            <div className="form-group">
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
                                <Field
                                    id="documentType"
                                    name="documentType"
                                >
                                    {({ field, form }) => (
                                        <Select
                                            className="inputs"
                                            value={field.value}
                                            onChange={(value) => form.setFieldValue("documentType", value)}
                                            onBlur={() => form.setFieldTouched("documentType", true)}
                                        >
                                            <Option value="" disabled>
                                                Tipo de documento
                                            </Option>
                                            <Option value="CC">CC</Option>
                                            <Option value="TI">TI</Option>
                                            <Option value="Pasaporte">Pasaporte</Option>
                                            <Option value="Cédula de extranjería">Cédula de extranjería</Option>
                                        </Select>
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="documentType"
                                    render={(msg) => <div className="error-message">{msg}</div>}
                                />
                            </div>

                            <br />
                            <div className="form-group">
                                <Field
                                    id="country"
                                    name="country"
                                >
                                    {({ field, form }) => (
                                        <div className="form-group">
                                            <Select
                                                {...field}
                                                className="inputs"
                                                value={field.value}
                                                onChange={(value) => {
                                                    form.setFieldValue("country", value);
                                                    handleCountryChange(value);
                                                    if (value !== "Colombia") {
                                                        form.setFieldValue("department", "");
                                                        form.setFieldValue("municipality", "");
                                                    }
                                                }}
                                                onBlur={() => form.setFieldTouched("country", true)}
                                            >
                                                <Option value="" disabled>
                                                    País
                                                </Option>
                                                {paises.map((pais) => (
                                                    <Option
                                                        key={pais.name.common}
                                                        value={pais.name.common}
                                                    >
                                                        {pais.name.common}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {form.errors.country && form.touched.country && (
                                                <div className="error-message">{form.errors.country}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <br />
                            <div className="form-group">
                                <Field
                                    id="municipality"
                                    name="municipality"
                                >
                                    {({ field, form }) => (
                                        <div className="form-group">
                                            <Select
                                                {...field}
                                                className="inputs"
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue("municipality", value)}
                                                onBlur={() => form.setFieldTouched("municipality", true)}
                                                placeholder="Municipio"
                                                disabled={municipalityDisabled}
                                            >
                                                <Option value="" disabled>
                                                    Municipio
                                                </Option>
                                                {municipios.map((municipio) => (
                                                    <Option
                                                        key={municipio.municipio}
                                                        value={municipio.municipio}
                                                    >
                                                        {municipio.municipio}
                                                    </Option>
                                                ))}
                                            </Select>
                                            {form.errors.municipality && form.touched.municipality && form.values.country === "Colombia" && (
                                                <div className="error-message">{form.errors.municipality}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>

                            </div>
                            <br />
                            <div className="form-group">
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
                                <Field
                                    name="confirmpassword"
                                    as={Input.Password}
                                    placeholder="Confirmar Contraseña"
                                    iconRender={(visible) =>
                                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                                    }
                                />
                                <ErrorMessage
                                    name="confirmpassword"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="terms">
                        <Checkbox
                            id="termsAndConditions"
                            name="termsAndConditions"
                            checked={values.termsAndConditions}
                            onChange={() => setFieldValue("termsAndConditions", !values.termsAndConditions)}
                        >
                            Acepto los {" "}
                            <Link to="/terms" className="terms-link">
                                términos y condiciones
                            </Link>
                        </Checkbox>
                        <ErrorMessage
                            name="termsAndConditions"
                            render={(msg) => <div className="error-message">{msg}</div>}
                        />
                    </div>
                    <div className="buttonsContainer">
                        <Button className="log-in" type="primary" htmlType="submit" disabled={!values.termsAndConditions}>
                            REGISTRATE
                        </Button>
                        <label className="sign-in-text">
                            ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                        </label>
                    </div>
                    <div><Modal
                        title="Registro Exitoso"
                        open={isModalVisible}
                        onOk={handleModalOk}
                        cancelButtonProps={{ style: { display: 'none' } }} 
                    >
                        <p>Ya se encuentra registrado en FullHosue_Shoes, por favor, verifique su correo electrónico o mensaje el mensaje en su celular para activar su cuenta</p>
                    </Modal>

                        <Modal
                            title="Error en el Registro"
                            open={isErrorModalVisible}
                            onOk={handleErrorModalOk}
                            onCancel={handleErrorModalCancel}
                        >
                            <p>{errorModalMessage}</p>
                        </Modal>

                    </div>
                </Form>
            )}
        </Formik>
    );
};

/* Artículo para definir tipo de docuemnto */
/*https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/resolucion_uaemc_2061_2020.htm */
