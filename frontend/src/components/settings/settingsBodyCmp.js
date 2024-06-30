import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './settingsBodyCmp.module.css';
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

function Body() {
  const { settingSideBarButton } = useContext(ManagmentSystem);
  return (
    <>
      {settingSideBarButton === 'General Profile' && <GeneralProfile />}
      {settingSideBarButton === 'Account Setting' && <AccountSettings />}
      {settingSideBarButton === 'Appearance' && <Appearance />}
      {settingSideBarButton === 'Accessibility' && <Accessibility />}
      {settingSideBarButton === 'Notifications' && <Notification />}
      {settingSideBarButton === 'Email' && <Email />}
      {settingSideBarButton === 'Authentication' && <Authentication />}
      {settingSideBarButton === 'Sessions' && <Session />}
      {settingSideBarButton === 'Moderation' && <Moderation />}
      {settingSideBarButton === 'Bug Report' && <BugReport />}
      {settingSideBarButton === 'Bug Fixes' && <BugFix />}
      {settingSideBarButton === 'Reusable Code' && <ReusableCode />}
      {settingSideBarButton === 'Reminders' && <Reminder />}
      {settingSideBarButton === 'Authorization' && <Authorization />}
    </>
  );
}

export default Body;
