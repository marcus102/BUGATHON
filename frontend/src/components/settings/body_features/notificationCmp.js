import React from 'react';
import classes from './notificationCmp.module.css';
import { CheckBox, Radio } from '../../../utils/InputSection';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';

const NOTIFICATION_DATA = [
  {
    id: '1',
    title: 'General',
    sub_title: 'Email Notification',
    description:
      'Shortcuts are a convenient way to streamline your experience on our platform. They allow you to create customized commands or actions that help you accomplish tasks more efficiently. Think of Shortcuts as personalized shortcuts to your favorite features or actions.',
    description_link: 'Learn more about shortcuts',
    children: [
      { id: '1.1', label: 'Enable (default)' },
      { id: '1.2', label: 'Disable' },
    ],
    label: null,
  },
  {
    id: '2',
    title: 'System',
    sub_title: 'Daily Notifications',
    description:
      'Shortcuts are a convenient way to streamline your experience on our platform. They allow you to create customized commands or actions that help you accomplish tasks more efficiently. Think of Shortcuts as personalized shortcuts to your favorite features or actions.',
    description_link: 'Learn more about shortcuts',
    children: [
      { id: '2.1', label: 'Enable (default)' },
      { id: '2.2', label: 'Disable' },
    ],
    label: null,
  },
  {
    id: '3',
    title: 'Account',
    sub_title: null,
    description: null,
    description_link: null,
    children: [],
    label: 'Notify me whenever I have been blocked',
  },
];

function Notification() {
  return (
    <>
      {NOTIFICATION_DATA.map((data) => (
        <div key={data.id} className={classes.notification_main_container}>
          <Text h5={data.title} />
          {data.sub_title && <Text h6={data.sub_title} />}
          {data.description && (
            <div className={classes.notification_container}>
              <Text label12={data.description} />
              <Link underline={true} children12={data.description_link} />
            </div>
          )}
          {data.children.length !== 0 && (
            <div className={classes.radio_container}>
              {data.children.map((sub_data) => (
                <Radio key={sub_data.id} label={sub_data.label} />
              ))}
            </div>
          )}

          {data.label && <CheckBox label16={data.label} />}
        </div>
      ))}
    </>
  );
}

export default Notification;
