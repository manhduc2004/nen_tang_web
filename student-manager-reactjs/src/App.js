import 'bootstrap/dist/css/bootstrap.min.css';
import StudentManager from './components/StudentManager';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">Student CRUD</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="/">Trang chủ</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">Về chúng tôi</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Liên hệ</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main container */}
      <StudentManager />

      {/* Footer */}
      <footer className="bg-secondary text-white py-3 mt-auto">
        <div className="container">
          <p className="mb-0 text-center">© 2025 Bùi Đức</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
