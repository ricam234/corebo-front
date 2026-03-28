import { useState, useEffect } from "react";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      // guardar token
      localStorage.setItem("token", data.token);
      // redirigir
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  useEffect(() => {
    document.body.style.backgroundImage = 
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://www.corebocuautla.com.mx/admin/public/images/backgroud.jpg')";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";

    // limpiar cuando salgas del componente
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={{ color: "#fff", textAlign:"center"}}>Iniciar sesión</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  inicio: {
    color: "#fff",
  },
  input: {
    marginBottom: "1rem",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    background: "transparent",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: "4px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  
};