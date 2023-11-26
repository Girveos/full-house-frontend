import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import toolbar from "../toolbar/Toolbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import "./Pqrsf.scss";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useField } from 'formik';

const initialValues = {
  person_type: "",
  firstname: "",
  lastname: "",
  document_type: "",
  document: "",
  email: "",
  social_name: "",
  nit: "",
  pqrsf_type: "",
  invoice: "",
  category: "",
};

const validationSchema = Yup.object().shape({

});

export const PqrsfForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: toolbar,
    },
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { ...data } = values;
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    if (!quill || !quill.getContents()) {
      console.error("El campo de comentario es requerido");
      return;
    } else {
      const commentData = quill.getContents();
      formData.append("comment", JSON.stringify(commentData));
      console.log("comment x2", commentData);
    }
    
  console.log("formdata con comment", formData.get("comment"));

    console.log(quill.getContents());

    axios
      .post("http://localhost:5000/api/v1/help/pqrsf", formData)
      .then((response) => {
        if (response.status === 201) {
          setShowSuccessMessage(true);
          setTimeout(() => {
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Este es el error", error);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
        quill.setContents([{ insert: '\n' }]);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className="form-style">
          <div className="div-boxes-pqrsf">
            <div className="PQRSF-form-subtitles">
              Paso 1. Información Personal
            </div>
            <div className="PQRSF-form-subtitles-sub">
              Ingrese el tipo de persona y complete los demás datos requeridos.
            </div>
            <div className="div-form-pqrsf">
              <div>
                <Field name="person_type">
                  {({ field, form }) => (
                    <TextField
                      select
                      label="Tipo de Persona"
                      {...field}
                      onChange={(e) =>
                        form.setFieldValue("person_type", e.target.value)
                      }
                      onBlur={field.onBlur}
                      error={
                        form.touched.person_type &&
                        Boolean(form.errors.person_type)
                      }
                      className="textfield"
                    >
                      <MenuItem value="" disabled>
                        Tipo de Persona
                      </MenuItem>
                      <MenuItem value="Persona Natural">
                        Persona Natural
                      </MenuItem>
                      <MenuItem value="Persona Jurídica">
                        Persona Jurídica
                      </MenuItem>
                    </TextField>
                  )}
                </Field>
                <ErrorMessage
                  name="person_type"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            <div>
              {values.person_type === "Persona Natural" && (
                <div className="div-form-pqrsf-1">
                  <div className="subdiv-form-pqrsf">
                    <div className="disp-movi-name">
                      <Field name="firstname">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="firstname"
                            name="firstname"
                            label="Nombre"
                            placeholder="Nombre"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="firstname"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div>
                    <Field name="lastname">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="lastname"
                            name="lastname"
                            label="Apellido(s)"
                            placeholder="Apellido(s)"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="lastname"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="subdiv-form-pqrsf">
                  <div className="disp-movi-name">
                      <Field name="document_type">
                        {({ field, form }) => (
                          <TextField
                            select
                            label="Tipo de documento"
                            {...field}
                            onChange={(e) =>
                              form.setFieldValue(
                                "document_type",
                                e.target.value
                              )
                            }
                            onBlur={field.onBlur}
                            error={
                              form.touched.document_type &&
                              Boolean(form.errors.document_type)
                            }
                            className="text-field"
                          >
                            <MenuItem value="" disabled>
                              Tipo de documento
                            </MenuItem>
                            <MenuItem value="Tarjeta de identidad">
                              Tarjeta de identidad
                            </MenuItem>
                            <MenuItem value="Cédula de ciudadanía">
                              Cédula de ciudadanía
                            </MenuItem>
                            <MenuItem value="Cédula de extranjería">
                              Cédula de extranjería
                            </MenuItem>
                            <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                            <MenuItem value="PEP">PEP</MenuItem>
                          </TextField>
                        )}
                      </Field>
                      <ErrorMessage
                        name="document_type"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div className="disp-movi-doc">
                      <Field name="document">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="document"
                            name="document"
                            label="Documento"
                            placeholder="Documento"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="document"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="subdiv-form-pqrsf">
                  <div>
                      <Field name="email">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
              )}

              {values.person_type === "Persona Jurídica" && (
                <div className="div-form-pqrsf">
                  <div className="subdiv-form-pqrsf">
                    <div>
                      <Field name="social_type">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="social_type"
                            name="social_type"
                            label="Razón social"
                            placeholder="Razón social"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="social_type"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div>
                      <Field name="nit">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="nit"
                            name="nit"
                            label="NIT"
                            placeholder="NIT"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="nit"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                  <div className="subdiv-form-pqrsf">
                    <div>
                      <Field name="email">
                        {({ field, meta }) => (
                          <TextField
                            required
                            id="email"
                            name="email"
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            {...field}
                            className="textfield"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="div-boxes-pqrsf">
            <div className="PQRSF-form-subtitles">Paso 2. Tipo de PQRSF</div>
            <div className="PQRSF-form-subtitles-sub">
              Ingrese el tipo PQRSF y la categoría más adecuada para su
              requerimiento. 
            </div>
            <div className="PQRSF-form-subtitles-sub">
            Si su PQRSF es una Queja o Reclamo por favor ingrese el número de su factura.
            </div>
            <div className="div-form-pqrsf">
              <div>
                <Field name="pqrsf_type">
                  {({ field, form }) => (
                    <TextField
                      select
                      label="Tipo de PQRSF"
                      {...field}
                      onChange={(e) =>
                        form.setFieldValue("pqrsf_type", e.target.value)
                      }
                      onBlur={field.onBlur}
                      error={
                        form.touched.pqrsf_type &&
                        Boolean(form.errors.pqrsf_type)
                      }
                      className="textfield"
                    >
                      <MenuItem value="" disabled>
                        Tipo de PQRSF
                      </MenuItem>
                      <MenuItem value="Petición">Petición</MenuItem>
                      <MenuItem value="Queja">Queja</MenuItem>
                      <MenuItem value="Reclamo">Reclamo</MenuItem>
                      <MenuItem value="Solicitud">Solicitud</MenuItem>
                      <MenuItem value="Felicitación">Felicitación</MenuItem>
                    </TextField>
                  )}
                </Field>
                <ErrorMessage
                  name="pqrsf_type"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <Field name="category">
                  {({ field, form }) => (
                    <TextField
                      select
                      label="Categoría"
                      {...field}
                      onChange={(e) =>
                        form.setFieldValue("category", e.target.value)
                      }
                      onBlur={field.onBlur}
                      error={
                        form.touched.category && Boolean(form.errors.category)
                      }
                      className="textfield"
                    >
                      <MenuItem value="" disabled>
                        Categoría
                      </MenuItem>
                      <MenuItem value="Pagos">Pagos</MenuItem>
                      <MenuItem value="Envios">Envios</MenuItem>
                      <MenuItem value="Atención al cliente">
                        Atención al cliente
                      </MenuItem>
                      <MenuItem value="Otros">Otros</MenuItem>
                    </TextField>
                  )}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>
            {["Queja", "Reclamo"].includes(values.pqrsf_type) && (
              <div className="div-form-pqrsf">
                <div>
                  <Field name="invoice">
                    {({ field, meta }) => (
                      <TextField
                        required
                        id="invoice"
                        name="invoice"
                        label="Número factura"
                        placeholder="Número factura"
                        {...field}
                        className="textfield"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="invoice"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="div-boxes-pqrsf">
            <div className="PQRSF-form-subtitles">Paso 3. Realiza tu PQRSF</div>
            <div className="PQRSF-form-subtitles-sub">
              Ingrese el acontecimiento y/o comentarios.
            </div>
            <div>
              <Field name="comment">
                {({ field, form }) => (
                  <div className="editor">
                    <div ref={quillRef} {...field}></div>
                  </div>
                )}
              </Field>
            </div>
          </div>
          <div className="div-send-pqrsf">
            <Button
              className="buttom-send-pqrsf"
              type="submit"
              variant="contained"
              color="primary"
            >
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
