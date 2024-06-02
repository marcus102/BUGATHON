import React from 'react';
import classes from './NotificationCmp.module.css';
import {
  DropdownMenu,
  DynamicLabelDropdownMenu,
  SolidButton,
  OutlinedButton,
  IconTextButton,
  ButtonContainer,
} from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import {
  faTrashCan,
  faExclamation,
  faCheckDouble,
  faEllipsisVertical,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import profile_1 from '../../../assets/images/study.jpg';
import profile_2 from '../../../assets/images/people.jpg';
import Image from '../../../utils/ImageSection';

const NOTIFICATION_HEADER = [
  { id: '1', icon: faCheckDouble, label: 'Marl All As Read' },
  { id: '1', icon: faTrashCan, label: 'Clear All' },
];

const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    profile: profile_1,
    title: 'From @marcus 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: 'request',
  },
  {
    id: '2',
    profile: profile_2,
    title: 'From @marcus 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: null,
  },
];

const NOTIFICATION_BUTTON = [
  { id: '1', button_label: 'Accept' },
  { id: '2', button_label: 'Reject' },
];

const NOTIFICATION_DROP_DOWN = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Unread Notifications' },
  { id: '3', label: 'Read Notifications' },
  { id: '4', label: 'Recent' },
  { id: '5', label: 'Oldest' },
];

const NOTIFICATION_OPTION = [
  { id: '1', icon: faCheckDouble, label: 'Mark As Read', icon_2: null },
  { id: '2', icon: faEyeSlash, label: 'Hide notificaton', icon_2: null },
  { id: '3', icon: faTrashCan, label: 'Remove this bug notification', icon_2: null },
  { id: '4', icon: faExclamation, label: 'Report (users only)', icon_2: null },
];

function Notification() {
  return (
    <div className={classes.header_option_main_container}>
      <div className={classes.option_header_container}>
        <Text h5={'Notifications'} />
        <div className={classes.option_header_button_container}>
          {NOTIFICATION_HEADER.map((data) => (
            <IconTextButton
              unwrap={true}
              inconTextButtonStyle={classes.option_header_icon_text_button_container}
              key={data.id}
              label={data.label}
              icon={data.icon}
            />
          ))}
          <DynamicLabelDropdownMenu
            dropDownMenuStyle={classes.option_header_menu_container}
            buttonIcon={faChevronDown}
            menuItems={NOTIFICATION_DROP_DOWN}
          />
        </div>
      </div>
      <hr className={classes.header_option_horizontal_line_container} />

      {DUMMY_NOTIFICATIONS.map((data) => (
        <div key={data.id} className={classes.header_option_content_main_container}>
          <div className={classes.option_content_header_container}>
            <Image
              imgContainerStyle={classes.content_img_container}
              imgStyle={classes.content_img}
              src={data.profile}
              alt={'profile'}
            />
            <div className={classes.option_content_body_container}>
              <Text h6={data.title} />
              <Text p16={data.notification} />
            </div>
            <DropdownMenu
              dropDownMenuStyle={classes.option_content_body_menu_container}
              buttonIcon={faEllipsisVertical}
              menuItems={NOTIFICATION_OPTION}
            />
          </div>
          <OutlinedButton
            buttonStyle={classes.header_option_outlined_button_container}
            buttonMainContainerStyle={classes.header_option_outlined_button_main_container}
            label={'View more...'}
          />
          {data.type === 'request' && (
            <div className={classes.option_content_footer_container}>
              {NOTIFICATION_BUTTON.map((btn_data) => (
                <ButtonContainer
                  key={btn_data.id}
                  buttonContainerMainContainer={classes.footer_option_solid_button_container}
                  children={<Text unwrap={true} label16={btn_data.button_label} />}
                />
              ))}
            </div>
          )}
          <hr className={classes.header_option_horizontal_line_container} />
        </div>
      ))}
    </div>
  );
}

export default Notification;
