import { Layout, Row, Col } from 'antd';
import { getCarreras, activarCarrera, eliminarCarrera  } from '../api/participantesApi';
import { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Button, Popconfirm, Input, Modal, Radio, message} from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

function Carreras() {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarrera, setSelectedCarrera] = useState(null);
 
  //const [saving, setSaving] = useState(false);


  const showModal = async () => {
    setIsModalOpen(true);
     
     const carreraActiva = participantes.find(carrera => carrera.activa === true);
     console.log(carreraActiva);
     if (carreraActiva) {
        setSelectedCarrera(carreraActiva.id);  // Esto seleccionará el radio button
      } else if (participantes.length > 0) {
        // Si no hay activa, seleccionar la primera
        setSelectedCarrera(participantes[0].id);
      }
  };

  

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleEdit = (record) => {
    console.log("Editar:", record.id);
    navigate(`/carrera/editar/${record.id}`);
  };

  const handleDelete = async (record) => {
    try {
      const response = await eliminarCarrera(record.id);

      // ✅ Solo actualizas si sí se eliminó
      setParticipantes((prev) => prev.filter(c => c.id !== record.id));

      message.success(response.message || 'Carrera eliminada correctamente');

    } catch (error) {
      console.error(error);

      // 🔥 Extraer info del backend
      const status = error.response?.status;
      const backendMessage = error.response?.data?.message;

      // 🎯 Manejo específico
      if (status === 409) {
        message.warning(backendMessage || 'No se puede eliminar una carrera activa');
      } else if (status === 404) {
        message.error('La carrera ya no existe');
      } else {
        message.error(backendMessage || 'Error al eliminar la carrera');
      }
    }
  };

  const handleGuardar = async () => {
  if (selectedCarrera) {
    // Buscar la carrera completa seleccionada
    const carreraSeleccionada = participantes.find(
      carrera => carrera.id === selectedCarrera
    );
    
    console.log('ID seleccionado:', selectedCarrera);
    console.log('Carrera completa:', carreraSeleccionada);
    try {
      //setSaving(true);
      const response = await activarCarrera(selectedCarrera);
      
      if (response.success) {
        // Mostrar mensaje de éxito
        message.success(response.message || 'Carrera activada correctamente');
        
        // Actualizar la lista local para mostrar la carrera activa actualizada
        const carrerasActualizadas = participantes.map(carrera => ({
          ...carrera,
          activa: carrera.id === response.data.id
        }));
        setParticipantes(carrerasActualizadas);
        
        // Cerrar modal
        setIsModalOpen(false);
        
        // Opcional: Recargar todas las carreras si es necesario
        // await cargarCarreras();
      } else {
        message.error(response.message || 'Error al activar la carrera');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error(error.response?.data?.message || 'Error al guardar la carrera');
    } finally {
      //setSaving(false);
    }

    // Aquí puedes hacer lo que necesites con la carrera seleccionada
    // Por ejemplo: guardar en otro estado, llamar a una API, etc.
    
    // Cerrar el modal si es necesario
    // setIsModalOpen(false);
  } else {
    // Mostrar mensaje de error o notificación
    console.log('No hay carrera seleccionada');
  }
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
    { title: 'Fecha Inicio', dataIndex: 'fechaInicio', key: 'fechaInicio', render: (value) => new Date(value).toLocaleDateString() },
    { title: 'Fecha Fin', dataIndex: 'fechaFin', key: 'fechaFin', render: (value) => new Date(value).toLocaleDateString() },
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
      <Row>
       <Col span={12}>
       <h1>Listado de Carreras</h1>
       </Col>
      </Row>
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
        <Col span={4} style={{ marginLeft: 16 }}>
          <Button
          success
          icon={<SettingOutlined />}
          onClick={showModal}
        >
          Activar Carrera
       </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Modal 
          title="Selecciona la Carrera Activa" 
          open={isModalOpen} 
          onCancel={handleCancel}
          cancelText="Cancelar"
          footer={null}
        >
        <Radio.Group 
          onChange={(e) => setSelectedCarrera(e.target.value)} 
          value={selectedCarrera}  // Este valor determina cuál radio está seleccionado
          style={{ width: '100%' }}
        >
        <Row gutter={[16, 16]}>
              {participantes.map((carrera) => (
                <Col span={24} key={carrera.id}>
                  <Radio value={carrera.id} style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>{carrera.nombre}</strong>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {carrera.anio}
                        </div>
                      </div>
                    </div>
                  </Radio>
                </Col>
              ))}
        </Row>
        </Radio.Group>
        <Row>
        <Col span={12}>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={handleGuardar}>Guardar</Button>
        </Col>
        </Row>
        </Modal>
        </Col>
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