import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Frank1.png";
import "./AdminDashboard.scss";
import {
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  ExclamationCircleOutlined,
  AppstoreAddOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { Table, Switch, Select, Button, Modal, Form, Input } from "antd";
import Product from '../product/Product';
const avatar = require.context("../../assets/avatar");

const UserDashboard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Perfil");
  const [userData, setUserData] = useState({});
  const [adminData, setadminData] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [categoriesData, setcategoriesData] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [CategorydeleteModalVisible, setCategoryDeleteModalVisible] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [CategoryToDeleteId, setCategoryToDeleteId] = useState(null);
  const [updatedUsers, setUpdatedUsers] = useState([]);
  const [updatedCategory, setUpdatedCategory] = useState([]);
  const [userDocument, setuserDocument] = useState("");
  const token = localStorage.getItem("accessToken");
  const [pagination, setPagination] = useState({
    pageSize: 5,
    current: 1,
    total: usersData.length,
  });
  const [paginationCategory, setPaginationCategory] = useState({
    pageSize: 5,
    current: 1,
    total: categoriesData.length,
  });
  const [userId, setUserId] = useState(null);
  const [userDocumentUser, setUserDocumentUser] = useState(null);
  const [createCategoryVisible, setCreateCategoryVisible] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    active: false,
      });
