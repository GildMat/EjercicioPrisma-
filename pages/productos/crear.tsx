import { useState } from 'react';
import styles from '../styles/crearProducto.module.css'; // Importando el módulo CSS

const CrearProducto = () => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/productos/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ codigo, nombre, precio, stock }),
    });

    const data = await res.json();

    if (res.ok) {
      setMensaje('Producto creado exitosamente');
      setCodigo('');
      setNombre('');
      setPrecio('');
      setStock('');
    } else {
      setMensaje('Error al crear producto');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Producto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Crear Producto</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearProducto;
