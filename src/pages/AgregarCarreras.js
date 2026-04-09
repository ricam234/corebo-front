import { Form, Input, Button, Card, DatePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import { agregarCarreras } from '../api/participantesApi';
const AgregarCarreras = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/carreras");
    };
    
  const onFinish = async (values) => {
  try {
    const datosEnviar = {
      ...values,
      fechaInicio: values.fechaInicio
        ? values.fechaInicio.format("YYYY-MM-DD")
        : null,
      fechaFin: values.fechaFin
        ? values.fechaFin.format("YYYY-MM-DD")
        : null,
    };
    console.log("Datos a enviar:", datosEnviar);
    const resultado = await agregarCarreras(datosEnviar);
    if (resultado.data.id) {
        message.success("¡Carrera agregada correctamente!");

        navigate("/carreras");
    }
    } catch (error) {
        console.error("Error al guardar:", error);
    }
}
  return (
        <div
        style={{
        display: "",
        justifyContent: "",
        alignItems: "",
        minHeight: "",
        background: "#f5f5f5"
        }}
        >
        <Card title="" style={{ width: "100%" }}>
        <h2>Agregar Carreras</h2>
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        htmlType="submit"
        >        
        <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
            { required: true, message: "El nombre es obligatorio" }
        ]}
        >
        <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
            label="Fecha de Inicio"
            name="fechaInicio"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}
            >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
            />
        </Form.Item>
        <Form.Item
            label="Fecha de Fin"
            name="fechaFin"
            rules={[{ required: true, message: "La fecha es obligatoria" }]}
            >
            <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
            />
        </Form.Item>
        <Form.Item
          label="Año"
          name="anio"
          rules={[
            { required: true, message: "El Año es obligatorio" }
          ]}
        >
        <Input placeholder="Año" />
        </Form.Item>
        <Button
            type="primary"
            
            htmlType="submit"
            style={{ marginRight: 10 }}
            >
            Guardar
        </Button>
        <Button 
                onClick={handleCancel} 
                style={{
                    backgroundColor: "#ff4d4f",
                    borderColor: "#ff4d4f",
                    color: "#fff"
                }}
        >
            Cancelar
        </Button>
        </Form>
        </Card>
        </div>
      );
};

export default AgregarCarreras;