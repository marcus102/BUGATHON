import React, { useState } from 'react';
import classes from './CommentSectionCmp.module.css';
import Comment from './CommentCmp';
import Text from '../../utils/TextSection';
import { Input } from '../../utils/InputSection';
import { ButtonContainer } from '../../utils/ButtonSection';

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'This is the comment made by @paul 1m ago',
      user: { name: '@paul', avatar: 'https://via.placeholder.com/40' },
      time: '1m ago',
      likes: 20,
      replies: [
        {
          id: 2,
          text: 'This is the reply of @Anna to @paul comment 5m ago',
          user: { name: '@Anna', avatar: 'https://via.placeholder.com/40' },
          time: '5m ago',
          likes: 10,
          replies: [],
        },
      ],
    },

    {
      id: 3,
      text: 'This is the comment made by @paul 1m ago',
      user: { name: '@paul', avatar: 'https://via.placeholder.com/40' },
      time: '1m ago',
      likes: 20,
      replies: [
        {
          id: 4,
          text: 'This is the reply of @Anna to @paul comment 5m ago',
          user: { name: '@Anna', avatar: 'https://via.placeholder.com/40' },
          time: '5m ago',
          likes: 10,
          replies: [],
        },
      ],
    },
    {
      id: 5,
      text: 'This is the comment made by @paul 1m ago',
      user: { name: '@paul', avatar: 'https://via.placeholder.com/40' },
      time: '1m ago',
      likes: 20,
      replies: [
        {
          id: 6,
          text: 'This is the reply of @Anna to @paul comment 5m ago',
          user: { name: '@Anna', avatar: 'https://via.placeholder.com/40' },
          time: '5m ago',
          likes: 10,
          replies: [],
        },
      ],
    },
  ]);

  const [visibleComments, setVisibleComments] = useState(1);

  const handleAddComment = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      text: commentText,
      user: { name: 'Current User', avatar: 'https://via.placeholder.com/40' },
      time: 'Just now',
      likes: 0,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
  };

  return (
    <div className={classes.comment_section}>
      {/* <Text textStyle={'p-3'} h5={'Comments'} /> */}

      {comments.slice(0, visibleComments).map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      {visibleComments < comments.length && (
        <ButtonContainer
          children={'Load more comments...'}
          onClick={handleLoadMore}
          buttonContainerMainContainer={classes.load_more_button}
        />
      )}

      <Input
        inputMainContainerStyle={'mt-3'}
        type="text"
        placeholder="Add a comment..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddComment(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default CommentSection;
