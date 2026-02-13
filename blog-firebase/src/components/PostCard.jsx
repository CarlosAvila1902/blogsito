import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const summary = post.content.length > 100 
    ? post.content.substring(0, 100) + '...' 
    : post.content;

  const date = new Date(post.createdAt).toLocaleDateString();

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '20px', 
      marginBottom: '15px', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '5px', color: '#333' }}>{post.title}</h2>
      <small style={{ color: '#888' }}>Publicado el: {date}</small>
      
      <p style={{ color: '#555', lineHeight: '1.5' }}>{summary}</p>
      
      <Link 
        to={`/post/${post.id}`} 
        style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Leer más →
      </Link>
    </div>
  );
};

export default PostCard;