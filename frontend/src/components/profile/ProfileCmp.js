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
import AdminDashBoard from './body_features/AdminDashBoardCmp';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';
import { DUMMY_USERS } from '../../data/Database';
import { useSearchParams, useRouteLoaderData } from 'react-router-dom';

function Profile() {
  const { profileSideBarButton } = useContext(ManagmentSystem);

  const [searchParams] = useSearchParams();
  const currentUsername = searchParams.get('username');
  const { fetchData } = useRouteLoaderData('root');
  const currentUser = fetchData.data;

  const profileImg = currentUser.image?.find(
    (targetImg) => targetImg.username === currentUser.username
  );

  return (
    <div className={classes.profile_page_main_container}>
      <ProfileSideBar isMyProfile={true} profileImg={profileImg?.imageUrl} />
      <div className={`${classes.profile_page_second_container}`}>
        <ProfileSideBar2 />
        <VerticalScrollView
          children={
            <>
              <ProfileHeader
                userFullName={`${currentUser?.firstName} ${currentUser?.lastName}`}
                followerCount={currentUser?.followersCount}
                followingCount={currentUser?.followingCount}
                starCount={currentUser?.starCount}
                username={currentUser?.username}
                profession={currentUser?.profession}
                profileImg={profileImg?.imageUrl}
                role={currentUser?.role}
              />
              {profileSideBarButton === 'General' && (
                <GeneralUserInfo
                  userLinks={currentUser?.links}
                  location={currentUser?.location}
                  telNumber={currentUser?.phone}
                  emails={currentUser?.email[0].address}
                  bio={currentUser?.bio}
                />
              )}
              {profileSideBarButton === 'Analytics' && <Analytics />}
              {profileSideBarButton === 'Blog' && <UserBlogPost />}
              {profileSideBarButton === 'Ranking' && <Ranking />}
              {profileSideBarButton === 'Bug Fixes' && <UserBugFix />}
              {profileSideBarButton === 'Bug Reports' && <UserBugReport />}
              {profileSideBarButton === 'Reusable Code' && <UserReusableCode />}
              {profileSideBarButton === 'Admin Dashboard' && <AdminDashBoard />}
            </>
          }
        />
      </div>
    </div>
  );
}

export default Profile;
