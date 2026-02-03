
import { Layout, Card, Row, Col, Statistic } from 'antd';

const { Content } = Layout;

function Dashboard() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <h1>Bienvenido al Dashboard</h1>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Usuarios Totales" value={245} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Activos Hoy" value={89} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Dashboard;