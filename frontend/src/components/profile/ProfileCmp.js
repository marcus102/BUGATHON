import React from 'react';
import classes from './ProfileCmp.module.css';
import GeneralUserInfo from './GeneralUserInfoCmp';
import Ranking from './RankingCmp';
import { ProfileSideBar, ProfileSideBar2 } from './ProfileSideBarCmp';
import ProfileHeader from './ProfileHeaderCmp';
import UserBugFix from './UserBugFixCmp';
import UserBugReport from './UserBugReportCmp';
import UserReusableCode from './UserReusableCodeCmp';
import Analytics from './AnalyticsCmp';
import UserBlogPost from './UserBlogPostCmp';

function ProfilePage() {
  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar />
      <div className={`${classes.profile_page_second_container}`}>
        <ProfileSideBar2 />
        <div className={classes.profile_contents_main_container}>
          <ProfileHeader />
          {/* <Analytics /> */}
          {/* <UserBlogPost /> */}
          {/* <GeneralUserInfo /> */}
          {/* <Ranking /> */}
          {/* <UserBugFix /> */}
          {/* <UserBugReport /> */}
          <UserReusableCode />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
