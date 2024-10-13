import React, { useState, useContext, useEffect } from 'react';
import Colors from '../../constants/colors';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './CommentSectionCmp.module.css';
import UserProfileHeader from '../userProfileHeaderCmp';
import { Input } from '../../utils/InputSection';
import {
  ButtonContainer,
  ImageButton,
  DropdownMenu,
  IconTextButton,
  IconButton,
} from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import {
  faChevronDown,
  faReply,
  faHeart,
  faChartSimple,
  faEllipsisVertical,
  faThumbTack,
  faPen,
  faCaretRight,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faBan,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons';
import Line from '../../utils/LineSection';
import ToolTip from '../../utils/toolTipSection';
import { DynamicLabelDropdownMenu } from '../../utils/ButtonSection';
import SendIcon from '../../assets/icons/send.svg';
import { Form, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';

const COMMENT_DROPDOWN_OPTION = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Pinned' },
  { id: '3', label: 'Trending' },
  { id: '4', label: 'Relevent' },
  { id: '6', label: 'Recent' },
  { id: '7', label: 'Oldest' },
  { id: '8', label: 'Hidden' },
  { id: '9', label: 'My Replies' },
];

const CURRENT_USER_COMMENT_OPTION = [
  { id: '1', icon: faPen, label: 'Edit comment', icon_2: null, href: null },
  { id: '2', icon: faTrashCan, label: 'Delete comment', icon_2: null, href: null },
];

const GUEST_USER_COMMENT_OPTION = [
  { id: '3', icon: faEyeSlash, label: 'I don’t want to see this', icon_2: null, href: null },
  { id: '4', icon: faExclamation, label: 'Report User', icon_2: faCaretRight, href: null },
];

const CommentSection = ({ likesCount, viewsCount, repliesCount }) => {
  const navigate = useNavigate();
  const postComments = useLoaderData();
  const { dropDownDefault } = useContext(ManagmentSystem);
  const { comment } = dropDownDefault;
  const [visibleComments, setVisibleComments] = useState(1);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = async () => {
    setCommentText('');
  };

  const handleLoadMore = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
  };

  return (
    <div className={classes.comment_section}>
      <div className={classes.comment_header_container}>
        <IconButton icon={faArrowLeftLong} onClick={() => navigate('/')} />
        <Text h1={'Comments'} />
      </div>

      <Line direction={'horizontal'} />
      <div className={classes.comment_header_drop_down_container}>
        <DynamicLabelDropdownMenu
          menuItems={COMMENT_DROPDOWN_OPTION}
          buttonIcon={faChevronDown}
          buttonLabel={comment}
          my_key={'comment'}
        />
      </div>
      <div className={classes.comments_content_container}>
        {postComments.length > 0 ? (
          postComments
            .slice(0, visibleComments)
            .filter((comment) => !comment.parentComment) // Only show top-level comments
            .map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                likesCount={likesCount}
                viewsCount={viewsCount}
                repliesCount={repliesCount}
                allComments={postComments} // Pass all comments to handle replies
              />
            ))
        ) : (
          <Text h4={'No comments yet'} />
        )}
        {visibleComments < postComments.length && (
          <ButtonContainer
            children={'Load more comments...'}
            onClick={handleLoadMore}
            buttonContainerMainContainer={classes.load_more_button}
          />
        )}
      </div>
      <Form method="post" onSubmit={handleAddComment} className={classes.comment_input_container}>
        <Input
          inputStyle={classes.comment_input}
          id="comment"
          type="text"
          name="comment"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <ImageButton
          imageButtonStyle={classes.comment_send_button_container}
          src={SendIcon}
          alt={'Send'}
        />
      </Form>
    </div>
  );
};

export default CommentSection;

const timeAgo = (timestamp) => {
  const now = new Date(); // Current local time
  const commentTime = new Date(timestamp); // Time of comment in UTC

  // Calculate the difference in seconds between current time and comment time
  const seconds = Math.floor((now.getTime() - commentTime.getTime()) / 1000);

  if (seconds < 60) {
    return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  }

  if (seconds < 3600) {
    // Less than 1 hour
    const minutes = Math.floor(seconds / 60);
    return minutes === 1 ? '1 minute ago' : `${minutes * 60} seconds ago`;
  }

  if (seconds < 86400) {
    // Less than 1 day
    const hours = Math.floor(seconds / 3600);
    return hours === 1 ? '1 hour ago' : `${hours * 3600} seconds ago`;
  }

  if (seconds < 2592000) {
    // Less than 30 days
    const days = Math.floor(seconds / 86400);
    return days === 1 ? '1 day ago' : `${days * 86400} seconds ago`;
  }

  if (seconds < 31536000) {
    // Less than 12 months
    const months = Math.floor(seconds / 2592000);
    return months === 1 ? '1 month ago' : `${months * 2592000} seconds ago`;
  }

  const years = Math.floor(seconds / 31536000); // 1 year = 31536000 seconds
  return years === 1 ? '1 year ago' : `${years * 31536000} seconds ago`;
};

