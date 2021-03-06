import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  /* 
  //Client side fetching of comments
  //With this commented, it means we are using serverside pre-rendering
  const [eventComments, setEventComments] = useState([]);

  async function fetchComments() {
    try {
      const response = await fetch(`/api/comments/${eventId}`);
      if (!response.ok) {
        throw new Error('Could not fetch comments!');
      }

      const data = await response.json();

      setEventComments(data.response.comments);
    } catch (error) {
      console.error(`💥💥💥 ${error.message}`);
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);
 */
  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    // send data to API

    // send the data
    const response = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not save your comment! Please try again');
    }

    const data = await response.json();

    console.log(data.response);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={props.comments} />}
    </section>
  );
}

export default Comments;
