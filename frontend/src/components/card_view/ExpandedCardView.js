import React, { useState, useRef, useEffect } from 'react';
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
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import { Image } from '../../utils/MediaSection';
import images from '../../assets/images/blog.jpg';
import ToolTip from '../../utils/toolTipSection';
import { Analytics, Analytics2 } from './body_features/analyticsCmp';
import PotentialBugFixes from './body_features/potentialBugFixes';
import RelatedReviews from './body_features/relatedReviewsCmp';
import RelatedResults from './body_features/relatedResultCmp';
import Line from '../../utils/LineSection';
import { useNavigate, useSearchParams, useRouteLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../utils/authSection';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';

const Header = ({
  isExpanded,
  setIsExpanded,
  CARD_VIEW_OPTION_META_DATA,
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
}) => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    id === 'home' && navigate('/');
    id === 'bug_report' && navigate(`/new/?id=${postId}&type=${'bug_fix'}&postId=${postId}`);
    id === 'bug_fix' && navigate(`/new/?id=${postId}&type=${'bug_fix'}&postId=${postId}`);
    id === 'reusable_code' &&
      navigate(`/new/?id=${postId}&type=${'reusable_code'}&postId=${postId}`);
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
        <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={CARD_VIEW_OPTION_META_DATA} />
        <ToolTip tooltipMessage={isExpanded ? 'Close Insight' : 'Open Insight'}>
          <IconButton
            inconButtonStyle="d-none d-xl-block"
            icon={isExpanded ? faChevronRight : faChevronLeft}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </ToolTip>
      </div>
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
  CARD_VIEW_OPTION_META_DATA,
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
  potentialTitle,
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
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const relatedResultsRef = useRef(null);
  const commentSectionsRef = useRef(null);

  const [searchParams] = useSearchParams();
  const currentPost = searchParams.get('post');

  return (
    <div className={classes.expanded_container}>
      <div className={classes.expanded_card_second_container}>
        <div className={classes.expanded_card_implentation_main_container}>
          <Header
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION_META_DATA}
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

            {!isExpanded && (
              <div className={classes.body_analytics_container}>
                <div className={`d-none d-xl-flex ${classes.analytics_analytic_container_2}`}>
                  <Analytics2
                    likesCount={likesCount}
                    commentsCount={commentsCount}
                    sharesCount={sharesCount}
                    viewsCount={viewsCount}
                    contributionsCount={contributionsCount}
                  />
                </div>
              </div>
            )}
            <div className={classes.body_analytics_container}>
              <div className={`d-flex d-xl-none ${classes.analytics_analytic_container_2}`}>
                <Analytics2
                  likesCount={likesCount}
                  commentsCount={commentsCount}
                  sharesCount={sharesCount}
                  viewsCount={viewsCount}
                  contributionsCount={contributionsCount}
                />
              </div>
            </div>

            <Comments
              commentSectionsRef={commentSectionsRef}
              postId={postId}
              post={post}
              username={username}
            />
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
            <PotentialBugFixes potentialTitle={potentialTitle} />
          </div>
        )}
      </div>
      <RelatedReviews
        onClick={() => relatedResultsRef.current.scrollIntoView({ behavior: 'smooth' })}
      />
      <div ref={relatedResultsRef} className={classes.expanded_card_related_results_main_container}>
        <RelatedResults />
      </div>
    </div>
  );
}

export default ExpandedCard;
