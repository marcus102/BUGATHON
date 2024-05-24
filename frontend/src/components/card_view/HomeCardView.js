import React, { useState, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './HomeCardView.module.css';
import Colors from '../../constants/colors';
import {
  SolidButton,
  IconTextButton,
  ButtonContainer,
  IconButton,
} from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import {
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faChartSimple,
  faEllipsisVertical,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import UserProfileHeader from '../userProfileHeaderCmp';
import HeaderOptions from '../headerOptionsCmp';

const DUMMY_DATA = [
  { id: '1', button: 'java', color: Colors.yellow_a99000 },
  { id: '2', button: 'python', color: Colors.blue_57a3fb },
  { id: '3', button: '...', color: Colors.gray_aaaaaa5e },
];

const REACTIONS_DATA = [
  { id: 'like', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  { id: 'comment', icon: faComment, text: '5K', activeColor: Colors.blue_0075FF },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: Colors.green_039000 },
  { id: 'impression', icon: faChartSimple, text: '50K', activeColor: Colors.orange_ff7811 },
];

function HomeCard({
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
}) {
  const REACTIONS = CUSTOM_REACTIONS_DATA ? CUSTOM_REACTIONS_DATA : REACTIONS_DATA;

  const [isActive, setIsActive] = useState(
    REACTIONS.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  const { overlayHandler } = useContext(ManagmentSystem);

  return (
    <ButtonContainer
      buttonContainerMainContainer={
        cardButtonState === 'bug_report'
          ? classes.bug_report
          : cardButtonState === 'bug_fix'
          ? classes.bug_fix
          : cardButtonState === 'reusable_code'
          ? classes.reusable_code
          : null
      }
    >
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
          <IconButton
            icon={faEllipsisVertical}
            onClick={() => {
              overlayHandler('card_view_menu', 'menu');
            }}
          />
        </div>
      </div>
      <div className={classes.home_card_body_container}>
        {postTitle && <Text h4={postTitle} />}
        {postDescription && <Text p16Style={classes.body_paragraph_text} p16={postDescription} />}
        {children}
      </div>
      <div className={classes.home_card_footer_container}>
        <Text textStyle={classes.timestamp_container} label10={'1mn ago'} />
        <div className={classes.footer_main_container}>
          <div className={classes.footer_tag_container}>
            {DUMMY_DATA.map((data) => (
              <SolidButton
                buttonMainContainerStyle={classes.tag_button_main_container}
                buttonContainerStyle={classes.tag_button_container}
                buttonStyle={classes.tag_button}
                key={data.id}
                children={<Text label12Style={classes.label12_style} label12={data.button} />}
              />
            ))}
          </div>
          <div className={classes.footer_reaction_container}>
            {REACTIONS.map((data) => (
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
            ))}
          </div>
        </div>
      </div>
    </ButtonContainer>
  );
}

export default HomeCard;
