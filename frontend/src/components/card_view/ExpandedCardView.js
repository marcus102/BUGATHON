import React, { useState, useRef } from 'react';
import classes from './ExpandedCardView.module.css';
import Colors from '../../constants/colors';
import HeaderOptions from '../headerOptionsCmp';
import UserProfileHeader from '../userProfileHeaderCmp';
import {
  SolidButton,
  IconButton,
  OutlinedButton,
  IconTextButton,
  DropdownMenu,
} from '../../utils/ButtonSection';
import {
  faArrowLeft,
  faChevronLeft,
  faEllipsisVertical,
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faAnglesRight,
  faChevronRight,
  faCheck,
  faCaretDown,
  faChartLine,
  faTag,
  faPen,
  faCaretRight,
  faClipboard,
  faUser,
  faShareNodes,
  faFaceGrinStars,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import Image from '../../utils/ImageSection';
import images from '../../assets/images/blog.jpg';
import CommentSection from '../comment/CommentSectionCmp';
import ToolTip from '../../utils/toolTipSection';
import { Analytics, Analytics2 } from './expanded/analyticsCmp';
import PotentialBugFixes from './expanded/potentialBugFixes';
import RelatedReviews from './expanded/relatedReviewsCmp';
import RelatedResults from './expanded/relatedResultCmp';

const REACTIONS_DATA = [
  { id: 'likes', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: Colors.green_039000 },
];

const CARD_VIEW_OPTION = [
  { id: '1', icon: faPen, label: 'Edit bug report (owner)', icon_2: null, href: null },
  { id: '2', icon: faPen, label: 'Edit bug Fix (owner)', icon_2: null, href: null },
  { id: '3', icon: faPen, label: 'Edit Reusable Code (owner)', icon_2: null, href: null },
  { id: '4', icon: faClipboard, label: 'Assign bug to', icon_2: faCaretRight, href: null },
  { id: '5', icon: faComment, label: 'Comment', icon_2: null, href: null },
  { id: '6', icon: faUser, label: 'Contributions', icon_2: faCaretRight, href: null },
  { id: '7', icon: faShareNodes, label: 'Share', icon_2: null, href: null },
  { id: '8', icon: faThumbTack, label: 'Pin', icon_2: null, href: null },
  { id: '9', icon: faFaceGrinStars, label: 'Make a Review', icon_2: null, href: null },
  { id: '10', icon: faEyeSlash, label: 'I do not want to see this', icon_2: null, href: null },
  { id: '11', icon: faTrashCan, label: 'Delete bug report (owner)', icon_2: null, href: null },
  { id: '12', icon: faExclamation, label: 'Report', icon_2: faCaretRight, href: null },
];

const INSIGHT_DATA = [
  { id: 'Analytics', icon: faChartLine, color: Colors.orange_ff7811 },
  { id: 'Potential Bug Fixes', icon: faTag, color: Colors.green_039000 },
];

const IMPLEMENTATION_DATA = [
  {
    id: 'Description',
    title: 'Description',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Bug Report',
    title: 'Bug Report',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Steps to Reproduce',
    title: 'Steps to Reproduce',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Expected Behavior',
    title: 'Expected Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Actual Behavior',
    title: 'Actual Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
];

function ExpandedCard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCopied, setIsCopied] = useState(
    IMPLEMENTATION_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const [isCollapsed, setIsCollapsed] = useState(
    IMPLEMENTATION_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );
  const [isActive, setIsActive] = useState(
    REACTIONS_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );
  const [isInsight, setIsInsight] = useState('');

  const relatedResultsRef = useRef(null);
  const commentSectionsRef = useRef(null);

  return (
    <div className={classes.expanded_container}>
      <div className={classes.expanded_card_main_container}>
        <div className={`${classes.expanded_card_implentation_main_container}`}>
          {/* SOLUTION MAIN HEADER */}

          <div className={classes.implentation_header_container}>
            <div className={classes.header_options_container}>
              <ToolTip
                children={<IconButton icon={faArrowLeft} />}
                tooltipMessage={'Go Back Home'}
              />
              <SolidButton
                unwrap={true}
                buttonStyle={classes.options_button_container}
                label={'Solve Bug'}
              />
              <UserProfileHeader />
            </div>
            <div className={classes.header_options_container}>
              <div className={`d-none d-md-block`}>
                <HeaderOptions headerOptionMainContainer={'d-none d-xl-block'} />
              </div>
              <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={CARD_VIEW_OPTION} />
              <ToolTip
                children={
                  <IconButton
                    inconButtonStyle={'d-none d-xl-block'}
                    icon={isExpanded ? faChevronRight : faChevronLeft}
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                    }}
                  />
                }
                tooltipMessage={isExpanded ? 'Close Insight' : 'Open Insight'}
              />
            </div>
          </div>
          <Text textStyle={classes.implentation_second_header_container} h5={'Bug report title'} />
          <div className={classes.implentation_body_main_container}>
            {/* SOLUTION SECOND HEADER */}

            <div className={classes.body_reactions_container}>
              <Image
                imgContainerStyle={classes.img_container}
                imgStyle={classes.img}
                src={images}
              />
              <div className={classes.reactions_list_container}>
                {REACTIONS_DATA.map((data) => (
                  <ToolTip
                    children={
                      <IconTextButton
                        key={data.id}
                        inconTextButtonStyle={classes.list_icon_text_container}
                        icon={data.icon}
                        label={data.text}
                        colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
                        onClick={() => {
                          setIsActive((prev) => ({
                            ...prev,
                            [data.id]: !prev[data.id],
                          }));
                        }}
                      />
                    }
                    tooltipMessage={data.id}
                  />
                ))}
                <IconTextButton
                  icon={faComment}
                  inconTextButtonStyle={classes.list_comment_icon_text_container}
                  label={'Comment'}
                  onClick={() => commentSectionsRef.current.scrollIntoView({ behavior: 'smooth' })}
                />
              </div>
            </div>
            <hr className={classes.body_horizontal_line_container} />
            {/* SOLUTION BODY */}

            <div className={classes.body_solution_container}>
              {IMPLEMENTATION_DATA.map((data) => (
                <div key={data.id}>
                  <IconTextButton
                    inconTextButtonStyle={classes.body_solution_title_container}
                    label={data.title}
                    icon_={faChevronDown}
                    onClick={() => {
                      setIsCollapsed((prev) => ({
                        ...prev,
                        [data.id]: !prev[data.id],
                      }));
                    }}
                  />
                  {!isCollapsed[data.id] && (
                    <div className={classes.body_solution_content_container}>
                      <div className={classes.body_solution_icon_button}>
                        <ToolTip
                          children={
                            <IconButton
                              icon={!isCopied[data.id] ? faCopy : faCheck}
                              onClick={() => {
                                setIsCopied((prev) => ({
                                  ...prev,
                                  [data.id]: !prev[data.id],
                                }));
                              }}
                            />
                          }
                          tooltipMessage={!isCopied[data.id] ? 'Copy' : 'Copied'}
                        />
                      </div>

                      <hr className={classes.body_horizontal_line_container} />
                      <Text
                        textStyle={classes.body_solution_text_content_container}
                        p16={data.content}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* FOOTER BUTTONS */}

            <div className={classes.body_suggestion_container}>
              <OutlinedButton
                buttonMainContainerStyle={classes.body_suggestion_button_main_container}
                buttonTextContainerStyle={classes.body_suggestion_text_container}
                buttonTextStyle={classes.body_suggestion_button_text}
                buttonStyle={classes.body_suggestion_button_container}
                label={'View People Contributions'}
              />
              <Icon icon={faAnglesRight} />
              <OutlinedButton
                buttonMainContainerStyle={classes.body_suggestion_button_main_container}
                buttonTextStyle={classes.body_suggestion_button_text}
                buttonStyle={classes.body_suggestion_button_container}
                label={'Solve the bug'}
              />
              <Icon icon={faAnglesRight} />
              <DropdownMenu
                dropDownMenuStyle={classes.body_suggestion_drop_down_menu}
                buttonLabel={'Assign bug to'}
                buttonIcon={faCaretDown}
                menuItems={[
                  { label: 'Action', href: '#' },
                  { label: 'Another action', href: '#' },
                  { label: 'Something else here', href: '#' },
                ]}
              />
              <Icon icon={faAnglesRight} />
            </div>
            {/* ANALYTICS (WHEN SIDEBAR IS COLLAPSED) */}

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

            {/* COMMENTS */}

            <div ref={commentSectionsRef} className={classes.body_comment_container}>
              <Text textStyle={classes.comment_title_container} h6={'Comments'} />
              <CommentSection />
            </div>
          </div>
        </div>

        {isExpanded && (
          <div
            className={`col-5 d-none d-xl-block ${classes.expanded_card_analytics_main_container}`}
          >
            {/* ANALYTICS */}
            <Analytics />

            {/* POTENTIAL --- */}
            <PotentialBugFixes />
          </div>
        )}
      </div>
      {/* REVIEWS */}

      <RelatedReviews
        onClick={() => relatedResultsRef.current.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* RELATED RESULTS */}

      <div ref={relatedResultsRef} className={classes.expanded_card_related_results_main_container}>
        <RelatedResults />
      </div>
    </div>
  );
}

export default ExpandedCard;
