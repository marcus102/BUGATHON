import React, { useState } from 'react';
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
import { CARD_VIEW_OPTION, DUMMY_USERS } from '../../data/Database';

// Header component
const HomeCardHeader = ({
  username,
  profession,
  profileImg,
  isHeaderOption,
  contributionsCount,
  contributionsArray,
}) => (
  <div className={classes.home_card_header_container}>
    <UserProfileHeader username={username} profession={profession} profileImg={profileImg} />
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
const HomeCardBody = ({ postTitle, postDescription, children }) => (
  <div className={classes.home_card_body_container}>
    {postTitle && <Text h4={postTitle} />}
    {postDescription && <Text p16Style={classes.body_paragraph_text} p16={postDescription} />}
    {children}
  </div>
);

// Footer component
const HomeCardFooter = ({ TAGS, timestamp, REACTIONSMETADATA, isActive, setIsActive }) => (
  <div className={classes.home_card_footer_container}>
    <div className={classes.footer_tag_container}>
      {TAGS &&
        TAGS.map((tag) => (
          <ToolTip tooltipMessage={tag.about} key={tag.id}>
            <PlaneButton label12={tag.button} />
          </ToolTip>
        ))}
      <Text textStyle={classes.timestamp_container} label10={timestamp} />
    </div>
    <div className={classes.footer_reaction_container}>
      {REACTIONSMETADATA &&
        REACTIONSMETADATA.map((data) => (
          <ToolTip tooltipMessage={data.id} key={data.id}>
            <IconTextButton
              onClick={() => {
                setIsActive((prev) => ({
                  ...prev,
                  [data.id]: !prev[data.id],
                }));
              }}
              inconTextButtonStyle={classes.reaction_icon_text_button_container}
              colorOnMouseUp={isActive[data.id] ? data.activeColor : undefined}
              icon={data.icon}
            >
              <Text label12Style={classes.reaction_label12_style} label12={data.count} />
            </IconTextButton>
          </ToolTip>
        ))}
    </div>
  </div>
);

function HomeCard({
  homeCardStyle,
  cardButtonState,
  isHeaderOption,
  username,
  contributionsCount,
  timestamp,
  TAGS,
  profession,
  postTitle,
  postDescription,
  children,
  REACTIONSMETADATA,
  contributionsArray,
  postId,
}) {
  const [isActive, setIsActive] = useState(
    REACTIONSMETADATA &&
      REACTIONSMETADATA.reduce((acc, reaction) => {
        acc[reaction.id] = false;
        return acc;
      }, {})
  );

  const navigate = useNavigate();

  const currentUser = DUMMY_USERS.find((user) => user.username === username);

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
        username={currentUser.username}
        profession={currentUser.profession}
        profileImg={currentUser.profile}
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
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </div>
  );
}

export default HomeCard;
