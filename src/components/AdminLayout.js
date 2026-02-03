// src/components/AdminLayout.js
import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // para saber la ruta actual y resaltar

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Función para determinar qué item está activo
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return ['1'];
    if (path === '/usuarios') return ['2'];
    if (path === '/usuarios/crear') return ['3'];
    return ['1']; // fallback
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="dark"
        width={220}           // un poco más ancho como AdminLTE
        collapsedWidth={80}   // solo íconos cuando colapsado
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* Logo o título (puedes poner tu logo aquí) */}
        <div 
          style={{
            height: 64,
            background: 'rgba(255,255,255,0.1)',
            margin: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: collapsed ? 0 : 18,
            fontWeight: 'bold',
            transition: 'all 0.3s',
          }}
        >
          {collapsed ? 'A' : 'Admin Panel'}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getSelectedKey()}
          defaultOpenKeys={['1']}   // si agregas submenús
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: "Carreras",
              children: [                        // ← aquí van los ítems del submenú
                    {
                    key: '1-1',
                    label: <Link to="/dashboard/reportes">Lista</Link>,
                    },
                    {
                    key: '1-2',
                    label: <Link to="/dashboard/estadisticas">Agregar</Link>,
                    }
                ],
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: "Participantes",
              children: [                        // ← aquí van los ítems del submenú
                    {
                    key: '2-1',
                    label: <Link to="/agregar">Agregar</Link>,
                    },
                    {
                    key: '2-2',
                    label: <Link to="/carreras">Carrera Fin de Año 2025</Link>,
                    }
                ],
            },
            {
              key: '3',
              icon: <UserAddOutlined />,
              label: "Graficas",
            }
          ]}
        />
      </Sider>

      {/* Contenido principal */}
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin-left 0.3s' }}>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '18px' }}
          />

          {/* Espacio para usuario / logout */}
          <div>
            <Button type="text" icon={<LogoutOutlined />}>
              Cerrar sesión
            </Button>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}  {/* Aquí van tus páginas: Dashboard, CrearUsuario, etc. */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;