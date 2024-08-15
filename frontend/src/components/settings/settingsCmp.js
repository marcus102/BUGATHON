import React, { useContext } from 'react';
import classes from './settingsCmp.module.css';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import GeneralProfile from './body_features/generalProfileCmp';
import AccountSettings from './body_features/accountSettingsCmp';
import Appearance from './body_features/appearanceCmp';
import Accessibility from './body_features/accessibilityCmp';
import Notification from './body_features/notificationCmp';
import Email from './body_features/emailCmp';
import Authentication from './body_features/authenticationCmp';
import Session from './body_features/sessionCmp';
import Moderation from './body_features/moderationCmp';
import BugFix from './body_features/bugFixCmp';
import BugReport from './body_features/bugReportCmp';
import ReusableCode from './body_features/reusableCodeCmp';
import Authorization from './body_features/authorizationCmp';
import Reminder from './body_features/reminderCmp';
import { SideBar, SideBar2 } from './settingsSideBarCmp';
import Line from '../../utils/LineSection';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';
import { IconButton } from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouteLoaderData } from 'react-router-dom';

const Header = ({ title, titleIcon }) => {
  const { settingSideBarButton } = useContext(ManagmentSystem);
  return (
    <div className={classes.header_main_container}>
      <Text unwrap={true} h4={settingSideBarButton} />
      <IconButton icon={faSearch} />
    </div>
  );
};

function Settings() {
  const { settingSideBarButton } = useContext(ManagmentSystem);

  const { fetchData } = useRouteLoaderData('root');
  const currentUser = fetchData.data;

  const profileImg = currentUser.image?.find(
    (targetImg) => targetImg.username === currentUser.username
  );

  return (
    <div className={`${classes.settings_main_container} flex-column flex-xl-row`}>
      <SideBar />
      <SideBar2 />
      <div className={classes.settings_body_container}>
        <Header />
        <Line direction={'horizontal'} />
        <VerticalScrollView>
          {settingSideBarButton === 'General Profile' && (
            <GeneralProfile
              profileImg={profileImg?.imageUrl}
              firstName={currentUser?.firstName}
              lastName={currentUser?.lastName}
              location={currentUser?.location}
              bio={currentUser?.bio}
              linksArray={currentUser?.links}
              username={currentUser?.username}
              professions={currentUser?.professions}
            />
          )}
          {settingSideBarButton === 'Account Setting' && <AccountSettings />}
          {settingSideBarButton === 'Appearance' && <Appearance />}
          {settingSideBarButton === 'Accessibility' && <Accessibility />}
          {settingSideBarButton === 'Notifications' && <Notification />}
          {settingSideBarButton === 'Email' && (
            <Email email={currentUser?.email} backupEmail={currentUser?.backupEmail} />
          )}
          {settingSideBarButton === 'Authentication' && <Authentication />}
          {settingSideBarButton === 'Sessions' && <Session />}
          {settingSideBarButton === 'Moderation' && <Moderation />}
          {settingSideBarButton === 'Bug Report' && <BugReport />}
          {settingSideBarButton === 'Bug Fixes' && <BugFix />}
          {settingSideBarButton === 'Reusable Code' && <ReusableCode />}
          {settingSideBarButton === 'Reminders' && <Reminder />}
          {settingSideBarButton === 'Authorization' && <Authorization />}
        </VerticalScrollView>
      </div>
    </div>
  );
}

export default Settings;
