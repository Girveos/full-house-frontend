import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/Frank1.png";
import './AdminDashboard.scss';
import { UserOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';
import { Table, Switch, Select, Button, Modal } from 'antd';


const UserDashboard = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Perfil');
    const [userData, setUserData] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

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
        const token = localStorage.getItem('accessToken');

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
    }, [selectedOption]);


    const generateColumns = () => {
        if (usersData.length === 0) {
            return [];
        }

        const columnsToShow = [
            "_id",
            "firstname",
            "lastname",
            "country",
            "depto",
            "municipality",
            "state",
            "documentType",
            "document",
            "email"
        ];

        return columnsToShow.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key: key,
        })).concat([
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
        ]);
    };


    const handleSwitchChange = (checked, record) => {
        const updatedUsersData = usersData.map(user =>
            user._id === record._id
                ? { ...user, active: checked, originalActive: user.active }
                : user
        );
    console.log(checked);
        setUsersData(updatedUsersData);
    console.log(updatedUsersData);
    };
    

    const handleSelectChange = (value, record) => {
        const updatedUsersData = usersData.map(user =>
            user._id === record._id ? { ...user, role: value } : user
        );

        setUsersData(updatedUsersData);
    };

    const handleConfirmChanges = async () => {
        try {
            const updatedUsers = usersData.filter(({ originalActive, originalRole, ...rest }) => {
                return rest.active !== originalActive || rest.role !== originalRole;
            });
    
            const promises = updatedUsers.map(async ({ _id, active, role }) => {
                const response = await fetch(`http://localhost:3001/api/v1/user/${_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify({ active, role }),
                });
    
                if (!response.ok) {
                    console.error(`Error al actualizar el usuario con ID ${_id}:`, response.statusText);
                }else{
                    console.log(response);
                }
            });
    
            await Promise.all(promises);
    
            setUsersData(prevUsersData => prevUsersData.map(({ _id, originalActive, originalRole, ...rest }) => ({
                _id,
                active: originalActive,
                role: originalRole,
                ...rest,
            })));
            console.log(usersData);
            setSuccessModalVisible(true);
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
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
                    {selectedOption === 'Usuarios' && (
                        <div className='content-users'>
                            <div>
                                <h2>Lista de usuarios</h2>
                            </div>
                            <div className='table'>
                                <Table dataSource={usersData} columns={generateColumns()} />
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
            </div>
        </div>
    );
};

export default UserDashboard;
