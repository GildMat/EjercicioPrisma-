import { useEffect, useState } from 'react';
import styles from '../styles/listadoProductos.module.css'; // Importa los estilos

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/api/productos/listar')
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Listado de Productos</h1>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Precio del Producto</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td className={styles.productName}>{producto.nombre}</td>
              <td className={styles.productPrice}>Q{producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoProductos;
