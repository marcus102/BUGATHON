import React, { useState } from 'react';
import classes from './CommentSectionCmp.module.css';
import Comment from './CommentCmp';
import { Input } from '../../utils/InputSection';
import { ButtonContainer, IconButton } from '../../utils/ButtonSection';
import { faChevronDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { DynamicLabelDropdownMenu } from '../../utils/ButtonSection';

const COMMENT_OPTION = [
  { id: '1', label: 'All ( Default )', href: null },
  { id: '2', label: 'Pinned', href: null },
  { id: '3', label: 'Trending', href: null },
  { id: '4', label: 'Relevent', href: null },
  { id: '6', label: 'Recent', href: null },
  { id: '7', label: 'Oldest', href: null },
  { id: '8', label: 'Hidden', href: null },
  { id: '9', label: 'My Replies', href: null },
];

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
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        user: { name: 'Current User', avatar: 'https://via.placeholder.com/40' },
        time: 'Just now',
        likes: 0,
        replies: [],
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
  };

  return (
    <div className={classes.comment_section}>
      <div className={classes.comment_header_drop_down_container}>
        <DynamicLabelDropdownMenu menuItems={COMMENT_OPTION} buttonIcon={faChevronDown} />
      </div>
      <div className={classes.comments_content_container}>
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
      </div>
      <div className={classes.comment_input_container}>
        <Input
          inputStyle={classes.comment_input}
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddComment();
            }
          }}
        />
        <IconButton
          inconButtonStyle={classes.comment_send_button_container}
          icon={faPaperPlane}
          onClick={handleAddComment}
        />
      </div>
    </div>
  );
};

export default CommentSection;
