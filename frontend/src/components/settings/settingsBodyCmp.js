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

function Body() {
  return <Session />;
}

export default Body;