const Comment = ({
  comment,
  isReply = false,
  likesCount,
  viewsCount,
  repliesCount,
  allComments,
}) => {
  const COMMENT_REACTIONS_DATA = [
    {
      id: 'like',
      icon: faHeart,
      count: `${likesCount}`,
      extra_text: null,
      activeColor: Colors.red_FF2B2B,
    },
    {
      id: 'pin',
      icon: faThumbTack,
      count: null,
      extra_text: null,
      activeColor: Colors.yellow_,
    },
    {
      id: 'impression',
      icon: faChartSimple,
      count: `${viewsCount}`,
      extra_text: null,
      activeColor: null,
    },
    {
      id: 'reply',
      icon: faReply,
      count: `Reply`,
      activeColor: null,
    },
  ];

  const [isReplying, setIsReplying] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isActive, setIsActive] = useState(
    COMMENT_REACTIONS_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const { fetchData } = useRouteLoaderData('root');
  const currentUser = fetchData?.data;

  const replies = allComments.filter(
    (targetComment) => targetComment.parentComment && targetComment.parentComment === comment.id
  );

  const isCurrentUserComment = comment.user.id === currentUser?.id;

  const handleReply = () => {
    setIsReplying(!isReplying);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const toggleShowAllReplies = () => {
    setShowAllReplies(!showAllReplies);
  };

  const handleAddReply = () => {
    setReplyText('');
    setIsReplying(false);
  };

  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    setRelativeTime(timeAgo(comment.createdAt));
    const interval = setInterval(() => {
      setRelativeTime(timeAgo(comment.createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [comment.createdAt]);

  return (
    <div className={`${isReply ? classes.reply : classes.comment}`}>
      {/* Comment Header */}
      <div className="d-flex justify-content-between align-items-center">
        <UserProfileHeader
          username={comment.user.username}
          firstName={comment.user.firstName}
          lastName={comment.user.lastName}
          followersCount={comment.user.followersCount}
          followingCount={comment.user.followingCount}
          starCount={comment.user.starCount}
          profileImg={comment.user.profileImg}
          role={comment.user.role}
          profession={comment.user.profession}
        />
        <div className={`d-flex align-items-center ${classes.comment_options_container}`}>
          <Text label12={`${relativeTime}`} />
          <DropdownMenu
            buttonIcon={faEllipsisVertical}
            menuItems={
              isCurrentUserComment ? CURRENT_USER_COMMENT_OPTION : GUEST_USER_COMMENT_OPTION
            }
          />
        </div>
      </div>

      <div className="m-3">
        <Text
          p16={
            <>
              {showMore ? comment.comment : `${comment.comment.slice(0, 50)}...`}
              {comment.comment.length > 50 && (
                <ButtonContainer
                  children={showMore ? 'less' : 'more...'}
                  onClick={toggleShowMore}
                  buttonContainerMainContainer={classes.more_button}
                />
              )}
            </>
          }
        />

        <Line direction={'horizontal'} />

        <div className={`${classes.reactions_main_container}`}>
          {COMMENT_REACTIONS_DATA.map((data, index) => (
            <div
              key={`${data.id}-${index}`}
              className={classes.reactions_icon_text_button_container}
            >
              <ToolTip tooltipMessage={data.id}>
                <IconTextButton
                  inconTextButtonStyle={`${classes.reply_icon_text_container} ${
                    data.id === 'reply' && classes.reply_icon_text_custom_container
                  }`}
                  icon={data.icon}
                  label={data.count}
                  colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
                  onClick={() => {
                    setIsActive((prev) => ({
                      ...prev,
                      [data.id]: !prev[data.id],
                    }));

                    data.id === 'reply' && handleReply();
                  }}
                />
              </ToolTip>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Reply */}
      <Collapse in={isReplying}>
        <Form method="post" onSubmit={handleAddReply} className={classes.comment_input_container}>
          <Input
            id="reply"
            type="text"
            name="reply"
            inputStyle={classes.comment_input}
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <input type="hidden" id={'replyId'} name={'replyId'} value={comment.id} />
          <ImageButton
            imageButtonStyle={classes.comment_send_button_container}
            src={SendIcon}
            alt={'Send'}
          />
        </Form>
      </Collapse>

      {/* Render Replies */}
      {replies.length > 0 && (
        <div className={`mt-3 mb-4 ${classes.replies_main_container}`}>
          {showAllReplies
            ? replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  likesCount={likesCount}
                  viewsCount={viewsCount}
                  repliesCount={replies.length}
                  allComments={allComments}
                />
              ))
            : replies
                .slice(0, 1)
                .map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    isReply={true}
                    likesCount={likesCount}
                    viewsCount={viewsCount}
                    repliesCount={replies.length}
                    allComments={allComments}
                  />
                ))}

          {replies.length > 1 && (
            <button onClick={toggleShowAllReplies} className={classes.replies_button}>
              {showAllReplies ? 'Hide replies' : `View all ${replies.length} replies`}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
