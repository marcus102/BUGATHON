import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './ProfileCmp.module.css';
import GeneralUserInfo from './body_features/GeneralUserInfoCmp';
import Ranking from './body_features/RankingCmp';
import { ProfileSideBar, ProfileSideBar2 } from './body_features/ProfileSideBarCmp';
import ProfileHeader from './body_features/ProfileHeaderCmp';
import UserBugFix from './body_features/UserBugFixCmp';
import UserBugReport from './body_features/UserBugReportCmp';
import UserReusableCode from './body_features/UserReusableCodeCmp';
import Analytics from './body_features/AnalyticsCmp';
import UserBlogPost from './body_features/UserBlogPostCmp';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';

function ProfilePage() {
  const { profileSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar />
      <div className={`${classes.profile_page_second_container}`}>
        <ProfileSideBar2 />
        <VerticalScrollView
          children={
            <>
              <ProfileHeader />
              {profileSideBarButton === 'General' && <GeneralUserInfo />}
              {profileSideBarButton === 'Analytics' && <Analytics />}
              {profileSideBarButton === 'Blog' && <UserBlogPost />}
              {profileSideBarButton === 'Ranking' && <Ranking />}
              {profileSideBarButton === 'Bug Fixes' && <UserBugFix />}
              {profileSideBarButton === 'Bug Reports' && <UserBugReport />}
              {profileSideBarButton === 'Reusable Code' && <UserReusableCode />}
            </>
          }
        />
      </div>
    </div>
  );
}

export default ProfilePage;