const handleCategoryFormChange = (field, value) => {
  setCategoryForm({
    ...categoryForm,
    [field]: value,
  });
};
  

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const handleTableChangeCategory = (paginationCategory) => {
    setPaginationCategory(paginationCategory);
  };
  const avatarURL = "";
  const { Option } = Select;
  const navigate = useNavigate();
  const [newAvatar, setNewAvatar] = useState(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const menuOptions = [
    { label: "Perfil", icon: <UserOutlined /> },
    { label: "Usuarios", icon: <UsergroupAddOutlined /> },
    { label: "Categorias", icon: <AppstoreAddOutlined /> },
    { label: "Productos", icon: <ShoppingOutlined /> },
    { label: "Configuración", icon: <SettingOutlined /> },
  ];

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsersData(usersData);
      } else {
        console.error(
          "Error al obtener la lista de usuarios:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          userId: userId,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
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

  const fetchcategoriesData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) {
        const categoryData1 = await response.json();
        setcategoriesData(categoryData1);
        console.log(categoriesData);
      } else {
        console.error(
          "Error al obtener información de las categorias:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  useEffect(() => {
    fetchcategoriesData();
    const decodedToken = jwtDecode(token);
    const document = decodedToken.document;
    setuserDocument(document);
    if (selectedOption === "Usuarios") {
      fetchUsers();
      generateColumns();
    }

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
        const userId = userData.user_id;
        fetchUserData(userId);
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
      }
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
  
        if (response.ok) {
          const adminData = await response.json();
          const adminData1 = adminData[0];
          setadminData(adminData1);
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
    fetchAdminData();
  }, [selectedOption, token]);

  const showDeleteModal = (userId) => {
    setUserToDeleteId(userId);
    setDeleteModalVisible(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      showDeleteModal(userId);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
  const showDeleteModalCategory = (categoryId) => {
    setCategoryToDeleteId(categoryId);
    setCategoryDeleteModalVisible(true);
  };


  const handleDeleteCategory = async (categoryId) => {
    try {
      showDeleteModalCategory(categoryId);
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/user/${userToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        fetchUsers();
        setDeleteModalVisible(false);
      } else {
        console.error(
          `Error al eliminar el usuario con ID ${userToDeleteId}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };
  const handleCategoryConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/category/${CategoryToDeleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.ok) {
        fetchcategoriesData();
        setCategoryDeleteModalVisible(false);
      } else {
        console.error(
          `Error al eliminar el usuario con ID ${userToDeleteId}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  const handleSwitchChange = (checked, record) => {
    const updatedUser = { ...record, active: checked };
    const updatedUsersCopy = [...updatedUsers, updatedUser];
    setUpdatedUsers(updatedUsersCopy);

    setUsersData((prevUsers) =>
      prevUsers.map((user) => (user._id === record._id ? updatedUser : user))
    );
  };
  const updateActiveCategory = async (active, _id) => {
    try {
        const response = await fetch(
          `http://localhost:3001/api/v1/category/${_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ active }),
          }
        );
        if (!response.ok) {
          console.error(
            `Error al actualizar el usuario con ID ${_id} (active):`,
            response.statusText
          );
        } else {
          console.log(
            `Usuario con ID ${_id} (active) actualizado exitosamente en la base de datos.${active}`
          );
          console.log("respuesta del back", response);
        };

    } catch (error) {
      console.error(
        "Error en la solicitud de actualización de active:",
        error.message
      );
    }
    fetchcategoriesData();
  };
  const handleSwitchChangeCategory = (checked, record) => {
    console.log("hola",checked);
    console.log("Record:", record._id);
    const updatedCategoryCopy = [...updatedCategory];
    const index = updatedCategoryCopy.findIndex(cat => cat._id === record._id);
    updateActiveCategory();
    setUpdatedCategory(updatedCategoryCopy);
    fetchcategoriesData();
    console.log("Updated Category:", updatedCategory);
    if (index !== -1) {
      updatedCategoryCopy[index] = { ...record, active: checked };
      setUpdatedCategory(updatedCategoryCopy);
    }
  };
  

  const handleSelectChange = (value, record) => {
    const updatedUser = { ...record, role: value };
    const updatedUsersCopy = [...updatedUsers, updatedUser];
    setUpdatedUsers(updatedUsersCopy);

    setUsersData((prevUsers) =>
      prevUsers.map((user) => (user._id === record._id ? updatedUser : user))
    );
  };

  const generateColumns = () => {
    if (usersData.length === 0) {
      return [];
    }

    const columnsToShow = [
      "_id",
      "firstname",
      "lastname",
      "country",
      "documentType",
      "document",
      "email",
    ];

    const baseColumns = columnsToShow.map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
    }));

    const actionColumn = {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="danger"
          className="delete-button"
          onClick={() => handleDeleteUser(record._id)}
        >
          Eliminar
        </Button>
      ),
    };

    return baseColumns.concat([
      {
        title: "Active",
        dataIndex: "active",
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={(checked) => handleSwitchChange(checked, record)}
          />
        ),
      },
      {
        title: "Role",
        dataIndex: "role",
        render: (text, record) => (
          <Select
            value={text}
            onChange={(value) => handleSelectChange(value, record)}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        ),
      },
      actionColumn,
    ]);
  };

  const generateColumnsCategory = () => {
    if (categoriesData.length === 0) {
      return [];
    }

    const columnsToShow = [
      "name",
      "description",
    ];

    const baseColumns = columnsToShow.map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
    }));

    const actionColumn = {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="danger"
          className="delete-button"
          onClick={() => handleDeleteCategory(record._id)}
        >
          Eliminar
        </Button>
      ),
    };

    return baseColumns.concat([
      {
        title: "Active",
        dataIndex: "active",
        render: (text, record) => (
          <Switch
            checked={text}
            onChange={() => updateActiveCategory(!text, record._id)}
          />
        ),
      },
      actionColumn,
    ]);
  };

  const updateActiveUsers = async () => {
    try {
      const activePromises = updatedUsers.map(async ({ _id, active }) => {
        console.log(typeof active);
        console.log(active);

        const response = await fetch(
          `http://localhost:3001/api/v1/user/${_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ active }),
          }
        );
        if (!response.ok) {
          console.error(
            `Error al actualizar el usuario con ID ${_id} (active):`,
            response.statusText
          );
        } else {
          console.log(
            `Usuario con ID ${_id} (active) actualizado exitosamente en la base de datos.${active}`
          );
          console.log("respuesta del back", response);
        }
      });

      await Promise.all(activePromises);
    } catch (error) {
      console.error(
        "Error en la solicitud de actualización de active:",
        error.message
      );
    }
  };

  const updateRoleUsers = async () => {
    try {
      const rolePromises = updatedUsers.map(async ({ _id, role }) => {
        const response = await fetch(
          `http://localhost:3001/api/v1/user/${_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ role }),
          }
        );

        if (!response.ok) {
          console.error(
            `Error al actualizar el usuario con ID ${_id} (role):`,
            response.statusText
          );
        } else {
          console.log(
            `Usuario con ID ${_id} (role) actualizado exitosamente en la base de datos.`
          );
        }
      });

      await Promise.all(rolePromises);
    } catch (error) {
      console.error(
        "Error en la solicitud de actualización de role:",
        error.message
      );
    }
  };

  const handleConfirmChanges = async () => {
    try {
      await updateActiveUsers();
      await updateRoleUsers();

      setSuccessModalVisible(true);
      setUpdatedUsers([]);
    } catch (error) {
      console.error(
        "Error en la solicitud de cambios generales:",
        error.message
      );
    }
  };

  const handleAvatarChange = (file) => {
    if (file) {
      setNewAvatar(file);
    }
  };

  const showCreateCategoryModal = () => {
    setCreateCategoryVisible(true);
  };
  
  const hideCreateCategoryModal = () => {
    setCreateCategoryVisible(false);
  };

  const createCategoryModalContent = (
    <div>
      <Form>
        <Form.Item label="Nombre">
          <Input
            value={categoryForm.name}
            onChange={(e) => handleCategoryFormChange("name", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Descripción">
          <Input.TextArea
            value={categoryForm.description}
            onChange={(e) => handleCategoryFormChange("description", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Activo">
          <Switch
            checked={categoryForm.active}
            onChange={(checked) => handleCategoryFormChange("active", checked)}
          />
        </Form.Item>
      </Form>
    </div>
  );

  const handleSaveCategory = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryForm),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Respuesta del backend:", responseData);

      hideCreateCategoryModal();
      fetchcategoriesData();
    } else {
      console.error("Error al crear la categoría:", response.statusText);
    }
  } catch (error) {
    console.error("Error al crear la categoría:", error.message);
  }
};

  
  return (
    <div>
      <div className="headeradmin">
        <img className="uamLogo" src={logo} alt="Logo UAM" />
        <button className="menu-button" onClick={toggleMenu}>
          {menuVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="body-containeradmin">
        <div className="slidecontaineradmin">
          <div className="icon-containeradmin">
            {menuOptions.map((option) => (
              <div
                className={`iconadmin ${
                  selectedOption === option.label ? "selected" : ""
                }`}
                key={option.label}
                onClick={() => handleMenuClick(option.label)}
              >
                {option.icon}
                {menuVisible && (
                  <span className="menu-option-textadmin">{option.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="contentadmin">
          {selectedOption === "Perfil" && (
            <div className="avatar-container">
              <h1>¡Bienvenido!</h1>
              <div className="avatar-overlay">
              </div>
              <label htmlFor="avatarInput" className="avatar-label">
                {newAvatar ? (
                  <img
                    className="avatar-user"
                    src={URL.createObjectURL(newAvatar)}
                    alt="Vista previa del avatar"
                  />
                ) : (
                  <img
                    className="avatar-user"
                    src={
                      avatar.keys().includes(`./${userDocument}.png`)
                        ? avatar(`./${userDocument}.png`)
                        : require("../../assets/images/defaultFrank.png")
                    }
                    alt="Imagen de usuario"
                  />
                )}
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e.target.files[0])}
                style={{ display: "none" }}
              />

              <h1> Información </h1>

              <table>
                <tbody>
                  <tr>
                    <td>Correo Electrónico:</td>
                    <td>{adminData?.email}</td>
                  </tr>
                  <tr>
                    <td>No. Documento:</td>
                    <td>{adminData?.document}</td>
                  </tr>
                  <tr>
                    <td>Pais:</td>
                    <td>{adminData?.country}</td>
                  </tr>
                  <tr>
                    <td>Estado:</td>
                    <td>{adminData?.state}</td>
                  </tr>
                  <tr>
                    <td>Departamento:</td>
                    <td>{adminData?.depto}</td>
                  </tr>
                  <tr>
                    <td>Municipio:</td>
                    <td>{adminData?.municipality}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {selectedOption === "Usuarios" && (
            <div className="content-users">
              <div>
                <h2>Lista de usuarios</h2>
              </div>
              <div className="table">
                <Table
                  dataSource={usersData}
                  columns={generateColumns()}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </div>
              <div className="button-confirm-changes">
                <Button type="primary" onClick={handleConfirmChanges}>
                  Confirmar Cambios
                </Button>
              </div>
            </div>
          )}
          {selectedOption === "Categorias" && (
            <div className="category-container">
              <div className="title-category">
                <h2>Categorias</h2>
              </div>
              <div className="category">
              <div className="table">
                <Table
                  dataSource={categoriesData}
                  columns={generateColumnsCategory()}
                  pagination={paginationCategory}
                  onChange={handleTableChangeCategory}
                />
              </div>
              <div className="button-category-container">
              <Button type="primary" className="añadir-button" onClick={() => showCreateCategoryModal(true)}>
                  Añadir categoría
                </Button>
              </div>
            </div>
              </div>
          )}
          {selectedOption === "Productos" && (
            <div className="product-container">
              <div className="title-product">
                <h2>Productos</h2>
              </div>
              <div className="product">
              <Product />
              </div>
            </div>
          )}
        </div>
        <Modal
          title="Éxito"
          open={successModalVisible}
          onOk={() => setSuccessModalVisible(false)}
          onCancel={() => setSuccessModalVisible(false)}
        >
          Los usuarios han sido actualizados exitosamente.
        </Modal>
        <Modal
          title="Confirmar Eliminación"
          open={deleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={() => setDeleteModalVisible(false)}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <p>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: "8px" }}
            />
            ¿Estás seguro de que deseas eliminar este usuario?
          </p>
        </Modal>
        <Modal
          title="Confirmar Eliminación"
          open={CategorydeleteModalVisible}
          onOk={handleCategoryConfirmDelete}
          onCancel={() => setCategoryDeleteModalVisible(false)}
          okText="Eliminar"
          cancelText="Cancelar"
        >
          <p>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", marginRight: "8px" }}
            />
            ¿Estás seguro de que deseas eliminar esta categoria?
          </p>
        </Modal>
        <Modal
          title="Crea una categoría"
          open={createCategoryVisible}
          onOk={() => {
            console.log("Valores del formulario:", categoryForm);
            handleSaveCategory();
          }}
          onCancel={hideCreateCategoryModal}
        >
          {createCategoryModalContent}
        </Modal>
      </div>
    </div>
  );
};

export default UserDashboard;
