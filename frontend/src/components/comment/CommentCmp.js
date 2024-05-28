import React, { useState } from 'react';
import Colors from '../../constants/colors';
import {
  faReply,
  faHeart,
  faChartSimple,
  faEllipsisVertical,
  faThumbTack,
  faPaperPlane,
  faPen,
  faCaretRight,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faBan,
} from '@fortawesome/free-solid-svg-icons';
import { Collapse } from 'react-bootstrap';
import classes from './CommentCmp.module.css';
import { IconTextButton, IconButton, DropdownMenu } from '../../utils/ButtonSection';
import { Input } from '../../utils/InputSection';
import UserProfileHeader from '../userProfileHeaderCmp';
import Text from '../../utils/TextSection';
import { ButtonContainer } from '../../utils/ButtonSection';
import ToolTip from '../../utils/toolTipSection';

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

const COMMENT_OPTION = [
  { id: '1', icon: faPen, label: 'Edit comment (owner)', icon_2: null, href: null },
  { id: '2', icon: faHeart, label: 'Like comment', icon_2: null, href: null },
  { id: '3', icon: faReply, label: 'Reply Comment', icon_2: null, href: null },
  { id: '4', icon: faThumbTack, label: 'Pin this comment', icon_2: null, href: null },
  {
    id: '5',
    icon: faBan,
    label: 'Hide comment (owner)',
    icon_2: null,
    href: null,
  },
  { id: '6', icon: faEyeSlash, label: 'I don’t want to see this', icon_2: null, href: null },
  { id: '7', icon: faTrashCan, label: 'Delete comment (owner)', icon_2: null, href: null },
  { id: '8', icon: faExclamation, label: 'Report', icon_2: faCaretRight, href: null },
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
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const handleAddReply = () => {
    if (replyText.trim()) {
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
      setReplyText('');
    }
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
          <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={COMMENT_OPTION} />
          {/* <IconButton icon={faEllipsisVertical} /> */}
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
              <ToolTip
                children={
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
                }
                tooltipMessage={data.id}
              />
            </div>
          ))}
        </div>
      </div>
      <Collapse in={isReplying}>
        <div className={classes.comment_input_container}>
          <Input
            type="text"
            inputStyle={classes.comment_input}
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddReply();
              }
            }}
          />

          <IconButton
            inconButtonStyle={classes.comment_send_button_container}
            icon={faPaperPlane}
            onClick={handleAddReply}
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
// import Colors from '../../constants/colors';
// import {
//   faReply,
//   faHeart,
//   faChartSimple,
//   faEllipsisVertical,
//   faThumbTack,
//   faPaperPlane,
// } from '@fortawesome/free-solid-svg-icons';
// import { Collapse } from 'react-bootstrap';
// import classes from './CommentCmp.module.css';
// import { IconTextButton, IconButton } from '../../utils/ButtonSection';
// import { Input } from '../../utils/InputSection';
// import UserProfileHeader from '../userProfileHeaderCmp';
// import Text from '../../utils/TextSection';
// import { ButtonContainer } from '../../utils/ButtonSection';

// const COMMENT_REACTIONS_DATA = [
//   {
//     id: 'like',
//     icon: faHeart,
//     text: '10K',
//     extra_text: null,
//     activeColor: Colors.red_FF2B2B,
//   },
//   {
//     id: 'pin',
//     icon: faThumbTack,
//     text: null,
//     extra_text: null,
//     activeColor: Colors.yellow_,
//   },
//   {
//     id: 'impression',
//     icon: faChartSimple,
//     text: '50K',
//     extra_text: null,
//     activeColor: null,
//   },
//   {
//     id: 'reply',
//     icon: faReply,
//     text: 'reply',
//     extra_text: '10K',
//     activeColor: null,
//   },
// ];

// function Comment({ comment, isReply = false }) {
//   const [isReplying, setIsReplying] = useState(false);
//   const [showAllReplies, setShowAllReplies] = useState(false);
//   const [replies, setReplies] = useState(comment.replies || []);
//   const [showMore, setShowMore] = useState(false);
//   const [isActive, setIsActive] = useState(
//     COMMENT_REACTIONS_DATA.reduce((acc, reaction) => {
//       acc[reaction.id] = false;
//       return acc;
//     }, {})
//   );

//   const handleReply = () => {
//     setIsReplying(!isReplying);
//   };

//   const handleAddReply = (replyText) => {
//     const newReply = {
//       id: replies.length + 1,
//       text: replyText,
//       user: { name: 'Current User', avatar: 'https://via.placeholder.com/40' },
//       time: 'Just now',
//       likes: 0,
//       replies: [],
//     };
//     setReplies([...replies, newReply]);
//     setIsReplying(false);
//   };

//   const toggleShowMore = () => {
//     setShowMore(!showMore);
//   };

//   const toggleShowAllReplies = () => {
//     setShowAllReplies(!showAllReplies);
//   };

//   return (
//     <div className={`${isReply ? classes.reply : classes.comment}`}>
//       <div className="d-flex justify-content-between align-items-center">
//         <UserProfileHeader user={comment.user} />
//         <div className={`d-flex align-items-center ${classes.comment_options_contaimer}`}>
//           <Text label12={'1mn ago'} />
//           <IconButton icon={faEllipsisVertical} />
//         </div>
//       </div>
//       <div className="m-3">
//         <Text
//           p16={
//             <>
//               {showMore ? comment.text : `${comment.text.slice(0, 50)}...`}
//               {comment.text.length > 50 && (
//                 <ButtonContainer
//                   children={showMore ? 'less' : 'more'}
//                   onClick={toggleShowMore}
//                   buttonContainerMainContainer={classes.more_button}
//                 />
//               )}
//             </>
//           }
//         />
//         <hr className={classes.horizontal_line_container} />

//         <div className={`${classes.reactions_nain_container}`}>
//           {COMMENT_REACTIONS_DATA.map((data) => (
//             <div key={data.id} className={classes.reactions_icon_text_button_container}>
//               <Text label14={data.extra_text} />
//               <IconTextButton
//                 inconTextButtonStyle={`${classes.reply_icon_text_container} ${
//                   data.id === 'reply' && classes.reply_icon_text_custom_container
//                 }`}
//                 icon={data.icon}
//                 label={data.text}
//                 colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
//                 onClick={() => {
//                   setIsActive((prev) => ({
//                     ...prev,
//                     [data.id]: !prev[data.id],
//                   }));

//                   data.id === 'reply' && handleReply();
//                 }}
//               />
//             </div>
//           ))}
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

//           <IconButton icon={faPaperPlane}/>
//         </div>
//       </Collapse>
//       {replies.length > 0 && (
//         <div className={`mt-3 mb-4 ${classes.replies_main_container}`}>
//           {showAllReplies
//             ? replies.map((reply) => <Comment key={reply.id} comment={reply} isReply />)
//             : replies
//                 .slice(0, 2)
//                 .map((reply) => <Comment key={reply.id} comment={reply} isReply />)}
//           {replies.length > 2 && (
//             <button onClick={toggleShowAllReplies} className={classes.replies_button}>
//               {showAllReplies ? 'Hide replies' : `View all ${replies.length} replies`}
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Comment;
