import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/Frank1.png";
import './AdminDashboard.scss';
import { UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UsergroupAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Table, Switch, Select, Button, Modal } from 'antd';
const avatar = require.context('../../assets/avatar');


const UserDashboard = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Perfil');
    const [userData, setUserData] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);
    const [updatedUsers, setUpdatedUsers] = useState([]);
    const [userDocument, setuserDocument] = useState("");
    const token = localStorage.getItem("accessToken");
    const [pagination, setPagination] = useState({
        pageSize: 5,
        current: 1,
        total: usersData.length,
    });
    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };
    const avatarURL = "";
    const { Option } = Select;
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
        { label: 'Usuarios', icon: <UsergroupAddOutlined /> },
        { label: 'Configuración', icon: <SettingOutlined /> }
    ];

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/v1/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                const usersData = await response.json();
                setUsersData(usersData);
            } else {
                console.error('Error al obtener la lista de usuarios:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    };


    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'userId': userId,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                console.log(response);
                console.error('Error al obtener información del usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    };

    useEffect(() => {
        const decodedToken = jwtDecode(token);
        const document = decodedToken.document
        setuserDocument(document);
        if (selectedOption === 'Usuarios') {
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
                console.error('Error al decodificar el token:', error.message);
            }
        }

    }, [selectedOption, token]);

    const showDeleteModal = (userId) => {
        setUserToDeleteId(userId);
        setDeleteModalVisible(true);
    };

    const handleDeleteUser = async (userId) => {
        try {
            showDeleteModal(userId);

        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/user/${userToDeleteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            if (response.ok) {
                fetchUsers();
                setDeleteModalVisible(false);
            } else {
                console.error(`Error al eliminar el usuario con ID ${userToDeleteId}:`, response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    };

    const handleSwitchChange = (checked, record) => {
        const updatedUser = { ...record, active: checked };
        const updatedUsersCopy = [...updatedUsers, updatedUser];
        setUpdatedUsers(updatedUsersCopy);

        setUsersData(prevUsers => prevUsers.map(user => (user._id === record._id ? updatedUser : user)));
    };

    const handleSelectChange = (value, record) => {
        const updatedUser = { ...record, role: value };
        const updatedUsersCopy = [...updatedUsers, updatedUser];
        setUpdatedUsers(updatedUsersCopy);

        setUsersData(prevUsers => prevUsers.map(user => (user._id === record._id ? updatedUser : user)));
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
            "email"
        ];

        const baseColumns = columnsToShow.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key: key,
        }));

        const actionColumn = {
            title: 'Acciones',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Button type="danger" className='delete-button' onClick={() => handleDeleteUser(record._id)}>
                    Eliminar
                </Button>
            ),
        };

        return baseColumns.concat([
            {
                title: 'Active',
                dataIndex: 'active',
                render: (text, record) => (
                    <Switch
                        checked={text}
                        onChange={(checked) => handleSwitchChange(checked, record)}
                    />
                ),

            },
            {
                title: 'Role',
                dataIndex: 'role',
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


    const updateActiveUsers = async () => {
        try {
            const activePromises = updatedUsers.map(async ({ _id, active }) => {

                console.log(typeof active);
                console.log(active);

                const response = await fetch(`http://localhost:3001/api/v1/user/${_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify({ active }),
                });
                if (!response.ok) {
                    console.error(`Error al actualizar el usuario con ID ${_id} (active):`, response.statusText);
                } else {
                    console.log(`Usuario con ID ${_id} (active) actualizado exitosamente en la base de datos.${active}`);
                    console.log("respuesta del back", response);
                }
            });

            await Promise.all(activePromises);
        } catch (error) {
            console.error('Error en la solicitud de actualización de active:', error.message);
        }
    };

    const updateRoleUsers = async () => {
        try {
            const rolePromises = updatedUsers.map(async ({ _id, role }) => {
                const response = await fetch(`http://localhost:3001/api/v1/user/${_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify({ role }),
                });

                if (!response.ok) {
                    console.error(`Error al actualizar el usuario con ID ${_id} (role):`, response.statusText);
                } else {
                    console.log(`Usuario con ID ${_id} (role) actualizado exitosamente en la base de datos.`);
                }
            });

            await Promise.all(rolePromises);
        } catch (error) {
            console.error('Error en la solicitud de actualización de role:', error.message);
        }
    };

    const handleConfirmChanges = async () => {
        try {
            await updateActiveUsers();
            await updateRoleUsers();


            setSuccessModalVisible(true);
            setUpdatedUsers([]);
        } catch (error) {
            console.error('Error en la solicitud de cambios generales:', error.message);
        }
    };

    return (
        <div>
            <div className='headeradmin'>
                <img className="uamLogo" src={logo} alt="Logo UAM" />
                <button className="menu-button" onClick={toggleMenu}>
                    {menuVisible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>
            <div className='body-containeradmin'>
                <div className='slidecontaineradmin'>
                    <div className="icon-containeradmin">
                        {menuOptions.map((option) => (
                            <div className='iconadmin' key={option.label} onClick={() => handleMenuClick(option.label)}>
                                {option.icon}
                                {menuVisible && <span className='menu-option-textadmin'>{option.label}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='contentadmin'>
                    {selectedOption === 'Perfil' && (
                        <div className='avatar-container'>
                            <img className="avatar-user" src={avatar.keys().includes(`./${userDocument}.png`) ? avatar(`./${userDocument}.png`) : require('../../assets/images/defaultFrank.png')} alt="Imagen de usuario" style={{ cursor: 'pointer' }} />
                        </div>
                    )}
                    {selectedOption === 'Usuarios' && (
                        <div className='content-users'>
                            <div>
                                <h2>Lista de usuarios</h2>
                            </div>
                            <div className='table'>
                                <Table dataSource={usersData} columns={generateColumns()} pagination={pagination}
                                    onChange={handleTableChange} />
                            </div>
                            <div className='button-confirm-changes'>
                                <Button type="primary" onClick={handleConfirmChanges}>
                                    Confirmar Cambios
                                </Button>
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
                    <p><ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                        ¿Estás seguro de que deseas eliminar este usuario?</p>
                </Modal>
            </div>
        </div>
    );
};

export default UserDashboard;
