import React from 'react';
import classes from './moderationCmp.module.css';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import { OutlinedButton } from '../../../utils/ButtonSection';
import { useLoaderData, Form } from 'react-router-dom';

const Moderation = () => {
  const data = useLoaderData();

  const MODERATION_DATA = [
    {
      id: '1',
      title: 'Blocked users',
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
          link: null,
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
    },
    {
      id: '2',
      title: null,
      children: data.data,
    },
  ];

  return (
    <>
      {MODERATION_DATA.map((data, index) => (
        <div key={`${data.id}-${index}`} className={classes.moderation_main_container}>
          <Text h5={data.title} />
          {data.id === '1' && renderBlockUser(data.children)}
          {data.id === '2' && renderBlockedUsers(data.children)}
        </div>
      ))}
    </>
  );
};

export default Moderation;

const renderBlockUser = (children) => {
  return children.map((sub_data, sub_index) => (
    <div key={`${sub_data.id}-${sub_index}`} className={classes.moderation_container}>
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
  return children.length > 0 ? (
    children.map((sub_data, sub_index) => (
      <div key={`${sub_data.id}-${sub_index}`} className={classes.moderation_container_2}>
        <div className={classes.moderation_description_container_2}>
          <Text label12={`Username: ${sub_data.blockedUser.username}`} />
          <Text
            label12={`Full Name:  ${sub_data.blockedUser.firstName} ${sub_data.blockedUser.lastName}`}
          />

          <Text label12={`Reason: ${sub_data.reason}`} />
          <Text label12={`Date: ${sub_data.createdAt}`} />
        </div>
        <Form method="delete">
          <input type="hidden" id="block_id" name="block_id" value={sub_data._id} />
          <OutlinedButton
            unwrap={true}
            buttonStyle={classes.outlined_button_container}
            label={'Unblock User'}
          />
        </Form>
      </div>
    ))
  ) : (
    <Text h4={'No Blocked Users'} />
  );
};
