import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
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
  const { profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar />
      <div className={`${classes.profile_page_second_container}`}>
        <ProfileSideBar2 />
        <div className={classes.profile_contents_main_container}>
          <ProfileHeader />
          {profileSideBarButton === 'General' && <GeneralUserInfo />}
          {profileSideBarButton === 'Analytics' && <Analytics />}
          {profileSideBarButton === 'Blog' && <UserBlogPost />}
          {profileSideBarButton === 'Ranking' && <Ranking />}
          {profileSideBarButton === 'Bug Fixes' && <UserBugFix />}
          {profileSideBarButton === 'Bug Reports' && <UserBugReport />}
          {profileSideBarButton === 'Reusable Code' && <UserReusableCode />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
