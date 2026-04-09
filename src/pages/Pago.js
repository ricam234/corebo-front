import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// 🔑 Tu clave pública de Stripe
const stripePromise = loadStripe('TU_PUBLIC_KEY');

// 🔹 Estilos opcionales del CardElement
const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#9e2146'
    }
  }
};

// 🔹 Componente interno del formulario
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setMensaje('');

    try {
      // 1️⃣ Crear PaymentIntent en backend
      const response = await fetch('http://localhost:8000/api/pago', {
        method: 'POST'
      });

      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error('No se pudo obtener el clientSecret');
      }

      // 2️⃣ Confirmar pago
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setMensaje(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMensaje('✅ Pago realizado correctamente');
      }

    } catch (error) {
      setMensaje('❌ Error: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Pago de inscripción</h2>

      <div style={styles.card}>
        <CardElement options={CARD_OPTIONS} />
      </div>

      <button type="submit" disabled={!stripe || loading} style={styles.button}>
        {loading ? 'Procesando...' : 'Pagar'}
      </button>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
    </form>
  );
};

// 🔹 Componente principal
const Pago = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

// 🔹 Estilos simples
const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px'
  },
  card: {
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    borderRadius: '5px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#6772e5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  mensaje: {
    marginTop: '15px'
  }
};

export default Pago;