import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
// import classes from './NotificationCmp.module.css';
import { faTrashCan, faExclamation, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import profile_1 from '../../../assets/images/study.jpg';
import profile_2 from '../../../assets/images/people.jpg';
import CustomMenu from '../../custom/CustomMenuCmp';

const NOTIFICATION_HEADER = [
  { id: '1', icon: faCheckDouble, label: 'Marl All As Read' },
  { id: '2', icon: faTrashCan, label: 'Clear All' },
];

const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    user: { username: 'user', profile: profile_1 },
    title: 'From @marcus 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat. Mauris eleifend eros id metus volutpat',
    type: 'request',
  },
  {
    id: '2',
    user: { username: 'user', profile: profile_2 },
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
  const { dropDownDefault } = useContext(ManagmentSystem);
  const { notification } = dropDownDefault;
  return (
    <CustomMenu
      title={'Notifications'}
      dropDown={NOTIFICATION_DROP_DOWN}
      METADATA={DUMMY_NOTIFICATIONS}
      option={NOTIFICATION_OPTION}
      button={NOTIFICATION_BUTTON}
      headerOption={NOTIFICATION_HEADER}
      solidButtonDataType={'request'}
      emptyContentLabel={'No Notifications Available yet!'}
      buttonLabel={notification}
      my_key={'notification'}
    />
  );
}

export default Notification;
