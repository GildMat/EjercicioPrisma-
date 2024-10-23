import Link from 'next/link';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menú Principal</h1>
      <div style={styles.menu}>
        <Link href="/productos/crear" style={styles.link}>
          Crear Producto
        </Link>
        <Link href="/productos/listar" style={styles.link}>
          Listar Productos
        </Link>
        <Link href="/productos/buscar" style={styles.link}>
          Buscar Producto
        </Link>
        <Link href="/productos/actualizar" style={styles.link}>
          Actualizar Producto
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;
