import React, { useState, useRef, useEffect } from 'react';
import classes from './HomeCardView.module.css';
import { IconTextButton, IconButton, PlaneButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import {
  faArrowUpRightFromSquare,
  faClipboard,
  faComment,
  faEllipsis,
  faEllipsisVertical,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import UserProfileHeader from '../userProfileHeaderCmp';
import HeaderOptions from '../headerOptionsCmp';
import ToolTip from '../../utils/toolTipSection';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { getAuthToken } from '../../utils/authSection';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';

function HomeCard({
  homeCardStyle,
  cardButtonState,
  isHeaderOption,
  username,
  userId,
  profession,
  role,
  profileImg,
  followersCount,
  followingCount,
  starCount,
  firstName,
  lastName,
  contributionsCount,
  timestamp,
  TAGS,
  postTitle,
  postDescription,
  children,
  REACTIONSMETADATA,
  contributionsArray,
  postId,
  likedBy,
  saveMode,
  commentsArray,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`${classes.home_card} ${
        cardButtonState === 'bug_report'
          ? classes.bug_report
          : cardButtonState === 'bug_fix'
          ? classes.bug_fix
          : cardButtonState === 'reusable_code'
          ? classes.reusable_code
          : null
      } ${homeCardStyle}`}
    >
      {/* HEADER */}
      <HomeCardHeader
        firstName={firstName}
        lastName={lastName}
        role={role}
        followersCount={followersCount}
        followingCount={followingCount}
        starCount={starCount}
        username={username}
        userId={userId}
        profession={profession}
        profileImg={profileImg}
        isHeaderOption={isHeaderOption}
        contributionsCount={contributionsCount}
        contributionsArray={contributionsArray}
      />

      {/* BODY */}
      <HomeCardBody postTitle={postTitle} postDescription={postDescription}>
        {children}
      </HomeCardBody>

      <IconTextButton
        inconTextButtonStyle={classes.more_button}
        label={'Click for more'}
        icon_={faArrowUpRightFromSquare}
        onClick={() => {
          navigate(`/detail/?username=${username}&postId=${postId}&post=${cardButtonState}`);
        }}
      />

      {/* FOOTER */}
      <HomeCardFooter
        TAGS={TAGS}
        timestamp={timestamp}
        reactionsData={REACTIONSMETADATA}
        postId={postId}
        likedBy={likedBy}
        cardButtonState={cardButtonState}
        saveMode={saveMode}
        commentsArray={commentsArray}
        username={username}
      />
    </div>
  );
}

export default HomeCard;

// Header component
const HomeCardHeader = ({
  firstName,
  lastName,
  role,
  followersCount,
  followingCount,
  starCount,
  username,
  userId,
  profession,
  profileImg,
  isHeaderOption,
  contributionsCount,
  contributionsArray,
}) => {
  const { fetchData } = useRouteLoaderData('root');
  const currentUserUsername = fetchData?.data.username;

  return (
    <div className={classes.home_card_header_container}>
      <UserProfileHeader
        firstName={firstName}
        lastName={lastName}
        role={role}
        followersCount={followersCount}
        followingCount={followingCount}
        starCount={starCount}
        username={username}
        userId={userId}
        profession={profession}
        profileImg={profileImg}
        hideFollow={currentUserUsername === username ? true : false}
      />
      <div className={classes.header_options_container}>
        {isHeaderOption ? (
          <HeaderOptions
            contributionsCount={contributionsCount}
            contributionsArray={contributionsArray}
          />
        ) : (
          <IconButton iconButtonStyle={classes.header_options_icon_container} icon={faEllipsis} />
        )}
      </div>
    </div>
  );
};

// Body component
const HomeCardBody = ({ postTitle, postDescription, children }) => {
  return (
    <div className={classes.home_card_body_container}>
      {postTitle && <Text h4={postTitle} />}
      {children}
    </div>
  );
};

// Footer component
const HomeCardFooter = ({
  TAGS,
  timestamp,
  reactionsData,
  postId,
  username,
  likedBy,
  cardButtonState,
}) => {
  const { fetchData } = useRouteLoaderData('root');
  const currentUserId = fetchData?.data.id;
  const isActiveRef = useRef({});
  const token = getAuthToken();
  const navigate = useNavigate();

  const initialLikesCount = reactionsData?.find((reaction) => reaction.id === 'likes')?.count || 0;
  const initialSaveStatus =
    reactionsData?.find((reaction) => reaction.id === 'save')?.state || false;
  const [totalLikes, setTotalLikes] = useState(initialLikesCount);
  const [isSaved, setIsSaved] = useState(initialSaveStatus);

  const [isActive, setIsActive] = useState(
    reactionsData &&
      reactionsData.reduce((acc, reaction) => {
        acc[reaction.id] = false;
        return acc;
      }, {})
  );

  useEffect(() => {
    if (likedBy?.some((like) => like.user === currentUserId)) {
      setIsActive((prev) => ({ ...prev, likes: true }));
    }
  }, [likedBy, currentUserId]);

  const reactionsHandler = async (id) => {
    setIsActive((prev) => {
      const updatedState = {
        ...prev,
        [id]: !prev[id],
      };
      isActiveRef.current[id] = updatedState[id];
      return updatedState;
    });

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    let state;

    if (cardButtonState === 'bug_report') {
      state = 'bug_reports';
    } else if (cardButtonState === 'bug_fix') {
      state = 'bug_fixes';
    } else if (cardButtonState === 'reusable_code') {
      state = 'reusable_codes';
    }

    if (isActiveRef.current[id] === true && id === 'likes') {
      try {
        await axios.post(
          `${PORT}api/v1/${state}/${postId}/likes`,
          {},
          {
            headers,
          }
        );
        setTotalLikes((prevLikes) => prevLikes + 1);
        console.log('liked👍');
      } catch (error) {
        console.error('Error liking post:', error.response.data);
      }
    } else if (isActiveRef.current[id] === false && id === 'likes') {
      try {
        await axios.post(`${PORT}api/v1/${state}/${postId}/likes`, {}, { headers });
        setTotalLikes((prevLikes) => prevLikes - 1);
        console.log('unliked👎');
      } catch (error) {
        console.error('Error unliking post:', error.response.data);
      }
    }

    if (isActiveRef.current[id] === true && id === 'save') {
      try {
        await axios.patch(
          `${PORT}api/v1/${state}/${postId}`,
          { saveMode: true },
          {
            headers,
          }
        );
        setIsSaved(true);
        console.log('saved');
      } catch (error) {
        console.error('Error saving post:', error.response.data);
      }
    } else if (isActiveRef.current[id] === false && id === 'save') {
      try {
        await axios.patch(
          `${PORT}api/v1/${state}/${postId}`,
          { saveMode: false },
          {
            headers,
          }
        );
        setIsSaved(false);
        console.log('unsaved');
      } catch (error) {
        console.error('Error unsaving post:', error.response.data);
      }
    }

    if (id === 'comments') {
      navigate(`/comments/?username=${username}&postId=${postId}&post=${cardButtonState}`);
    }
  };
  return (
    <div className={classes.home_card_footer_container}>
      <div className={classes.footer_tag_container}>
        {TAGS &&
          TAGS.map((tag, index) => (
            <ToolTip tooltipMessage={tag.about} key={`${tag.id}-${index}`}>
              <PlaneButton label12={tag.button} />
            </ToolTip>
          ))}
        <Text textStyle={classes.timestamp_container} label10={timestamp} />
      </div>
      <div className={classes.footer_reaction_container}>
        {reactionsData &&
          reactionsData.map((data, index) => (
            <ToolTip tooltipMessage={data.id} key={`${data.id}-${index}`}>
              <IconTextButton
                onClick={() => reactionsHandler(data.id)}
                inconTextButtonStyle={classes.reaction_icon_text_button_container}
                colorOnMouseUp={
                  (data.id === 'likes' && likedBy.some((like) => like.user.id === currentUserId)) ||
                  (data.id === 'save' && isSaved === true) ||
                  isActive[data.id]
                    ? data.activeColor
                    : undefined
                }
                icon={data.icon}
              >
                <Text
                  label12Style={classes.reaction_label12_style}
                  label12={data.id === 'likes' ? `${totalLikes}` : data.count}
                />
              </IconTextButton>
            </ToolTip>
          ))}
      </div>
    </div>
  );
};
