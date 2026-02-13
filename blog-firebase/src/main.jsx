import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter habilita la navegación entre páginas */}
    <BrowserRouter>
      {/* BlogProvider inyecta el estado global a toda la app */}
      <BlogProvider>
        <App />
      </BlogProvider>
    </BrowserRouter>
  </StrictMode>,
);