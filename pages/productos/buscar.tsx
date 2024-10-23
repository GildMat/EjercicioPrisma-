import { useState } from 'react';
import styles from '../styles/buscarProducto.module.css'; 

const BuscarProducto = () => {
  const [codigo, setCodigo] = useState('');
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleSearch = async () => {
    if (!codigo) {
      setMensaje('Por favor ingrese un código de producto');
      return;
    }

    const res = await fetch(`/api/productos/${codigo}`);
    const data = await res.json();

    if (res.ok) {
      setProducto(data);
      setMensaje('');
    } else {
      setProducto(null);
      setMensaje('Producto no encontrado');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscar Producto</h1>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Ingrese código de producto"
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Buscar
      </button>

      {/* Mensaje de error o información */}
      {mensaje && <p>{mensaje}</p>}

      {/* Mostrar detalles del producto si está disponible */}
      {producto && (
        <div className={styles.productDetails}>
          <h2 className={styles.productName}>{producto.nombre}</h2>
          <p className={styles.productPrice}>Precio: Q{producto.precio}</p>
          <p className={styles.productStock}>Stock: {producto.stock}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarProducto;
