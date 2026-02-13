import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addPost } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el form
    
    if (!title.trim() || !content.trim()) {
      alert("Por favor llena todos los campos");
      return;
    }

    setIsSubmitting(true);
    
    await addPost(title, content);
    
    setIsSubmitting(false);
    
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h2 style={{ marginTop: 0 }}>Crear Nuevo Artículo</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Campo Título */}
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título del Post:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Escribe un título llamativo..."
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Campo Contenido */}
        <div>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Escribe el contenido de tu artículo aquí..."
            rows="8"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '12px 20px',
            backgroundColor: isSubmitting ? '#94c9a9' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            alignSelf: 'flex-start'
          }}
        >
          {isSubmitting ? 'Publicando en Firebase...' : 'Publicar Artículo'}
        </button>

      </form>
    </div>
  );
};

export default CreatePost;