import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Colors from '../../../constants/colors';
import classes from './emailCmp.module.css';
import { faChevronDown, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IconButton, SolidButton, DynamicLabelDropdownMenu } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import Tag from '../../../utils/tagSection';
import { Input } from '../../../utils/InputSection';
import { Overlay } from '../../../utils/OverlaySection';
import ToolTip from '../../../utils/toolTipSection';

const RenderEmailList = ({ children, editEmail, deleteEmail }) => (
  <>
    {children?.map((sub_data) => (
      <div key={sub_data.id} className={classes.email_list_container}>
        <div className={classes.email_container}>
          <Text label14={sub_data.address} />
          <Tag
            tagContainerStyle={getTagStyle(sub_data.type)}
            label={sub_data.type}
            tooltipMessage={''}
          />
          <Tag
            tagContainerStyle={getTagStyle(sub_data.visibility)}
            label={sub_data.visibility}
            tooltipMessage={''}
          />
        </div>
        <div className={classes.icon_button_container}>
          <ToolTip tooltipMessage={'Edit email address'}>
            <IconButton
              icon={faEdit}
              onClick={() => editEmail({ id: sub_data.id, function_: 'edit' })}
            />
          </ToolTip>

          <ToolTip tooltipMessage={'Delete email address'}>
            <IconButton
              colorOnMouseUp={Colors.red_FF2B2B}
              colorOnMouseDown={Colors.red_FF2B2B}
              icon={faTrashCan}
              onClick={() => deleteEmail({ id: sub_data.id, function_: 'delete' })}
            />
          </ToolTip>
        </div>
      </div>
    ))}
  </>
);

const renderDescription = (data) =>
  data.description && (
    <div className={classes.description_container}>
      <Text label12={data.description} />
      <Link underline children12={data.description_link} />
    </div>
  );

const getTagStyle = (tagId) => {
  switch (tagId) {
    case 'private':
      return classes.private_bg;
    case 'public':
      return classes.public_bg;
    default:
      return classes.default_bg;
  }
};

function Email({ emailAddresses }) {
  const EMAIL_DATA = [
    {
      id: '1',
      title: 'My Email(s)',
      children: emailAddresses,
      input_placeholder: null,
      description:
        'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself.',
      description_link: ' Learn more about account guardian',
      button: null,
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
  ];
  const { overlayHandler, dropDownDefaultHandler, dropDownDefault } = useContext(ManagmentSystem);
  const [emailId, setEmailId] = useState({ id: '', function: '' });

  function EmailOptionsHandler({ id, function_ }) {
    overlayHandler('email_settings');
    if (function_ === 'edit') {
      setEmailId({ id: id, function: 'edit' });
    } else {
      setEmailId({ id: id, function: 'delete' });
    }
  }

  function EmailClickHandler({ id, function_ }) {
    if (function_ === 'edit') {
      dropDownDefaultHandler({ email_type: '' });
      dropDownDefaultHandler({ email_visibility: '' });
    }
    overlayHandler();
  }

  const currentEmail = emailAddresses?.find((email) => email.id === emailId.id);

  return (
    <>
      {EMAIL_DATA.map((data) => (
        <div key={data.id} className={classes.email_main_container}>
          <Text h5={data.title} />
          {data.id === '1' && (
            <RenderEmailList
              children={data.children}
              editEmail={EmailOptionsHandler}
              deleteEmail={EmailOptionsHandler}
            />
          )}
          {data.input_placeholder && <Input placeholder={data.input_placeholder} />}
          {renderDescription(data)}
          {data.button && (
            <SolidButton buttonStyle={classes.solid_button_container} label={data.button} />
          )}
        </div>
      ))}
      {/* EMAIL EDIT OVERLAY */}
      <Overlay
        overlayStyle={classes.overlay_root_container}
        overlayChildStyle={classes.overlay_main_container}
        keyId={'email_settings'}
      >
        <Text
          h4={
            emailId.function === 'edit'
              ? 'Edit Email'
              : `Are you sure you want to delete ${currentEmail?.address}?`
          }
        />
        <div className={classes.edit_email_container}>
          {emailId.function === 'edit' && (
            <div className={classes.email_input_container}>
              <Input
                label={'Email'}
                placeholder={'Enter email address'}
                defaultValue={currentEmail?.address}
              />

              <DynamicLabelDropdownMenu
                dropDownIconTextStyle={classes.drop_dow_label}
                dropDownMenuStyle={classes.drop_down_menu}
                buttonLabel={
                  dropDownDefault.email_type ? dropDownDefault.email_type : currentEmail?.type
                }
                buttonIcon={faChevronDown}
                menuItems={[
                  { id: '1', label: 'default' },
                  { id: '2', label: 'backup' },
                ]}
                my_key={'email_type'}
              />
              <DynamicLabelDropdownMenu
                dropDownIconTextStyle={classes.drop_dow_label}
                dropDownMenuStyle={classes.drop_down_menu}
                buttonLabel={
                  dropDownDefault.email_visibility
                    ? dropDownDefault.email_visibility
                    : currentEmail?.visibility
                }
                buttonIcon={faChevronDown}
                menuItems={[
                  { id: '1', label: 'public' },
                  { id: '2', label: 'private' },
                ]}
                my_key={'email_visibility'}
              />
            </div>
          )}

          <SolidButton
            buttonMainContainerStyle={classes.button_main_container}
            buttonStyle={
              emailId.function === 'edit'
                ? classes.button_container
                : classes.delete_button_container
            }
            label={emailId.function === 'edit' ? 'Save Changes' : `Delete Email`}
            onClick={() => EmailClickHandler({ id: emailId.id, function_: emailId.function })}
          />
        </div>
      </Overlay>
    </>
  );
}

export default Email;
