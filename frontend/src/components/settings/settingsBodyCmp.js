import React from 'react';
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

function Body() {
  return <Moderation />;
}

export default Body;
