import React from 'react';
import classes from './moderationCmp.module.css';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import { SolidButton, OutlinedButton } from '../../../utils/ButtonSection';
import { Input } from '../../../utils/InputSection';

const MODERATION_DATA = [
  {
    id: '1',
    title: 'Block a user',
    children: [
      {
        id: '1.1',
        title: 'Blocking a user prevents the following on all your activities like',
        lists: [
          {
            id: '1.1.1',
            label: 'Seeing your bug reports, gub fixes, reusable code, and blog post',
          },
          { id: '1.1.2', label: 'Commenting' },
          { id: '1.1.3', label: 'Starring on user’s account' },
        ],
        link: 'learn more ...',
      },
      {
        id: '1.2',
        title: 'Additionally, blocked users are not able to',
        lists: [
          { id: '1.2.1', label: 'Assign bug report' },
          { id: '1.2.2', label: 'Be a collaborator' },
        ],
        link: 'learn more ...',
      },
    ],
    label: 'Search and block user',
    placeholder: 'search by email or username',
    button: 'Block User',
  },
  {
    id: '2',
    title: 'Blocked users',
    children: [
      {
        id: '2.1',
        username: 'Username: @user1',
        reason: 'Reason: Reason why user has been blocked',
        date: 'Date: 10/06/2024',
        button: 'Unblock User',
      },
      {
        id: '2.2',
        username: 'Username: @user2',
        reason: 'Reason: Reason why user has been blocked',
        date: 'Date: 11/06/2024',
        button: 'Unblock User',
      },
    ],
    label: null,
    placeholder: null,
    button: null,
  },
];

const Moderation = () => {
  return (
    <>
      {MODERATION_DATA.map((data) => (
        <div key={data.id} className={classes.moderation_main_container}>
          <Text h5={data.title} />
          {data.id === '1' && renderBlockUser(data.children)}
          {data.id === '2' && renderBlockedUsers(data.children)}
          {data.id === '1' && (
            <div className={classes.moderation_input_container}>
              {data.label && <Input label={data.label} placeholder={data.placeholder} />}
              {data.button && (
                <SolidButton buttonStyle={classes.solid_button_container} label={data.button} />
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const renderBlockUser = (children) => {
  return children.map((sub_data) => (
    <div key={sub_data.id} className={classes.moderation_container}>
      <Text h6={sub_data.title} />
      <div className={classes.moderation_description_container}>
        {sub_data.lists.map((list) => (
          <Text key={list.id} label12={list.label} />
        ))}
      </div>
      <Link underline children14={sub_data.link} />
    </div>
  ));
};

const renderBlockedUsers = (children) => {
  return children.map((sub_data) => (
    <div key={sub_data.id} className={classes.moderation_container_2}>
      <div className={classes.moderation_description_container_2}>
        <Text label12={sub_data.username} />
        <Text label12={sub_data.reason} />
        <Text label12={sub_data.date} />
      </div>
      <OutlinedButton
        unwrap={true}
        buttonStyle={classes.outlined_button_container}
        label={sub_data.button}
      />
    </div>
  ));
};

export default Moderation;
