import { useState } from 'react';
import styles from '../styles/productoactualizar.module.css'; // Importar los estilos

const ProductoForm = () => {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Función para buscar el producto por código
  const handleBuscarProducto = async () => {
    if (!codigo) {
      setMensaje('Por favor ingresa un código');
      return;
    }

    const res = await fetch(`/api/productos/update/${codigo}`);
    const data = await res.json();

    if (res.ok) {
      setNombre(data.nombre);
      setPrecio(data.precio);
      setStock(data.stock);
      setMensaje('Producto encontrado');
    } else {
      setMensaje('Producto no encontrado');
    }
  };

  // Función para guardar los cambios del producto
  const handleGuardarCambios = async (e) => {
    e.preventDefault();
  
    if (!codigo || !nombre || !precio || !stock) {
      setMensaje('Por favor completa todos los campos');
      return;
    }
  
    const res = await fetch(`/api/productos/update/${codigo}`, {
      method: 'PUT',  // Asegúrate de que el método es PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, precio: parseFloat(precio), stock: parseInt(stock) }),
    });
  
    if (res.ok) {
      setMensaje('Producto actualizado exitosamente');
    } else {
      setMensaje('Error al actualizar producto');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Actualizar Producto</h1>

      {/* Buscar producto */}
      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleBuscarProducto} className={styles.button}>
        Buscar Producto
      </button>

      {/* Campos del producto */}
      <form onSubmit={handleGuardarCambios}>
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
        <button type="submit" className={styles.button}>
          Guardar Cambios
        </button>
      </form>

      {/* Mensaje */}
      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
    </div>
  );
};

export default ProductoForm;
