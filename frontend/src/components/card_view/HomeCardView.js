import React, { useState } from 'react';
import classes from './HomeCardView.module.css';
import Image from '../../utils/ImageSection';
import {
  SolidButton,
  IconButton,
  OutlinedButton,
  IconTextButton,
  ButtonContainer,
} from '../../utils/ButtonSection';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Text from '../../utils/TextSection';
import images from '../../assets/images/earth-2254769.jpg';
import {
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import Colors from '../../constants/colors';

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
  homeCardMainContainerStyle,
  homeCardHeaderContainerStyle,
  headerProfileContainerStyle,
  profileContainerStyle,
  profileUsernameContainerStyle,
  headerOptionContainerStyle,
  optionImgContainerStyle,
  homeCardBodyContainerStyle,
  homeCardFooterContainerStyle,
  footerMainContainerStyle,
  footerTagContainerStyle,
  footerReactionContainerStyle,
  username,
  titmestamp,
  tagButton,
  proffession,
  postTitle,
  postDescription,
  children,
}) {
  const [isActive, setIsActive] = useState(
    REACTIONS_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );

  return (
    <ButtonContainer className={[homeCardMainContainerStyle, ''].join(' ')}>
      <div className={[classes.home_card_header_container, homeCardHeaderContainerStyle].join(' ')}>
        <div className={[classes.header_profile_container, headerProfileContainerStyle].join(' ')}>
          <div className={[classes.profile_container, profileContainerStyle].join(' ')}>
            <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />

            <IconTextButton
              inconTextButtonStyle={classes.username_button_container}
              children={
                <>
                  <Text label12Style={classes.username_label12_style} label12={'@marcus'} />
                  <Text label10Style={classes.profession_label10_style} label10={'UI/UX design'} />
                </>
              }
            />
          </div>
          <OutlinedButton
            buttonContainerStyle={classes.follow_button_container}
            buttonStyle={classes.follow_button}
            children={<Text label12Style={classes.follow_label12_style} label12={'Follow'} />}
          />
        </div>
        <div className={[classes.header_options_container, headerOptionContainerStyle].join(' ')}>
          <SolidButton
            buttonContainerStyle={[classes.solid_button_container].join(' ')}
            buttonStyle={classes.solid_button}
            children={
              <>
                <Text label10Style={classes.contrib_label10_style} label10={'10K Contributions'} />
                <div className={[classes.options_img_container, optionImgContainerStyle].join(' ')}>
                  <Image
                    imgContainerStyle={classes.contrib_img_container}
                    imgStyle={classes.contrib_img}
                    src={images}
                  />
                  <Image
                    imgContainerStyle={classes.contrib_img_container}
                    imgStyle={classes.contrib_img}
                    src={images}
                  />
                  <Image
                    imgContainerStyle={classes.contrib_img_container}
                    imgStyle={classes.contrib_img}
                    src={images}
                  />
                </div>
                <Text label16Style={classes.contrib_label16_style} label16={'...'} />
              </>
            }
          />
          <IconButton icon={faEllipsisVertical} />
        </div>
      </div>
      <div className={[classes.home_card_body_container, homeCardBodyContainerStyle].join(' ')}>
        {postTitle && <Text h4={postTitle} />}
        {postDescription && <Text p16Style={classes.body_paragraph_text} p16={postDescription} />}
        {children}
      </div>
      <div className={[classes.home_card_footer_container, homeCardFooterContainerStyle].join(' ')}>
        <Text textStyle={classes.timestamp_container} label10={'1mn ago'} />
        <div className={[classes.footer_main_container, footerMainContainerStyle].join(' ')}>
          <div className={[classes.footer_tag_container, footerTagContainerStyle].join(' ')}>
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
          <div
            className={[classes.footer_reaction_container, footerReactionContainerStyle].join(' ')}
          >
            {REACTIONS_DATA.map((data) => (
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
