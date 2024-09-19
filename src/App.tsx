
import React, { useState } from 'react';
import './App.scss';
import avatar from './images/bozai.png'; // Assuming you have an image for avatar
import { useComments } from './hooks/useComments'; // Importing the custom hook
import { v4 as uuidv4 } from 'uuid'; // For unique IDs for new comments
import _ from 'lodash'; // For sorting comments
import dayjs from 'dayjs'; // For formatting dates

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

const App: React.FC = () => {
  const { comments, loading, error } = useComments(); // Fetching comments from the hook
  const [newComment, setNewComment] = useState<string>(''); // State for a new comment
  const [author, setAuthor] = useState<string>(''); // State for the author's name

  // Function to handle adding a new comment
  const handleAddComment = () => {
    const newCommentObj: Comment = {
      id: uuidv4(), // Generates a unique ID
      text: newComment,
      author: author,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss') // Current date
    };

    // Adding the new comment to the comment list (this should ideally be a POST request)
    comments.push(newCommentObj);

    // Reset input fields
    setNewComment('');
    setAuthor('');
  };

  // Sort comments by date
  const sortedComments = _.orderBy(comments, ['date'], ['desc']);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <h1>Forum Comments</h1>

      {/* Comment Input Section */}
      <div className="comment-input">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>

      {/* Comment List */}
      <div className="comment-list">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-avatar bili-avatar"> {/* Updated class name */}
              <img src={avatar} alt="avatar" className="bili-avatar-img" /> {/* Updated class name */}
            </div>
            <div className="comment-content">
              <h4>{comment.author}</h4>
              <p>{comment.text}</p>
              <small>{comment.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
