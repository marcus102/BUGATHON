import React from 'react';
import classes from './ProfileCmp.module.css';
import GeneralUserInfo from './GeneralUserInfoCmp';
import { ProfileSideBar, ProfileSideBar2 } from './ProfileSideBarCmp';
import ProfileHeader from './ProfileHeaderCmp';

const ProfilePage = () => {
  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar />
      <div>
        <ProfileSideBar2 />
        <div className={classes.profile_contents_main_container}>
          <ProfileHeader />
          <GeneralUserInfo />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
