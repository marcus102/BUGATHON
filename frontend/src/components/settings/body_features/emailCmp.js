import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './emailCmp.module.css';
import { faChevronDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { IconButton, SolidButton, DynamicLabelDropdownMenu } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';
import Tag from '../../../utils/tagSection';
import { Input } from '../../../utils/InputSection';
import { Overlay } from '../../../utils/OverlaySection';
import ToolTip from '../../../utils/toolTipSection';
import { Form } from 'react-router-dom';

const getTagStyle = (tagId) => {
  switch (tagId) {
    case 'private':
      return classes.private_bg;
    case 'public':
      return classes.public_bg;
    default:
      return;
  }
};

const RenderEmail = ({ email, editEmail }) => (
  <>
    <div className={classes.email_list_container}>
      <div className={classes.email_container}>
        <Text label14={email.address} />
        <Tag
          tagContainerStyle={getTagStyle(email.visibility)}
          label={email.visibility}
          tooltipMessage={`Visibility: ${email.visibility}`}
        />
      </div>
      <div className={classes.icon_button_container}>
        <ToolTip tooltipMessage={'Edit email address'}>
          <IconButton icon={faEdit} onClick={editEmail} />
        </ToolTip>
      </div>
    </div>
  </>
);

function Email({ email }) {
  const EMAIL_DATA = [
    {
      id: '1',
      title: 'My Email(s)',
      email: email,
      description:
        'The Account gradian feature allows you to designate a trusted individual who can take over management of your account in the event of an emergency or unforeseen circumstance. This ensures that your digital presence and access to the platform can be safely transferred to someone you trust if you are unable to manage it yourself.',
      description_link: 'Learn more about account guardian',
    },
  ];

  const { overlayHandler, dropDownDefault } = useContext(ManagmentSystem);
  const [emailVisibility, setEmailVisibility] = useState(dropDownDefault.email_visibility);

  function emailEditHandler() {
    setEmailVisibility(email.visibility);
    overlayHandler('email_settings');
  }

  function EmailClickHandler() {
    overlayHandler();
  }

  const ActionOverlay = ({ address, visibility }) => {
    return (
      <Overlay
        overlayStyle={classes.overlay_root_container}
        overlayChildStyle={classes.overlay_main_container}
        keyId={'email_settings'}
      >
        <Text h4={'Edit Email'} />
        <Form method="post" className={classes.edit_email_container} onSubmit={EmailClickHandler}>
          <div className={classes.email_input_container_2}>
            <Input
              id={'email'}
              type={'email'}
              name={'email'}
              label={'Email'}
              placeholder={'Enter email address'}
              defaultValue={address}
            />
            <DynamicLabelDropdownMenu
              dropDownIconTextStyle={classes.drop_dow_label}
              dropDownMenuStyle={classes.drop_down_menu}
              buttonLabel={
                dropDownDefault.email_visibility ? dropDownDefault.email_visibility : visibility
              }
              buttonIcon={faChevronDown}
              menuItems={[
                { id: '1', label: 'public' },
                { id: '2', label: 'private' },
              ]}
              my_key={'email_visibility'}
              onChange={(value) => setEmailVisibility(value)}
            />

            {/* Hidden inputs to include dropdown values in form submission */}
            <input id="visibility" type="hidden" name="visibility" defaultValue={emailVisibility} />
          </div>

          <SolidButton
            buttonMainContainerStyle={classes.button_main_container}
            buttonStyle={classes.button_container}
            label={'Save Changes'}
          />
        </Form>
      </Overlay>
    );
  };

  return (
    <>
      {EMAIL_DATA.map((data, index) => (
        <div key={`${data.id}-${index}`} className={classes.email_main_container}>
          <Text h5={data.title} />

          {data.email && <RenderEmail email={data.email} editEmail={() => emailEditHandler()} />}

          {data.description && (
            <div className={classes.description_container}>
              <Text label12={data.description} />
              <Link underline children12={data.description_link} />
            </div>
          )}
        </div>
      ))}

      {email && (
        <ActionOverlay address={email.address} type={email.type} visibility={email.visibility} />
      )}
    </>
  );
}

export default Email;
