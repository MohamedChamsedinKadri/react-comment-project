import { useState, useEffect } from 'react';

// Define the structure of the comment
interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

// Custom Hook to fetch comments from the API
export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:3004/comments');
        if (!response.ok) {
          throw new Error('Error fetching comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err: unknown) {
        // Explicitly type the error as an instance of Error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return { comments, loading, error };
};

