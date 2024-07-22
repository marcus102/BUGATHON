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
  handleNavigation,
  postType,
}) => (
  <div className={classes.implentation_header_container}>
    <div className={classes.header_options_container}>
      <ToolTip
        children={<IconButton icon={faArrowLeft} onClick={() => handleNavigation('home')} />}
        tooltipMessage={'Go Back Home'}
      />
      <SolidButton
        unwrap
        buttonStyle={classes.options_button_container}
        label={'Make An Attempt'}
        onClick={() =>
          handleNavigation(
            postType === 'bug_report' || postType === 'bug_fix' ? 'bug_fix' : 'reusable_code'
          )
        }
      />
      <UserProfileHeader />
    </div>
    <div className={classes.header_options_container}>
      <div className="d-none d-md-block">
        <HeaderOptions headerOptionMainContainer="d-none d-xl-block" />
      </div>
      <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={CARD_VIEW_OPTION_META_DATA} />
      <ToolTip
        children={
          <IconButton
            inconButtonStyle="d-none d-xl-block"
            icon={isExpanded ? faChevronRight : faChevronLeft}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        }
        tooltipMessage={isExpanded ? 'Close Insight' : 'Open Insight'}
      />
    </div>
  </div>
);

const Reactions = ({ REACTIONS_META_DATA, isActive, setIsActive, commentSectionsRef }) => (
  <div className={classes.body_reactions_container}>
    <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />
    <div className={classes.reactions_list_container}>
      {REACTIONS_META_DATA.map((data) => (
        <ToolTip
          key={data.id}
          children={
            <IconTextButton
              inconTextButtonStyle={classes.list_icon_text_container}
              icon={data.icon}
              label={data.text}
              colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
              onClick={() =>
                setIsActive((prev) => ({
                  ...prev,
                  [data.id]: !prev[data.id],
                }))
              }
            />
          }
          tooltipMessage={data.id}
        />
      ))}
      <IconTextButton
        icon={faComment}
        inconTextButtonStyle={classes.list_comment_icon_text_container}
        label="Comment"
        onClick={() => commentSectionsRef.current.scrollIntoView({ behavior: 'smooth' })}
      />
    </div>
  </div>
);

const ImplementationSection = ({
  IMPLEMENTATION_META_DATA,
  isCollapsed,
  setIsCollapsed,
  isCopied,
  setIsCopied,
}) => (
  <div className={classes.body_solution_container}>
    {IMPLEMENTATION_META_DATA.map((data) => (
      <div key={data.id}>
        <IconTextButton
          inconTextButtonStyle={classes.body_solution_title_container}
          label={data.title}
          icon_={faChevronDown}
          onClick={() =>
            setIsCollapsed((prev) => ({
              ...prev,
              [data.id]: !prev[data.id],
            }))
          }
        />
        {!isCollapsed[data.id] && (
          <div className={classes.body_solution_content_container}>
            <div className={classes.body_solution_icon_button}>
              <ToolTip
                children={
                  <IconButton
                    icon={!isCopied[data.id] ? faCopy : faCheck}
                    onClick={() =>
                      setIsCopied((prev) => ({
                        ...prev,
                        [data.id]: !prev[data.id],
                      }))
                    }
                  />
                }
                tooltipMessage={!isCopied[data.id] ? 'Copy' : 'Copied'}
              />
            </div>
            <hr className={classes.body_horizontal_line_container} />
            <Text textStyle={classes.body_solution_text_content_container} p16={data.content} />
          </div>
        )}
      </div>
    ))}
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

const ExpandedCard = ({
  REACTIONS_META_DATA,
  IMPLEMENTATION_META_DATA,
  CARD_VIEW_OPTION_META_DATA,
  SUGESTION_BUTTON_META_DATA,
  title,
  potentialTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(
    IMPLEMENTATION_META_DATA.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  const [isCollapsed, setIsCollapsed] = useState(
    IMPLEMENTATION_META_DATA.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  const [isActive, setIsActive] = useState(
    REACTIONS_META_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const relatedResultsRef = useRef(null);
  const commentSectionsRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    id === 'home' && navigate('/');
    id === 'bug_report' && navigate('/new/bug_fix');
    id === 'bug_fix' && navigate('/new/bug_fix');
    id === 'reusable_code' && navigate('/new/reusable_code');
  };

  const [searchParams] = useSearchParams();
  const current_post = searchParams.get('post');

  return (
    <div className={classes.expanded_container}>
      <div className={classes.expanded_card_main_container}>
        <div className={classes.expanded_card_implentation_main_container}>
          <Header
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION_META_DATA}
            handleNavigation={handleNavigation}
            postType={current_post}
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
              IMPLEMENTATION_META_DATA={IMPLEMENTATION_META_DATA}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              isCopied={isCopied}
              setIsCopied={setIsCopied}
            />
            <FooterButtons SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_META_DATA} />

            {!isExpanded && (
              <div className={classes.body_analytics_container}>
                <div className={`d-none d-xl-flex ${classes.analytics_analytic_container_2}`}>
                  <Analytics2 />
                </div>
              </div>
            )}
            <div className={classes.body_analytics_container}>
              <div className={`d-flex d-xl-none ${classes.analytics_analytic_container_2}`}>
                <Analytics2 />
              </div>
            </div>
            <Comments commentSectionsRef={commentSectionsRef} />
          </div>
        </div>
        {isExpanded && (
          <div
            className={`col-5 d-none d-xl-block ${classes.expanded_card_analytics_main_container}`}
          >
            <Analytics />
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
};

export default ExpandedCard;
