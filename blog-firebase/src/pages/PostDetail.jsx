import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const PostDetail = () => {
  const { id } = useParams();
  
  const { state, addComment } = useBlog();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const post = state.posts.find(p => p.id === id);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Post no encontrado o cargando...</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    await addComment(id, commentText);
    setCommentText(''); // Limpiamos el input
    setIsSubmitting(false);
  };

  const date = new Date(post.createdAt).toLocaleDateString();

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
      {/* Botón para volver al Home */}
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff', marginBottom: '20px', display: 'inline-block' }}>
        ← Volver a todos los artículos
      </Link>

      {/* Contenido del Post */}
      <article style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ marginTop: 0 }}>{post.title}</h1>
        <small style={{ color: '#888' }}>Publicado el: {date}</small>
        <p style={{ lineHeight: '1.6', fontSize: '18px', marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </p>
      </article>

      {/* Sección de Comentarios */}
      <section>
        <h3>Comentarios ({post.comments?.length || 0})</h3>
        
        {/* Listado de comentarios */}
        <div style={{ marginBottom: '20px' }}>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} style={{ backgroundColor: '#f1f1f1', padding: '10px 15px', borderRadius: '5px', marginBottom: '10px' }}>
                <p style={{ margin: 0 }}>{comment.content}</p>
                <small style={{ color: '#888', fontSize: '12px' }}>
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>Sé el primero en comentar.</p>
          )}
        </div>

        {/* Formulario simple para agregar comentario */}
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Escribe un comentario..."
            required
            style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: isSubmitting ? '#ccc' : '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Comentar'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostDetail;