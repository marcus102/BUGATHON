import React, { useState } from 'react';
import classes from './HomeCardView.module.css';
import Colors from '../../constants/colors';
import { IconTextButton, IconButton, DropdownMenu, PlaneButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import {
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faChartSimple,
  faEllipsisVertical,
  faEllipsis,
  faPen,
  faCaretRight,
  faClipboard,
  faUser,
  faShareNodes,
  faFaceGrinStars,
  faEyeSlash,
  faTrashCan,
  faExclamation,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import UserProfileHeader from '../userProfileHeaderCmp';
import HeaderOptions from '../headerOptionsCmp';
import ToolTip from '../../utils/toolTipSection';
import { useNavigate } from 'react-router-dom';

const DUMMY_TAG_DATA = [
  {
    id: '1',
    button: 'java',
    about:
      'versatile, object-oriented programming language for building cross-platform applications.',
    color: Colors.yellow_a99000,
  },
  {
    id: '2',
    button: 'python',
    about: 'versatile, readable, powerful language for web development, data science, automation.',
    color: Colors.blue_57a3fb,
  },
  { id: '3', button: '...', about: 'Click for more...', color: Colors.gray_aaaaaa5e },
];

const REACTIONS_DATA = [
  { id: 'likes', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  { id: 'comments', icon: faComment, text: '5K', activeColor: null },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: null },
  { id: 'impression', icon: faChartSimple, text: '50K', activeColor: null },
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

function HomeCard({
  homeCardStyle,
  cardButtonState,
  isHeaderOption,
  username,
  contributions,
  titmestamp,
  tagButton,
  proffession,
  postTitle,
  postDescription,
  children,
  CUSTOM_REACTIONS_DATA,
  postId,
}) {
  const REACTIONS = CUSTOM_REACTIONS_DATA ? CUSTOM_REACTIONS_DATA : REACTIONS_DATA;

  const [isActive, setIsActive] = useState(
    REACTIONS.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

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

      <div className={classes.home_card_header_container}>
        <UserProfileHeader username={username} profession={proffession} />
        <div className={classes.header_options_container}>
          {isHeaderOption ? (
            <HeaderOptions contributions={contributions} />
          ) : (
            <IconButton
              inconButtonStyle={classes.header_options_icon_container}
              icon={faEllipsis}
            />
          )}

          <DropdownMenu buttonIcon={faEllipsisVertical} menuItems={CARD_VIEW_OPTION} />
        </div>
      </div>
      {/* BODY */}

      <div className={classes.home_card_body_container}>
        {postTitle && <Text h4={postTitle} />}
        {postDescription && <Text p16Style={classes.body_paragraph_text} p16={postDescription} />}
        {children}
      </div>

      <IconTextButton
        inconTextButtonStyle={classes.more_button}
        label={'Click for more'}
        icon_={faArrowUpRightFromSquare}
        onClick={() => {
          if (cardButtonState === 'bug_report') {
            navigate(`${postId}/?post=${'bug_report'}`);
          } else if (cardButtonState === 'bug_fix') {
            navigate(`${postId}/?post=${'bug_fix'}`);
          } else if (cardButtonState === 'reusable_code') {
            navigate(`${postId}/?post=${'reusable_code'}`);
          }
        }}
      />
      {/* FOOTER */}

      <div className={classes.home_card_footer_container}>
        <div className={classes.footer_tag_container}>
          {DUMMY_TAG_DATA.map((data) => (
            <ToolTip
              children={<PlaneButton key={data.id} label12={data.button} />}
              tooltipMessage={data.about}
            />
          ))}
          <Text textStyle={classes.timestamp_container} label10={titmestamp} />
        </div>
        <div className={classes.footer_reaction_container}>
          {REACTIONS.map((data) => (
            <ToolTip
              children={
                <IconTextButton
                  key={data.id}
                  onClick={() => {
                    setIsActive((prev) => ({
                      ...prev,
                      [data.id]: !prev[data.id],
                    }));
                  }}
                  inconTextButtonStyle={classes.reaction_icon_text_button_container}
                  children={
                    <Text label12Style={classes.reaction_label12_style} label12={data.text} />
                  }
                  colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
                  icon={data.icon}
                />
              }
              tooltipMessage={data.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
