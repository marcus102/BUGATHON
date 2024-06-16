import React from 'react';
import classes from './ProfileCmp.module.css';
import GeneralUserInfo from './GeneralUserInfoCmp';
import Ranking from './RankingCmp';
import { ProfileSideBar, ProfileSideBar2 } from './ProfileSideBarCmp';
import ProfileHeader from './ProfileHeaderCmp';

function ProfilePage() {
  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar />
      <div className={`${classes.profile_page_second_container}`}>
        <ProfileSideBar2 />
        <div className={classes.profile_contents_main_container}>
          <ProfileHeader />
          {/* <GeneralUserInfo /> */}
          <Ranking />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
