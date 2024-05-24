import React, { useState } from 'react';
import classes from './CommentSectionCmp.module.css';
import Comment from './CommentCmp';
import Text from '../../utils/TextSection';
import { Input } from '../../utils/InputSection';

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
  ]);

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

  return (
    <div className={classes.comment_section}>
        <Text textStyle={'p-3'} h5={'Comments'} />
      
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}

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

// import React, { useState } from 'react';
// import classes from './CommentSectionCmp.module.css';
// import Comment from './CommentCmp';
// import Text from '../../utils/TextSection';
// import { Input } from '../../utils/InputSection';

// const CommentSection = () => {
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       text: 'This is the comment made by @paul 1m ago',
//       user: { name: '@paul', avatar: 'https://via.placeholder.com/40' },
//       time: '1m ago',
//       likes: 20,
//       replies: [
//         {
//           id: 2,
//           text: 'This is the reply of @Anna to @paul comment 5m ago',
//           user: { name: '@Anna', avatar: 'https://via.placeholder.com/40' },
//           time: '5m ago',
//           likes: 10,
//           replies: [],
//         },
//       ],
//     },
//   ]);

//   const handleAddComment = (commentText) => {
//     const newComment = {
//       id: comments.length + 1,
//       text: commentText,
//       user: { name: 'Current User', avatar: 'https://via.placeholder.com/40' },
//       time: 'Just now',
//       likes: 0,
//       replies: [],
//     };
//     setComments([...comments, newComment]);
//   };

//   return (
//     <div className={classes.comment_section}>
//       <Text textStyle={'p-3'} h5={'Comments'} />
//       <div className={`${classes.comment_content}`}>
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} />
//         ))}
//         <div className="mt-3">
//           <Input
//             type="text"
//             placeholder="Add a comment..."
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleAddComment(e.target.value);
//                 e.target.value = '';
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;
