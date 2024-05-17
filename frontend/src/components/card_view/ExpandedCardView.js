import React from 'react';
import classes from './ExpandedCardView.module.css';
import Colors from '../../constants/colors';
import HeaderOptions from '../headerOptionsCmp';
import UserProfileHeader from '../userProfileHeaderCmp';
import {
  SolidButton,
  IconButton,
  OutlinedButton,
  IconTextButton,
  DropDownButton,
} from '../../utils/ButtonSection';
import {
  faArrowLeft,
  faChevronLeft,
  faEllipsisVertical,
  faHeart,
  faComment,
  faThumbTack,
  faArrowUpFromBracket,
  faCopy,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../../utils/TextSection';
import Icon from '../../utils/IconSection';
import Image from '../../utils/ImageSection';
import images from '../../assets/images/post-it-4129907.jpg';

const REACTIONS_DATA = [
  { id: 'like', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  // { id: 'comment', icon: faComment, text: '5K', activeColor: Colors.blue_0075FF },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: Colors.green_039000 },
  // { id: 'impression', icon: faChartSimple, text: '50K', activeColor: Colors.orange_ff7811 },
];

const IMPLEMENTATION_DATA = [
  {
    id: '1',
    title: 'Description',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '2',
    title: 'Bug Report',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '3',
    title: 'Steps to Reproduce',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '4',
    title: 'Expected Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '5',
    title: 'Actual Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
];

function ExpandedCard() {
  return (
    <div className={classes.expanded_card_main_container}>
      <div className={classes.expanded_card_implentation_main_container}>
        <div className={classes.implentation_header_container}>
          <div className={classes.header_options_container}>
            <IconButton icon={faArrowLeft} />
            <SolidButton buttonStyle={classes.options_button_container} label={'Solve Bug'} />
            <HeaderOptions />
          </div>
          <div className={classes.header_options_container}>
            <UserProfileHeader />
            <IconButton icon={faEllipsisVertical} />
            <IconButton icon={faChevronLeft} />
          </div>
        </div>
        <Text textStyle={classes.implentation_second_header_container} h5={'Bug report title'} />
        <div className={classes.implentation_body_main_container}>
          <div className={classes.body_reactions_container}>
            <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />
            <div className={classes.reactions_list_container}>
              {REACTIONS_DATA.map((data) => (
                <IconTextButton
                  key={data.id}
                  inconTextButtonStyle={classes.list_icon_text_container}
                  icon={data.icon}
                  label={data.text}
                />
              ))}
              <IconTextButton
                icon={faComment}
                inconTextButtonStyle={classes.list_comment_icon_text_container}
                label={'Comment'}
              />
            </div>
          </div>
          <hr className={classes.body_horizontal_line_container} />
          <div className={classes.body_solution_container}>
            {IMPLEMENTATION_DATA.map((data) => (
              <div key={data.id}>
                <Text textStyle={classes.body_solution_title_container} h5={data.title} />
                <div className={classes.body_solution_content_container}>
                  <IconButton icon={faCopy} />
                  <hr className={classes.body_horizontal_line_container} />
                  <Text
                    textStyle={classes.body_solution_text_content_container}
                    p16={data.content}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={classes.body_suggestion_container}>
            <OutlinedButton
              buttonMainContainerStyle={classes.body_suggestion_button_main_container}
              buttonStyle={classes.body_suggestion_button_container}
              label={'View People Contributions or Solutions'}
            />
            <Icon icon={faAnglesRight} />
            <OutlinedButton
              buttonMainContainerStyle={classes.body_suggestion_button_main_container}
              buttonStyle={classes.body_suggestion_button_container}
              label={'Solve the bug'}
            />
            <Icon icon={faAnglesRight} />
            <DropDownButton
              buttonLabel={'Assign bug to'}
              menuItems={[
                { label: 'Action', href: '#' },
                { label: 'Another action', href: '#' },
                { label: 'Something else here', href: '#' },
              ]}
            />
            <Icon icon={faAnglesRight} />
          </div>
        </div>
      </div>
      <div className={classes.expanded_card_analytics_main_container}>
        <div className={classes.analytics_recommendation_container}></div>
        <div className={classes.analytics_analytic_container}></div>
        <div className={classes.analytics_comment_container}></div>
      </div>
    </div>
  );
}

export default ExpandedCard;
