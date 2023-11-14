import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import FotoFrank from '../../assets/images/RecuperarContraseña.png';
import "./ChangePassword.scss";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const handleSubmit = (values) => {
    const { password, confirmPassword } = values;

    if (password === confirmPassword) {
      console.log('Contraseña cambiada con éxito:', password);
      form.resetFields();
      setError('');
    } else {
      setError('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='format'>
        <div className='frankLogo'>
        <img src={FotoFrank} alt="Logo" className='full-house-logo' />
        </div>
        <div className='container-principal'>
      <div><h2>Cambiar Contraseña</h2></div>
      <div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa la nueva contraseña' }]}
        >
          <Input type="password" placeholder='Ingrese su nueva contraseña' />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Por favor confirma la contraseña' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las contraseñas no coinciden'));
              },
            }),
          ]}
        >
          <Input type="password" placeholder='Confirme su contraseña'/>
        </Form.Item>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '10px' }} />}
        <Form.Item>
            <div className='button-confirm'>
            <Button type="primary" htmlType="submit" >
            Cambiar Contraseña
          </Button>
            </div>
        </Form.Item>
      </Form>
      </div>
    </div>
    </div>
    
  );
};

export default ChangePassword;
