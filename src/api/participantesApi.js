import axiosInstance from './axiosInstance';

export const getParticipantesFin2025 = async () => {
  try {
    const response = await axiosInstance.get('/fin2025WS');
    return response.data; // { success, data: [...], total, ... }
  } catch (error) {
    // Puedes lanzar error personalizado o loguear
    console.error('Error al obtener participantes:', error);
    throw error; // o return { success: false, message: error.message }
  }
};

// Ejemplo POST si necesitas crear usuario después
export const crearUsuario = async (datos) => {
  try {
    const response = await axiosInstance.post('/usuarios', datos);
    return response.data;
  } catch (error) {
    throw error;
  }
};