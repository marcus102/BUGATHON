import React, { useState, useRef, useEffect, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './ExpandedCardView.module.css';
import HeaderOptions from '../headerOptionsCmp';
import UserProfileHeader from '../userProfileHeaderCmp';
import {
  SolidButton,
  IconButton,
  IconTextButton,
  DropdownMenu,
  PlaneButton,
  ButtonContainer,
} from '../../utils/ButtonSection';
import {
  faArrowLeft,
  faChevronLeft,
  faEllipsisVertical,
  faComment,
  faAnglesRight,
  faChevronRight,
  faCheck,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import { Image } from '../../utils/MediaSection';
import images from '../../assets/images/blog.jpg';
import ToolTip from '../../utils/toolTipSection';
import { Analytics, Analytics2 } from './body_features/analyticsCmp';
import Line from '../../utils/LineSection';
import { useNavigate, useSearchParams, useRouteLoaderData, redirect } from 'react-router-dom';
import { getAuthToken } from '../../utils/authSection';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { CARD_VIEW_OPTION, CARD_VIEW_OPTION_2 } from '../../data/Database';
import { Overlay } from '../../utils/OverlaySection';
import { TextArea, Input } from '../../utils/InputSection';

const Header = ({
  isExpanded,
  setIsExpanded,
  contributionsArray,
  postType,
  contributionsCount,
  firstName,
  lastName,
  role,
  followersCount,
  followingCount,
  starCount,
  username,
  profession,
  profileImg,
  postId,
  state,
}) => {
  const navigate = useNavigate();
  const { overlayHandler } = useContext(ManagmentSystem);
  const { fetchData } = useRouteLoaderData('root');
  const currentUserUsername = fetchData?.data.username;
  const [assignmentOverlayChildren, setAssignmentOverlayChildren] = useState('');
  const [deletionOverlayChildren, setDeletionOverlayChildren] = useState('');
  const [reportOverlayChildren, setReportOverlayChildren] = useState('');
  const [blockPostOverlayChildren, setBlockPostOverlayChildren] = useState('');
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldBlockPost, setShouldBlockPost] = useState(false);

  const token = getAuthToken();

  const handleNavigation = (id) => {
    id === 'home' && navigate('/');
    id === 'bug_report' && navigate(`/new/?id=${postId}&type=${'bug_fix'}&postId=${postId}`);
    id === 'bug_fix' && navigate(`/new/?id=${postId}&type=${'bug_fix'}&postId=${postId}`);
    id === 'reusable_code' &&
      navigate(`/new/?id=${postId}&type=${'reusable_code'}&postId=${postId}`);
  };

  const deletePost = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    let myUrl;

    state === 'bug_report'
      ? (myUrl = 'bug_reports')
      : state === 'bug_fix'
      ? (myUrl = 'bug_fixes')
      : (myUrl = 'reusable_codes');

    try {
      const response = await axios.delete(`${PORT}api/v1/${myUrl}/${postId}`, { headers });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const blockPost = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    let myUrl;

    state === 'bug_report'
      ? (myUrl = 'blocked_bug_report')
      : state === 'bug_fix'
      ? (myUrl = 'blocked_bug_fix')
      : state === 'reusable_code'
      ? (myUrl = 'blocked_reusable_code')
      : (myUrl = 'blocked_reusable_comment');

    try {
      const response = await axios.post(
        `${PORT}api/v1/blocked_posts/${postId}/${myUrl}`,
        {
          reason: '',
        },
        {
          headers,
        }
      );
      redirect('/');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (shouldDelete) {
    deletePost();
  }

  if (shouldBlockPost) {
    blockPost();
  }

  const clickManager = (id) => {
    if (id === '1') {
      console.log('edit');
    } else if (id === '2') {
      overlayHandler('2');
      setAssignmentOverlayChildren('Are you sure you want to assign this post?');
    } else if (id === '3') {
      navigate(`/comments/?username=${username}&postId=${postId}&post=${state}`);
    } else if (id === '4') {
      console.log('share');
    } else if (id === '5') {
      overlayHandler('5');
      setBlockPostOverlayChildren('Why do you want to hide this post?');
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
    <div className={classes.implentation_header_container}>
      <div className={classes.header_options_container}>
        <ToolTip tooltipMessage={'Go Back Home'}>
          <IconButton icon={faArrowLeft} onClick={() => handleNavigation('home')} />
        </ToolTip>
        <SolidButton
          unwrap
          buttonStyle={classes.options_button_container}
          label={'Contribute'}
          onClick={() => handleNavigation(postType)}
        />
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
      </div>
      <div className={classes.header_options_container}>
        <div className="d-none d-md-block">
          <HeaderOptions
            headerOptionMainContainer="d-none d-xl-block"
            contributionsArray={contributionsArray}
            contributionsCount={contributionsCount}
          />
        </div>
        <DropdownMenu
          buttonIcon={faEllipsisVertical}
          menuItems={currentUserUsername === username ? CARD_VIEW_OPTION_2 : CARD_VIEW_OPTION}
          clickManager={clickManager}
        />
        <ToolTip tooltipMessage={isExpanded ? 'Close Insight' : 'Open Insight'}>
          <IconButton
            inconButtonStyle="d-none d-xl-block"
            icon={isExpanded ? faChevronRight : faChevronLeft}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </ToolTip>
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

      {blockPostOverlayChildren && (
        <Overlay
          overlayStyle={classes.overlay}
          overlayChildStyle={classes.overlay_child}
          keyId={'5'}
        >
          <Text h4={'Hide Content'} />
          <Text label16={blockPostOverlayChildren} />
          <Input label={'Reason(optional)'} />
          <PlaneButton label16={'Continue'} onClick={() => setShouldBlockPost(true)} />
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

const Reactions = ({ REACTIONS_META_DATA, likedBy, cardButtonState, postId, username }) => {
  const { fetchData } = useRouteLoaderData('root');
  const currentUserId = fetchData?.data.id;
  const isActiveRef = useRef({});
  const token = getAuthToken();
  const navigate = useNavigate();
  const initialLikesCount =
    REACTIONS_META_DATA?.find((reaction) => reaction.id === 'likes')?.count || 0;
  const initialSaveStatus =
    REACTIONS_META_DATA?.find((reaction) => reaction.id === 'save')?.state || false;
  const [totalLikes, setTotalLikes] = useState(initialLikesCount);
  const [isSaved, setIsSaved] = useState(initialSaveStatus);

  const [isActive, setIsActive] = useState(
    REACTIONS_META_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (likedBy?.some((like) => like.user === currentUserId)) {
      setIsActive((prev) => ({ ...prev, likes: true }));
    }

    if (isSaved) {
      setIsActive((prev) => ({ ...prev, save: true }));
    }
  }, [likedBy, currentUserId, isSaved]);

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
    <div className={classes.body_reactions_container}>
      <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />
      <div className={classes.reactions_list_container}>
        {REACTIONS_META_DATA.map((data, index) => (
          <ToolTip key={`${data.id}-${index}`} tooltipMessage={data.id}>
            <IconTextButton
              inconTextButtonStyle={classes.list_icon_text_container}
              icon={data.icon}
              label={data.id === 'likes' ? `${totalLikes}` : data.count}
              colorOnMouseUp={
                (data.id === 'likes' && likedBy.some((like) => like.user.id === currentUserId)) ||
                (data.id === 'save' && isSaved === true) ||
                isActive[data.id]
                  ? data.activeColor
                  : undefined
              }
              onClick={() => reactionsHandler(data.id)}
            />
          </ToolTip>
        ))}
      </div>
    </div>
  );
};

const ImplementationSection = ({ isCopied, setIsCopied, description, parentPosts, postType }) => (
  <div className={classes.body_solution_container}>
    <div>
      <Text inconTextButtonStyle={classes.body_solution_title_container} h5={'Description'} />

      <div className={classes.body_solution_content_container}>
        <div className={classes.body_solution_icon_button}>
          <ToolTip tooltipMessage={!isCopied ? 'Copy' : 'Copied'}>
            <IconButton
              icon={!isCopied ? faCopy : faCheck}
              onClick={() => setIsCopied((prev) => !prev)}
            />
          </ToolTip>
        </div>
        <hr className={classes.body_horizontal_line_container} />

        {postType === 'bug_fix' && parentPosts[0] !== undefined && (
          <IconTextButton label={`Main Post: ${parentPosts[0]}`} />
        )}
        {postType === ('bug_fix' || 'reusable_code') && parentPosts[1] !== undefined && (
          <IconTextButton label={`Parent Post: ${parentPosts[1]}`} />
        )}

        {description && (
          <div
            className={classes.body_solution_text_content_container}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  </div>
);

const FooterButtons = ({ SUGESTION_BUTTON_META_DATA }) => (
  <div className={classes.body_suggestion_container}>
    {SUGESTION_BUTTON_META_DATA.map((data) => (
      <div key={data.id} className={classes.body_suggestion_button_container}>
        {['1', '2'].includes(data.id) && <PlaneButton label14={data.label} />}
        {data.id === '3' && (
          <DropdownMenu
            dropDownMenuStyle={classes.body_suggestion_drop_down_menu}
            buttonLabel={data.label}
            buttonIcon={faCaretDown}
            menuItems={data.children && data.children}
          />
        )}
        <Icon icon={faAnglesRight} />
      </div>
    ))}
  </div>
);

const Comments = ({ commentSectionsRef, username, postId, post }) => {
  const navigate = useNavigate();
  return (
    <div ref={commentSectionsRef} className={classes.body_comment_container}>
      <Text textStyle={classes.comment_title_container} h6="Comments" />
      <ButtonContainer
        onClick={() => {
          navigate(`/comments/?username=${username}&postId=${postId}&post=${post}`);
        }}
      >
        <Icon icon={faComment} />
        <Text label14Style={classes.button_text} label14={'Read Comments'} />
      </ButtonContainer>
    </div>
  );
};

function ExpandedCard({
  REACTIONS_META_DATA,
  SUGESTION_BUTTON_META_DATA,
  firstName,
  lastName,
  role,
  followersCount,
  followingCount,
  starCount,
  username,
  profession,
  profileImg,
  title,
  contributionsArray,
  contributionsCount,
  likesCount,
  commentsCount,
  sharesCount,
  viewsCount,
  description,
  postId,
  post,
  parentPosts,
  likedBy,
  saveMode,
  state,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const commentSectionsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const currentPost = searchParams.get('post');

  return (
    <div className={classes.expanded_container}>
      <div className={classes.expanded_card_implentation_main_container}>
        <Header
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          postId={postId}
          postType={currentPost}
          contributionsArray={contributionsArray}
          contributionsCount={contributionsCount}
          firstName={firstName}
          lastName={lastName}
          role={role}
          followersCount={followersCount}
          followingCount={followingCount}
          starCount={starCount}
          username={username}
          profession={profession}
          profileImg={profileImg}
          state={state}
        />
        <Text textStyle={classes.implentation_second_header_container} h5={title} />
        <div className={classes.implentation_body_main_container}>
          <Reactions
            REACTIONS_META_DATA={REACTIONS_META_DATA}
            commentSectionsRef={commentSectionsRef}
            likedBy={likedBy}
            saveMode={saveMode}
            cardButtonState={post}
            postId={postId}
            username={username}
          />
          <Line direction={'horizontal'} />
          <ImplementationSection
            isCopied={isCopied}
            postType={currentPost}
            setIsCopied={setIsCopied}
            description={description}
            parentPosts={parentPosts}
          />
          <FooterButtons SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_META_DATA} />

          <Comments
            commentSectionsRef={commentSectionsRef}
            postId={postId}
            post={post}
            username={username}
          />

          {!isExpanded && (
            <div className={classes.body_analytics_container}>
              <Analytics2
                likesCount={likesCount}
                commentsCount={commentsCount}
                sharesCount={sharesCount}
                viewsCount={viewsCount}
                contributionsCount={contributionsCount}
              />
            </div>
          )}
          <div className={classes.body_analytics_container}>
            <div className={`d-block d-xl d-none ${classes.analytics2_container}`}>
              <Analytics2
                likesCount={likesCount}
                commentsCount={commentsCount}
                sharesCount={sharesCount}
                viewsCount={viewsCount}
                contributionsCount={contributionsCount}
              />
            </div>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div
          className={`col-5 d-none d-xl-block ${classes.expanded_card_analytics_main_container}`}
        >
          <Analytics
            likesCount={likesCount}
            commentsCount={commentsCount}
            sharesCount={sharesCount}
            viewsCount={viewsCount}
            contributionsCount={contributionsCount}
          />
        </div>
      )}
    </div>
  );
}

export default ExpandedCard;
