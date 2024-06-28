import React from 'react';
import classes from './emailCmp.module.css';
import { faChevronDown, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IconButton, DynamicLabelDropdownMenu, SolidButton } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import Tag from '../../../utils/tagSection';
import { Input } from '../../../utils/InputSection';

const EMAIL_DATA = [
  {
    id: '1',
    title: 'My Email(s)',
    children: [
      {
        id: '1.1',
        email: 'EmailAddress1@gmail.com',
        tags: [
          { id: 'default', label: 'Default', message: 'Default email address' },
          { id: 'public', label: 'Public', message: 'Public email address' },
        ],
        icon_buttons: [
          { id: 'edit', icon: faEdit },
          { id: 'delete', icon: faTrashCan },
        ],
      },
      {
        id: '1.2',
        email: 'EmailAddress2@gmail.com',
        tags: [
          { id: 'backup', label: 'Backup', message: 'Backup email address' },
          { id: 'private', label: 'Private', message: 'Private email address' },
        ],
        icon_buttons: [
          { id: 'edit', icon: faEdit, },
          { id: 'delete', icon: faTrashCan },
        ],
      },
    ],
    input_placeholder: 'Email Address',
    description:
      'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself.',
    description_link: ' Learn more about account guardian',
    button: 'Update Email Address',
  },
  {
    id: '2',
    title: 'Backup Email Address',
    children: [],
    input_placeholder: 'Email Address',
    description:
      'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself.',
    description_link: 'Learn more about account guardian',
    button: 'Add Backup email',
  },
  {
    id: '3',
    title: 'Email Privacy',
    children: [
      {
        id: '3.1',
        email: 'EmailAddress1@gmail.com',
        label: 'Public (default)',
        menu: [
          { id: 'public', label: 'Public (default)' },
          { id: 'private', label: 'Private' },
        ],
      },
      {
        id: '3.2',
        email: 'EmailAddress2@gmail.com',
        label: 'Private (default)',
        menu: [
          { id: 'public', label: 'Public (default)' },
          { id: 'private', label: 'Private' },
        ],
      },
    ],
    input_placeholder: null,
    description: null,
    description_link: null,
    button: null,
  },
];

function Email() {
  return (
    <>
      {EMAIL_DATA.map((data) => (
        <div key={data.id} className={classes.email_main_container}>
          <Text h5={data.title} />
          {/* IF ID = 1 */}
          {data.id === '1' &&
            data.children.map((sub_data) => (
              <div key={sub_data.id} className={classes.email_list_container}>
                <div className={classes.email_container}>
                  <Text label14={sub_data.email} />
                  {sub_data.tags.map((tag) => (
                    <Tag key={tag.id} label={tag.label} tooltipMessage={tag.message}/>
                  ))}
                </div>

                <div className={classes.icon_button_container}>
                  {sub_data.icon_buttons.length !== 0 &&
                    sub_data.icon_buttons.map((icon_data) => (
                      <IconButton key={icon_data.id} icon={icon_data.icon} />
                    ))}
                </div>
              </div>
            ))}
          {/* IF ID = 3 */}
          {data.id === '3' &&
            data.children.map((sub_data) => (
              <div key={sub_data.id} className={classes.email_list_container_2}>
                <Text label14={sub_data.email} />
                <DynamicLabelDropdownMenu
                  dropDownIconTextStyle={classes.dropdown_button_container}
                  dropDownMenuStyle={classes.dropdown_menu_container}
                  buttonLabel={sub_data.label}
                  buttonIcon={faChevronDown}
                  menuItems={sub_data.menu}
                />
              </div>
            ))}
          {/*  */}
          {data.input_placeholder && <Input placeholder={data.input_placeholder} />}
          <div className={classes.description_container}>
            <Text label12={data.description} />
            <Link underline={true} children12={data.description_link} />
          </div>

          {data.button && (
            <SolidButton buttonStyle={classes.solid_button_container} label={data.button} />
          )}
        </div>
      ))}
    </>
  );
}

export default Email;
