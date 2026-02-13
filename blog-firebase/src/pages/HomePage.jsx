import { useBlog } from '../context/BlogContext';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const { state } = useBlog();
  const { posts } = state;

  return (
    <div>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Últimos Artículos
      </h1>
      
      {/* Si no hay posts, mostramos un mensaje amigable */}
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No hay artículos publicados todavía. ¡Anímate a crear el primero!
        </p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default HomePage;