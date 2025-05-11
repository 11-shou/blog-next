import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';

export function usePosts(category = '') {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts(category);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  return { posts, loading, error };
} 