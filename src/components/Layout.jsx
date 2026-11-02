import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-container">
      {/* Encabezado principal del sistema */}
      <header className="header-principal">
        <div className="header-brand">
          <h1 className="header-titulo">REGISTRA-IP</h1>
          <span className="header-sub">Panel de Creadores</span>
        </div>

        {/* Enlaces de navegación */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Registro</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>
      </header>

      {/* Área donde se cargan Registro.jsx o Dashboard.jsx */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Pie de página estático */}
      <footer className="footer-principal">
        <p>&copy; REGISTRA-IP —UPIICSA</p>
      </footer>
    </div>
  );
}