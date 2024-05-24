import React, { useState } from 'react';
import Colors from '../../constants/colors';
import {
  faReply,
  faHeart,
  faChartSimple,
  faEllipsisVertical,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'react-bootstrap';
import classes from './CommentCmp.module.css';
import { IconTextButton, IconButton } from '../../utils/ButtonSection';
import { Input } from '../../utils/InputSection';
import UserProfileHeader from '../userProfileHeaderCmp';
import Text from '../../utils/TextSection';
import { ButtonContainer } from '../../utils/ButtonSection';

const COMMENT_REACTIONS_DATA = [
  {
    id: 'like',
    icon: faHeart,
    text: '10K',
    extra_text: null,
    activeColor: Colors.red_FF2B2B,
  },
  {
    id: 'pin',
    icon: faThumbTack,
    text: null,
    extra_text: null,
    activeColor: Colors.yellow_,
  },
  {
    id: 'impression',
    icon: faChartSimple,
    text: '50K',
    extra_text: null,
    activeColor: null,
  },
  {
    id: 'reply',
    icon: faReply,
    text: 'reply',
    extra_text: '10K',
    activeColor: null,
  },
];

function Comment({ comment, isReply = false }) {
  const [isReplying, setIsReplying] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [showMore, setShowMore] = useState(false);
  const [isActive, setIsActive] = useState(
    COMMENT_REACTIONS_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleAddReply = (replyText) => {
    const newReply = {
      id: replies.length + 1,
      text: replyText,
      user: { name: 'Current User', avatar: 'https://via.placeholder.com/40' },
      time: 'Just now',
      likes: 0,
      replies: [],
    };
    setReplies([...replies, newReply]);
    setIsReplying(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowAllReplies = () => {
    setShowAllReplies(!showAllReplies);
  };

  return (
    <div className={`${isReply ? classes.reply : classes.comment}`}>
      <div className="d-flex justify-content-between align-items-center">
        <UserProfileHeader user={comment.user} />
        <div className={`d-flex align-items-center ${classes.comment_options_contaimer}`}>
          <Text label12={'1mn ago'} />
          <IconButton icon={faEllipsisVertical} />
        </div>
      </div>
      <div className="m-3">
        <Text
          p16={
            <>
              {showMore ? comment.text : `${comment.text.slice(0, 50)}...`}
              {comment.text.length > 50 && (
                <ButtonContainer
                  children={showMore ? 'less' : 'more'}
                  onClick={toggleShowMore}
                  buttonContainerMainContainer={classes.more_button}
                />
              )}
            </>
          }
        />
        <hr className={classes.horizontal_line_container} />

        <div className={`${classes.reactions_nain_container}`}>
          {COMMENT_REACTIONS_DATA.map((data) => (
            <div key={data.id} className={classes.reactions_icon_text_button_container}>
              <Text label14={data.extra_text} />
              <IconTextButton
                inconTextButtonStyle={`${classes.reply_icon_text_container} ${
                  data.id === 'reply' && classes.reply_icon_text_custom_container
                }`}
                icon={data.icon}
                label={data.text}
                colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
                onClick={() => {
                  setIsActive((prev) => ({
                    ...prev,
                    [data.id]: !prev[data.id],
                  }));

                  data.id === 'reply' && handleReply();
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Collapse in={isReplying}>
        <div className="mt-3">
          <Input
            type="text"
            placeholder="Write a reply..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddReply(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </div>
      </Collapse>
      {replies.length > 0 && (
        <div className={`mt-3 mb-4 ${classes.replies_main_container}`}>
          {showAllReplies
            ? replies.map((reply) => <Comment key={reply.id} comment={reply} isReply />)
            : replies
                .slice(0, 2)
                .map((reply) => <Comment key={reply.id} comment={reply} isReply />)}
          {replies.length > 2 && (
            <button onClick={toggleShowAllReplies} className={classes.replies_button}>
              {showAllReplies ? 'Hide replies' : `View all ${replies.length} replies`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;

// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReply, faHeart, faCommentDots, faEllipsisH, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import { Button, Collapse } from 'react-bootstrap';
// import classes from './CommentCmp.module.css';
// import { IconTextButton } from '../../utils/ButtonSection';
// import { Input } from '../../utils/InputSection';
// import Image from '../../utils/ImageSection';
// import images from '../../assets/images/quote.jpg';
// import UserProfileHeader from '../userProfileHeaderCmp';

// const Comment = ({ comment }) => {
//   const [isReplying, setIsReplying] = useState(false);
//   const [replies, setReplies] = useState(comment.replies || []);

//   const handleReply = () => {
//     setIsReplying(!isReplying);
//   };

//   const handleAddReply = (replyText) => {
//     const newReply = {
//       id: replies.length + 1,
//       text: replyText,
//       user: 'Current User',
//       time: 'Just now',
//       replies: [],
//     };
//     setReplies([...replies, newReply]);
//     setIsReplying(false);
//   };

//   return (
//     <div className={classes.comment}>
//       <div className="d-flex justify-content-between align-items-center">
//         <UserProfileHeader />
//         <FontAwesomeIcon icon={faEllipsisVertical} className="text-muted" />
//       </div>
//       <div className="mt-2">
//         <p>{comment.text}</p>
//         <div className="d-flex align-items-center">
//           <FontAwesomeIcon icon={faHeart} className="me-2 text-danger" />
//           <span className="me-3">{comment.likes}k</span>
//           <FontAwesomeIcon icon={faCommentDots} className="me-2 text-muted" />
//           <span className="me-3">{comment.replies.length}</span>
//           <IconTextButton
//             inconTextButtonStyle={'me-1'}
//             icon={faReply}
//             label={'Reply'}
//             onClick={handleReply}
//           />
//         </div>
//       </div>
//       <Collapse in={isReplying}>
//         <div className="mt-3">
//           <Input
//             type="text"
//             placeholder="Write a reply..."
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                 handleAddReply(e.target.value);
//                 e.target.value = '';
//               }
//             }}
//           />
//         </div>
//       </Collapse>
//       {replies.length > 0 && (
//         <div className={`mt-3 ms-1 ${classes.replies_main_container}`}>
//           {replies.map((reply) => (
//             <Comment key={reply.id} comment={reply} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Comment;
