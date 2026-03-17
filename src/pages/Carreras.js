import { Layout, Row, Col } from 'antd';
import { getCarreras  } from '../api/participantesApi';
import { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Button, Popconfirm, Input  } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Carreras() {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleEdit = (record) => {
    console.log("Editar:", record.id);
    navigate(`/usuarios/editar/${record.id}`);
  };

  const handleDelete = async (record) => {

  };

  const obtenerCarreras = async () => {
    try {
      setLoading(true);
      const data = await getCarreras();
      if (data.success) {
        setParticipantes(data.data);
      } else {
        setError(data.message || "Error desconocido");
      }
    } catch (err) {
      setError(err.message || "Fallo al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  if (loading)
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <Spin tip="Cargando Carreras..." size="large" />
    </div>
  );

  if (error)
  return (
    <Alert
      title="Error"
      description={error}
      type="error"
      showIcon
    />
  );

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Año', dataIndex: 'anio', key: 'anio' },
    {
      title: 'Activa',
      dataIndex: 'activa',
      key: 'activa',
      align: 'center',
      render: (value) =>
        value ? (
          <CheckCircleOutlined style={{ color: 'green', fontSize: 18 }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red', fontSize: 18 }} />
        ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
      <Space>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Editar
        </Button>
        <Popconfirm
          title="¿Seguro que deseas eliminar?"
          onConfirm={() => handleDelete(record)}
          okText="Sí"
          cancelText="No"
        >
        <Button
          danger
          icon={<DeleteOutlined />}
        >
          Eliminar
        </Button>
        </Popconfirm>
      </Space>
    ),
  },
  ];

  const filteredData = participantes.filter((item) =>
    item.nombre?.toLowerCase().includes(searchText.toLowerCase())
  );


 
  return (
      <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
      <h1>Listado de Carreras</h1>

      <Row style={{ marginBottom: 16 }}>
        <Col span={4}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Buscar Carrera..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            scroll={{ x: true }}
          />
        </Col>
      </Row>
    </Content>
  </Layout>
  );
}
export default Carreras;