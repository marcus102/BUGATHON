import React, { useState, useRef } from 'react';
import classes from './ExpandedCardView.module.css';
import HeaderOptions from '../headerOptionsCmp';
import UserProfileHeader from '../userProfileHeaderCmp';
import {
  SolidButton,
  IconButton,
  IconTextButton,
  DropdownMenu,
  PlaneButton,
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
import CommentSection from '../comment/CommentSectionCmp';
import ToolTip from '../../utils/toolTipSection';
import { Analytics, Analytics2 } from './body_features/analyticsCmp';
import PotentialBugFixes from './body_features/potentialBugFixes';
import RelatedReviews from './body_features/relatedReviewsCmp';
import RelatedResults from './body_features/relatedResultCmp';
import Line from '../../utils/LineSection';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Header = ({
  isExpanded,
  setIsExpanded,
  CARD_VIEW_OPTION_META_DATA,
  contributionsArray,
  handleNavigation,
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
}) => (
  <div className={classes.implentation_header_container}>
    <div className={classes.header_options_container}>
      <ToolTip tooltipMessage={'Go Back Home'}>
        <IconButton icon={faArrowLeft} onClick={() => handleNavigation('home')} />
      </ToolTip>
      <SolidButton
        unwrap
        buttonStyle={classes.options_button_container}
        label={'Contribute'}
        onClick={() =>
          handleNavigation(
            postType === 'bug_report'
              ? 'bug_report'
              : postType === 'bug_fix'
              ? 'bug_fix'
              : 'reusable_code'
          )
        }
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

const Reactions = ({ REACTIONS_META_DATA, isActive, setIsActive, commentSectionsRef }) => (
  <div className={classes.body_reactions_container}>
    <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />
    <div className={classes.reactions_list_container}>
      {REACTIONS_META_DATA.map((data) => (
        <ToolTip key={data.id} tooltipMessage={data.id}>
          <IconTextButton
            inconTextButtonStyle={classes.list_icon_text_container}
            icon={data.icon}
            label={data.count}
            colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
            onClick={() => {
              setIsActive((prev) => ({
                ...prev,
                [data.id]: !prev[data.id],
              }));

              if (data.id === 'comments') {
                commentSectionsRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </ToolTip>
      ))}
    </div>
  </div>
);

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

const Comments = ({ commentSectionsRef }) => (
  <div ref={commentSectionsRef} className={classes.body_comment_container}>
    <Text textStyle={classes.comment_title_container} h6="Comments" />
    <CommentSection />
  </div>
);

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
  parentPosts,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isActive, setIsActive] = useState(
    REACTIONS_META_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const relatedResultsRef = useRef(null);
  const commentSectionsRef = useRef(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPost = searchParams.get('post');

  const handleNavigation = (id) => {
    id === 'home' && navigate('/');
    id === 'bug_report' && navigate(`/new/?type=${'bug_fix'}&postId=${postId}`);
    id === 'bug_fix' && navigate(`/new/?id=${postId}&type=${'bug_fix'}&postId=${postId}`);
    id === 'reusable_code' && navigate(`/new/?type=${'reusable_code'}&postId=${postId}`);
  };

  console.log('parentPosts', parentPosts);

  return (
    <div className={classes.expanded_container}>
      <div className={classes.expanded_card_second_container}>
        <div className={classes.expanded_card_implentation_main_container}>
          <Header
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION_META_DATA}
            handleNavigation={handleNavigation}
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
              isActive={isActive}
              setIsActive={setIsActive}
              commentSectionsRef={commentSectionsRef}
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
            <Comments commentSectionsRef={commentSectionsRef} />
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
