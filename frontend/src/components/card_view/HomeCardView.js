import React, { useState, useRef, useEffect, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
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
import { CARD_VIEW_OPTION } from '../../data/Database';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { getAuthToken } from '../../utils/authSection';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { Overlay } from '../../utils/OverlaySection';
import { TextArea } from '../../utils/InputSection';

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
  postId,
  cardButtonState,
}) => {
  const navigate = useNavigate();
  const { overlayHandler } = useContext(ManagmentSystem);
  const { fetchData } = useRouteLoaderData('root');
  const currentUserUsername = fetchData?.data.username;
  const token = getAuthToken();
  const [assignmentOverlayChildren, setAssignmentOverlayChildren] = useState('');
  const [deletionOverlayChildren, setDeletionOverlayChildren] = useState('');
  const [reportOverlayChildren, setReportOverlayChildren] = useState('');
  const [shouldDelete, setShouldDelete] = useState(false);

  const deletePost = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    let myUrl;

    cardButtonState === 'bug_report'
      ? (myUrl = 'bug_reports')
      : cardButtonState === 'bug_fix'
      ? (myUrl = 'bug_fixes')
      : (myUrl = 'reusable_codes');

    try {
      const response = await axios.delete(`${PORT}api/v1/${myUrl}/${postId}`, { headers });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (shouldDelete) {
    deletePost();
  }

  const clickManager = (id) => {
    if (id === '1') {
      console.log('edit');
    } else if (id === '2') {
      overlayHandler('2');
      setAssignmentOverlayChildren('Are you sure you want to assign this post?');
    } else if (id === '3') {
      navigate(`/comments/?username=${username}&postId=${postId}&post=${cardButtonState}`);
    } else if (id === '4') {
      console.log('share');
    } else if (id === '5') {
      console.log('idontwanttosee');
    } else if (id === '6') {
      overlayHandler('6');
      setDeletionOverlayChildren('Are you sure you want to delete this post?');
    } else if (id === '7') {
      console.log('report');
      overlayHandler('7');
      setReportOverlayChildren('Why do you want to report this post?');
    }
  };
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

        <DropdownMenu
          buttonIcon={faEllipsisVertical}
          menuItems={CARD_VIEW_OPTION}
          clickManager={clickManager}
        />
      </div>

      {/* OVERLAY FOR ASSIGN BUG REPORT */}
      {assignmentOverlayChildren && (
        <Overlay
          overlayStyle={classes.overlay}
          overlayChildStyle={classes.overlay_child}
          keyId={'2'}
        >
          <Text h4={'Users'} />
          <PlaneButton label16={'user1'} />
          <PlaneButton label16={'user2'} />
          <PlaneButton label16={'user3'} />
          <PlaneButton label16={'user4'} />
        </Overlay>
      )}
      {deletionOverlayChildren && (
        <Overlay
          overlayStyle={classes.overlay}
          overlayChildStyle={classes.overlay_child}
          keyId={'6'}
        >
          <Text h4={'Warning!!!'} />
          <Text label16={deletionOverlayChildren} />
          <div className={classes.overlay_button_container}>
            <PlaneButton
              label16={'Yes'}
              onClick={() => {
                setShouldDelete(true);
                overlayHandler('');
              }}
            />
            <PlaneButton
              label16={'No'}
              onClick={() => {
                setShouldDelete(false);
                overlayHandler('');
              }}
            />
          </div>
        </Overlay>
      )}

      {reportOverlayChildren && (
        <Overlay
          overlayStyle={classes.overlay}
          overlayChildStyle={classes.overlay_child}
          keyId={'7'}
        >
          <Text h4={'Report'} />
          <Text label16={reportOverlayChildren} />
          <TextArea label={'Reason(optional)'} />
          <PlaneButton label16={'Submit'} />
        </Overlay>
      )}
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
        profession={profession}
        profileImg={profileImg}
        isHeaderOption={isHeaderOption}
        contributionsCount={contributionsCount}
        contributionsArray={contributionsArray}
        postId={postId}
        cardButtonState={cardButtonState}
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
