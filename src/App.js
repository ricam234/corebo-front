import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
import Carreras from './pages/Carreras'; 
import Participantes from './pages/Participantes'; 
import AgregarParticipantes from './pages/AgregarParticipantes'; 
import EditarCarrera from './pages/EditarCarrera'; 
import AgregarCarreras from './pages/AgregarCarreras'; 
import EditarUsuario from "./pages/EditarUsuario";
import NotFound from './pages/NotFound';
import AdminLayout from './components/AdminLayout';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas (admin) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/participantes"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Participantes />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/agregar"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AgregarParticipantes />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/carreras"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Carreras />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/agregarCarreras"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AgregarCarreras />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios/editar/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <EditarUsuario  />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/carrera/editar/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <EditarCarrera  />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
