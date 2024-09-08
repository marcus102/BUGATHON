import React, { useState, useRef, useEffect } from 'react';
import classes from './HomeCardView.module.css';
import { IconTextButton, IconButton, DropdownMenu, PlaneButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import {
  faArrowUpRightFromSquare,
  faEllipsis,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import UserProfileHeader from '../userProfileHeaderCmp';
import HeaderOptions from '../headerOptionsCmp';
import ToolTip from '../../utils/toolTipSection';
import { useNavigate } from 'react-router-dom';
import { CARD_VIEW_OPTION } from '../../data/Database';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { getAuthToken } from '../../utils/authSection';
import { useRouteLoaderData } from 'react-router-dom';

// Header component
const HomeCardHeader = ({
  firstName,
  lastName,
  role,
  followersCount,
  followingCount,
  starCount,
  username,
  profession,
  profileImg,
  isHeaderOption,
  contributionsCount,
  contributionsArray,
}) => (
  <div className={classes.home_card_header_container}>
    <UserProfileHeader
      firstName={firstName}
      lastName={lastName}
      role={role}
      followersCount={followersCount}
      followingCount={followingCount}
      starCount={starCount}
      username={username}
      profession={profession}
      profileImg={profileImg}
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
      <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={CARD_VIEW_OPTION} />
    </div>
  </div>
);

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
  REACTIONSMETADATA,
  postId,
  likedBy,
  cardButtonState,
  pinMode,
}) => {
  const { fetchData } = useRouteLoaderData('root');
  const currentUserId = fetchData?.data.id;
  const isActiveRef = useRef({});
  const token = getAuthToken();

  const initialLikesCount =
    REACTIONSMETADATA.find((reaction) => reaction.id === 'likes')?.count || 0;
  const [totalLikes, setTotalLikes] = useState(initialLikesCount);

  const [isActive, setIsActive] = useState(
    REACTIONSMETADATA &&
      REACTIONSMETADATA.reduce((acc, reaction) => {
        acc[reaction.id] = false;
        return acc;
      }, {})
  );

  useEffect(() => {
    if (likedBy.some((like) => like.user === currentUserId)) {
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
        await axios.post(`${PORT}api/v1/bug_fixes/${postId}/likes`, {}, { headers });
        setTotalLikes((prevLikes) => prevLikes - 1);
        console.log('unliked👎');
      } catch (error) {
        console.error('Error unliking post:', error.response.data);
      }
    }

    if (isActiveRef.current[id] === true && id === 'pin') {
      try {
        await axios.patch(
          `${PORT}api/v1/${state}/${postId}`,
          { pinMode: true },
          {
            headers,
          }
        );
        console.log('pinned👍');
      } catch (error) {
        console.error('Error liking post:', error.response.data);
      }
    } else if (isActiveRef.current[id] === false && id === 'pin') {
      try {
        await axios.patch(
          `${PORT}api/v1/${state}/${postId}`,
          { pinMode: false },
          {
            headers,
          }
        );
        console.log('pinned👍');
      } catch (error) {
        console.error('Error liking post:', error.response.data);
      }
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
        {REACTIONSMETADATA &&
          REACTIONSMETADATA.map((data, index) => (
            <ToolTip tooltipMessage={data.id} key={`${data.id}-${index}`}>
              <IconTextButton
                onClick={() => reactionsHandler(data.id)}
                inconTextButtonStyle={classes.reaction_icon_text_button_container}
                colorOnMouseUp={
                  (data.id === 'likes' && likedBy.some((like) => like.user.id === currentUserId)) ||
                  (data.id === 'pin' && pinMode === true) ||
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

function HomeCard({
  homeCardStyle,
  cardButtonState,
  isHeaderOption,
  username,
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
  pinMode,
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
          if (cardButtonState === 'bug_report') {
            navigate(`/detail/?username=${username}&postId=${postId}&post=${'bug_report'}`);
          } else if (cardButtonState === 'bug_fix') {
            navigate(`/detail/?username=${username}&postId=${postId}&post=${'bug_fix'}`);
          } else if (cardButtonState === 'reusable_code') {
            navigate(`/detail/?username=${username}&postId=${postId}&post=${'reusable_code'}`);
          }
        }}
      />

      {/* FOOTER */}
      <HomeCardFooter
        TAGS={TAGS}
        timestamp={timestamp}
        REACTIONSMETADATA={REACTIONSMETADATA}
        postId={postId}
        likedBy={likedBy}
        cardButtonState={cardButtonState}
        pinMode={pinMode}
      />
    </div>
  );
}

export default HomeCard;
