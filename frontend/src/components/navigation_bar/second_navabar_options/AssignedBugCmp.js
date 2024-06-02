import React from 'react';
import classes from './AssignedBugCmp.module.css';
import Colors from '../../../constants/colors';
import {
  DropdownMenu,
  DynamicLabelDropdownMenu,
  SolidButton,
  OutlinedButton,
  IconButton,
} from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import {
  faThumbTack,
  faArrowUpFromBracket,
  faTrashCan,
  faExclamation,
  faCaretRight,
  faEllipsisVertical,
  faChevronDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import profile_1 from '../../../assets/images/study.jpg';
import profile_2 from '../../../assets/images/people.jpg';
import Image from '../../../utils/ImageSection';

const DUMMY_ASSIGNED_BUG = [
  {
    id: '1',
    profile: profile_1,
    profile_2: profile_2,
    title: 'Bug report assigned to you by @leyla 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    tag: 'Critical',
    type: 'submited',
  },
  {
    id: '2',
    profile: profile_2,
    profile_2: profile_1,
    title: 'Bug report assigned to you by @ben 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    tag: 'Pending',
    type: 'recieved',
  },
  {
    id: '3',
    profile: profile_1,
    profile_2: profile_2,
    title: 'Bug report assigned to you by @leyla 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    tag: 'Stable',
    type: 'recieved',
  },
];

const ASSIGNMENT_BUG_BUTTON = [
  { id: '1', button_label: 'Yes I Will' },
  { id: '2', button_label: 'I Will Do It Later' },
  { id: '3', button_label: 'No I Am Busy' },
];

const ASSIGNMENT_REACTIONS_DATA = [
  { id: 'like', icon: faHeart, active_color: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, active_color: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, active_color: Colors.green_039000 },
];

const ASSIGNMENT_DROP_DOWN = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Pinned' },
  { id: '3', label: 'For Me' },
  { id: '4', label: 'For others' },
  { id: '5', label: 'Critical' },
  { id: '6', label: 'Relevant' },
  { id: '7', label: 'Oldest' },
  { id: '8', label: 'Recent' },
];

const ASSIGNMENT_OPTION = [
  { id: '1', icon: faThumbTack, label: 'Pin', icon_2: null },
  { id: '2', icon: faHeart, label: 'Like contribution', icon_2: null },
  { id: '3', icon: faArrowUpFromBracket, label: 'Share contribution', icon_2: null },
  { id: '4', icon: faTrashCan, label: 'Remove this bug assignment', icon_2: null },
  { id: '5', icon: faExclamation, label: 'Report (users only)', icon_2: faCaretRight },
];

function AssignedBug() {
  return (
    <div className={classes.header_option_main_container}>
      <div className={classes.option_header_container}>
        <Text h5={'Assigned Bugs'} />
        <DynamicLabelDropdownMenu
          dropDownMenuStyle={classes.option_header_menu_container}
          buttonIcon={faChevronDown}
          menuItems={ASSIGNMENT_DROP_DOWN}
        />
      </div>

      {DUMMY_ASSIGNED_BUG.map((data) => (
        <div key={data.id} className={classes.header_option_content_main_container}>
          <div className={classes.option_content_header_container}>
            <div className={classes.option_content_img_main_container}>
              <Image
                imgContainerStyle={classes.content_img_container}
                imgStyle={classes.content_img}
                src={data.profile}
                alt={'profile_1'}
              />
              <Image
                imgContainerStyle={classes.content_img_container}
                imgStyle={classes.content_img}
                src={data.profile_2}
                alt={'profile_2'}
              />
            </div>
            <div className={classes.option_content_body_container}>
              <div className={classes.option_content_body_text_container}>
                <Text h6={data.title} />
                <Text
                  textStyle={`${classes.content_body_critical_tag_container}`}
                  label10={data.tag}
                />
              </div>
              <Text p16={data.notification} />
            </div>
            <DropdownMenu
              dropDownMenuStyle={classes.option_content_body_menu_container}
              buttonIcon={faEllipsisVertical}
              menuItems={ASSIGNMENT_OPTION}
            />
          </div>
          <OutlinedButton
            buttonStyle={classes.header_option_outlined_button_container}
            buttonMainContainerStyle={classes.header_option_outlined_button_main_container}
            label={'View more...'}
          />
          {data.type === 'recieved' && (
            <div className={classes.option_content_body_2_container}>
              {ASSIGNMENT_BUG_BUTTON.map((btn_data) => (
                <SolidButton
                  key={btn_data.id}
                  buttonMainContainerStyle={classes.header_option_solid_button_main_container}
                  buttonStyle={classes.header_option_solid_button_container}
                  label={btn_data.button_label}
                />
              ))}
            </div>
          )}

          <div className={classes.option_content_footer_container}>
            {ASSIGNMENT_REACTIONS_DATA.map((icon_data) => (
              <IconButton
                key={icon_data.id}
                icon={icon_data.icon}
                colorOnMouseUp={icon_data.active_color}
              />
            ))}
          </div>
          <hr className={classes.header_option_horizontal_line_container} />
        </div>
      ))}
    </div>
  );
}

export default AssignedBug;
