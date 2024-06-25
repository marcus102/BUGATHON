import React from 'react';
import classes from './accountSettingsCmp.module.css';
import { SolidButton } from '../../../utils/ButtonSection';
import Link from '../../../utils/LinkSection';
import Text from '../../../utils/TextSection';
import { Input } from '../../../utils/InputSection';

const ACCOUNT_SETTINGS_DATA = [
  {
    id: '1',
    title: 'Data Export',
    description:
      'Data Export allows you to retrieve a copy of all your information stored on our platform in a format that you can easily access and use outside of our system. This includes your profile details, activity history, messages, and any other data associated with your account. ',
    description_link: 'Learn more about export data',
    label: null,
    placeholder: null,
    link: null,
    button: 'Export Your Data',
  },
  {
    id: '2',
    title: 'Data Permissions',
    description:
      'Data Export allows you to retrieve a copy of all your information stored on our platform in a format that you can easily access and use outside of our system. This includes your profile details, activity history, messages, and any other data associated with your account. ',
    description_link: 'Learn more about data permissions',
    label: null,
    placeholder: null,
    link: null,
    button: 'Save Changes',
  },
  {
    id: '3',
    title: 'Account Guardian',
    description:
      'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself. ',
    description_link: 'Learn more about account guardian',
    label: 'Search and add a guardian',
    placeholder: 'search by email, full name, username ...',
    link: null,
    button: 'Add guardian',
  },
  {
    id: '4',
    title: 'Account Deletion',
    description:
      'Deleting your account permanently removes all of your profile information, activity history, and associated data from our platform. This action is irreversible and cannot be undone.',
    description_link: 'Learn more about delete account',
    label: null,
    placeholder: null,
    link: null,
    button: 'Delete My Account',
  },
];

function AccountSettings() {
  return (
    <>
      {ACCOUNT_SETTINGS_DATA.map((data) => (
        <div
          key={data.id}
          className={`${classes.account_settings_main_container} ${
            data.id === '4' ? classes.account_delete_main_container : undefined
          }`}
        >
          <Text h5={data.title} />
          <div className={classes.account_settings_container}>
            <Text label12={data.description} />
            <Link underline={true} children12={data.description_link} />
          </div>
          {data.label && <Input label={data.label} placeholder={data.placeholder} />}
          <SolidButton
            buttonStyle={`${classes.solid_button_container} ${
              data.id === '4' ? classes.solid_delete_button_container : undefined
            }`}
            label={data.button}
          />
        </div>
      ))}
    </>
  );
}

export default AccountSettings;
