import React from 'react';
import classes from './AdminDashBoardCmp.module.css';
import Text from '../../../utils/TextSection';
import UserProfileHeader from '../../userProfileHeaderCmp';
import Line from '../../../utils/LineSection';
import { DUMMY_USERS } from '../../../data/Database';
import { Image } from '../../../utils/MediaSection';

const AdminDashBoard = () => {
  return (
    <div className={classes.main_container}>
      <Text textStyle={classes.text_style} h6={'Admin Dashboard'} />
      <Line direction={'horizontal'} />
      <Text textStyle={classes.text_style} h6={'All Users'} />
      <div className={classes.user_container}>
        {DUMMY_USERS.map((user) => (
          <UserProfileHeader
            key={user.id}
            username={user.username}
            profession={user.profession}
            hideFollow={true}
            profileImg={user.profile}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashBoard;
