import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './accountSettingsCmp.module.css';
import { SolidButton } from '../../../utils/ButtonSection';
import Link from '../../../utils/LinkSection';
import Text from '../../../utils/TextSection';
import { Input } from '../../../utils/InputSection';
import { Form } from 'react-router-dom';
import { Overlay } from '../../../utils/OverlaySection';

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
  // {
  //   id: '2',
  //   title: 'Data Permissions',
  //   description:
  //     'Data Export allows you to retrieve a copy of all your information stored on our platform in a format that you can easily access and use outside of our system. This includes your profile details, activity history, messages, and any other data associated with your account. ',
  //   description_link: 'Learn more about data permissions',
  //   label: null,
  //   placeholder: null,
  //   link: null,
  //   button: 'Save Changes',
  // },
  {
    id: '3',
    title: 'Account Guardian',
    description:
      'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself. ',
    description_link: 'Learn more about account guardian',
    label: 'Search and add a guardian',
    placeholder: 'search by email or username ',
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
  const { overlayHandler } = useContext(ManagmentSystem);

  const clickHandler = (id) => {
    if (id === '4') {
      overlayHandler('delete_my_account');
    }
  };

  return (
    <>
      {ACCOUNT_SETTINGS_DATA.map((data, index) => (
        <div
          key={`${data.id}-${index}`}
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
              data.id === '4' && classes.solid_delete_button_container
            }`}
            label={data.button}
            onClick={() => clickHandler(data.id)}
          />
        </div>
      ))}

      <Overlay
        overlayStyle={classes.overlay_root_container}
        overlayChildStyle={classes.overlay_main_container}
        keyId={'delete_my_account'}
      >
        <div className={classes.overlay_content_container}>
          <Text h5="Are you sure you want to delete your account?" />
          <div className={classes.overlay_button_container}>
            <SolidButton
              buttonStyle={classes.cancel_button_container}
              label="Cancel"
              onClick={() => overlayHandler()}
            />
            <Form
              method="patch"
              action="/settings"
              onSubmit={() => {
                overlayHandler();
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
              }}
            >
              <SolidButton buttonStyle={classes.delete_button_container} label="Yes I Am" />
            </Form>
          </div>
        </div>
      </Overlay>
    </>
  );
}

export default AccountSettings;
