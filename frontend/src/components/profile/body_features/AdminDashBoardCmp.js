import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './AdminDashBoardCmp.module.css';
import Text from '../../../utils/TextSection';
import UserProfileHeader from '../../userProfileHeaderCmp';
import Line from '../../../utils/LineSection';

const AdminDashBoard = () => {
  const {usersList} = useContext(ManagmentSystem);

  return (
    <div className={classes.main_container}>
      <Text textStyle={classes.text_style} h6={'Admin Dashboard'} />
      <Line direction={'horizontal'} />
      <Text textStyle={classes.text_style} h6={'All Users'} />
      <div className={classes.user_container}>
        {usersList.data.length > 0 ? (
          usersList.data.map((user) => (
            <UserProfileHeader
              key={user.id}
              firstName={user?.firstName}
              lastName={user?.lastName}
              role={user?.role}
              username={user?.username}
              profession={user?.profession}
              hideFollow={true}
              profileImg={user?.profile}
              followersCount={user?.followersCount}
              followingCount={user?.followingCount}
              starCount={user?.starCount}
            />
          ))
        ) : (
          <Text label14={'No users found'} />
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
