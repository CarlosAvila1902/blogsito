import { Routes, Route, Link } from 'react-router-dom';
import { useBlog } from './context/BlogContext';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

function App() {
  const { state } = useBlog();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      
      {/* Navegación Básica */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #0E0E17', paddingBottom: '10px', marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          Mi Blog
        </Link>
        <Link to="/create" style={{ padding: '10px 15px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          + Crear Nuevo Post
        </Link>
      </nav>

      {/* Manejo de estados globales de la base de datos */}
      {state.error && <p style={{ color: 'red' }}>Error: {state.error}</p>}
      {state.loading && <p>Cargando información desde Firebase...</p>}

      {/* Aquí vivirán nuestras páginas */}
      {!state.loading && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      )}

    </div>
  );
}

export default App;