import React from 'react';
import classes from './authenticationCmp.module.css';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import { Input, CheckBox } from '../../../utils/InputSection';
import {
  SolidButton,
  PlaneButton,
  DynamicLabelDropdownMenu,
  ButtonContainer,
} from '../../../utils/ButtonSection';
import { faChevronDown, faKey, faMobile } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../utils/IconSection';

const AUTH_DATA = [
  {
    id: '1',
    title: 'Change Password',
    children: [
      {
        id: '1.1',
        label: 'Old Password',
        placeholder: '*******',
        sub_button: 'I forgot my password',
      },
      {
        id: '1.2',
        label: 'New Password',
        placeholder: '*******',
        sub_button: null,
      },
      {
        id: '1.3',
        label: 'Confirm Password',
        placeholder: '*******',
        sub_button: null,
      },
    ],
    check_box_label: 'Show password',
    description:
      'Ensure the password contains a minimum of 15 characters or, if it is at least 8 characters long, it must include at least one number and one lowercase letter.',
    description_link: 'Learn more about password changing',
    button: 'Update Password',
  },
  {
    id: '2',
    title: 'Two-factor authentication',
    children: [
      {
        id: '2.1',
        title: 'Favorite Two-factor auth method',
        sub_children: [],
        sub_description:
          'Choose your preferred method for verifying your identity when logging into Bugathon.',
        label: 'Public (default)',
      },
      {
        id: '2.2',
        title: 'Two-factor auth method(s)',
        sub_children: [
          {
            id: '2.2.1',
            label: 'Authenticator app',
            description:
              'Utilize an authentication application or browser extension to receive two-factor authentication codes whenever you are asked to provide them.',
            icon: faMobile,
            button: 'Enable',
          },
          {
            id: '2.2.2',
            label: 'Recovery codes',
            description:
              'Recovery codes serve as a backup method to regain access to your account if you are unable to receive two-factor authentication (2FA) codes due to a lost or inaccessible device.',
            icon: faKey,
            button: 'View',
          },
        ],
        sub_description: null,
        label: null,
      },
    ],
    check_box_label: null,
    description:
      'Two-factor authentication enhances the security of your account by necessitating more than just a password for logging in.',
    description_link: 'Learn more about Two-factor authentication',

    button: null,
  },
];

const Authentication = () => {
  return (
    <>
      {AUTH_DATA.map((data) => (
        <div key={data.id} className={classes.authentication_main_container}>
          <Text h5={data.title} />
          {renderChildren(data)}
          {data.check_box_label && <CheckBox label12={data.check_box_label} />}
          <div className={classes.authentication_description_container}>
            <Text label12={data.description} />
            <Link underline children12={data.description_link} />
          </div>
          {data.button && <SolidButton label={data.button} />}
        </div>
      ))}
    </>
  );
};

const renderChildren = (data) => {
  return data.children.map((sub_data) => {
    switch (data.id) {
      case '1':
        return (
          <div key={sub_data.id} className={classes.authentication_input_container}>
            <Input label={sub_data.label} placeholder={sub_data.placeholder} />
            {sub_data.sub_button && <PlaneButton label12={sub_data.sub_button} />}
          </div>
        );
      case '2':
        return (
          <div key={sub_data.id} className={classes.authentication_factor_auth_container}>
            <Text h6={sub_data.title} />
            <Text label12={sub_data.sub_description} />
            {sub_data.id === '2.1' && renderDropdown(sub_data)}
            {sub_data.id === '2.2' && renderAuthMethods(sub_data.sub_children)}
          </div>
        );
      default:
        return null;
    }
  });
};

const renderDropdown = (sub_data) => (
  <DynamicLabelDropdownMenu
    dropDownIconTextStyle={classes.dropdown_button_container}
    dropDownMenuStyle={classes.dropdown_menu_container}
    buttonLabel={sub_data.label}
    buttonIcon={faChevronDown}
  />
);

const renderAuthMethods = (authMethods) =>
  authMethods.map((auth_data) => (
    <div key={auth_data.id} className={classes.authentication_factor_auth_content_container}>
      <div className={classes.authentication_factor_auth_content_icon}>
        <Icon icon={auth_data.icon} />
        <div className={classes.authentication_factor_auth_content}>
          <Text label16={auth_data.label} />
          <Text label12={auth_data.description} />
        </div>
      </div>
      <ButtonContainer>
        <Text label14Style={classes.button_text} label14={auth_data.button} />
      </ButtonContainer>
    </div>
  ));

export default Authentication;
