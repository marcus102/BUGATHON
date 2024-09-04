import React from 'react';
import classes from './CustomMenuCmp.module.css';
import Text from '../../utils/TextSection';
import {
  DynamicLabelDropdownMenu,
  DropdownMenu,
  OutlinedButton,
  ButtonContainer,
  IconButton,
  IconTextButton,
} from '../../utils/ButtonSection';
import { Image } from '../../utils/MediaSection';
import userProfile from '../../assets/images/general_profile.svg';
import { faChevronDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Line from '../../utils/LineSection';

const OptionHeader = ({ title, dropDown, headerOption, buttonLabel, my_key }) => (
  <div className={classes.option_header_container}>
    {title && <Text h5={title} />}
    {(headerOption || dropDown) && (
      <div className={classes.option_header_button_container}>
        {headerOption?.map((data) => (
          <IconTextButton
            unwrap
            inconTextButtonStyle={classes.option_header_icon_text_button_container}
            key={data.id}
            label={data.label}
            icon={data.icon}
          />
        ))}
        {dropDown && (
          <DynamicLabelDropdownMenu
            dropDownMenuStyle={classes.option_header_menu_container}
            buttonIcon={faChevronDown}
            buttonLabel={buttonLabel}
            my_key={my_key}
            menuItems={dropDown}
          />
        )}
      </div>
    )}
  </div>
);

const ProfileSection = ({ data }) => (
  <div className={classes.option_content_profile_container}>
    {data.user.profile && (
      <div className={classes.option_content_img_main_container}>
        {userProfile && (
          <Image
            imgContainerStyle={classes.content_img_container}
            imgStyle={classes.content_img}
            src={userProfile}
            alt="currentUserProfile"
          />
        )}
        {data.user.profile && (
          <Image
            imgContainerStyle={classes.content_img_container}
            imgStyle={classes.content_img}
            src={data.user.profile ? data.user.profile : userProfile}
            alt="user profile"
          />
        )}
      </div>
    )}
    {(data.user.username || data.severity) && (
      <div className={classes.option_content_body_text_container}>
        {data.user.username && <Text h6={`@${data.user.username} has contributed to your post`} />}
        {data.severity && (
          <Text
            textStyle={`${
              data.severity === 'critical'
                ? classes.critical_severity_post_container
                : data.severity === 'high'
                ? classes.high_severity_post_container
                : data.severity === 'medium'
                ? classes.medium_severity_post_container
                : classes.low_severity_post_container
            }`}
            label10={data.severity}
          />
        )}
      </div>
    )}
  </div>
);

const OptionContent = ({ data, option, button, solidButtonDataType, reactionData }) => (
  <div className={classes.header_option_content_main_container}>
    {(data.profile || data.title || data.tag || option) && (
      <div className={classes.option_content_header_container}>
        <ProfileSection data={data} />
        {option && (
          <DropdownMenu
            dropDownMenuStyle={classes.option_content_body_menu_container}
            buttonIcon={faEllipsisVertical}
            menuItems={option}
          />
        )}
      </div>
    )}
    {data.notification && <Text p16={data.notification} />}
    <OutlinedButton
      buttonStyle={classes.header_option_outlined_button_container}
      buttonMainContainerStyle={classes.header_option_outlined_button_main_container}
      label="View more..."
    />
    {data.type === solidButtonDataType && (
      <>
        <Text p16="Would you like to proceed with this action?" />
        <div className={classes.option_content_body_2_container}>
          {button?.map((btnData) => (
            <ButtonContainer
              key={btnData.id}
              buttonContainerMainContainer={classes.footer_option_solid_button_container}
            >
              <Text unwrap label16={btnData.button_label} />
            </ButtonContainer>
          ))}
        </div>
      </>
    )}
    {reactionData && (
      <div className={classes.option_content_footer_container}>
        {reactionData.map((iconData) => (
          <IconButton
            key={iconData.id}
            icon={iconData.icon}
            colorOnMouseUp={iconData.active_color}
          />
        ))}
      </div>
    )}
    <Line direction="horizontal" />
  </div>
);

function CustomMenu({
  title,
  dropDown,
  METADATA,
  option,
  button,
  reactionData,
  solidButtonDataType,
  emptyContentLabel,
  headerOption,
  buttonLabel,
  my_key,
}) {
  return (
    <div className={classes.header_option_main_container}>
      <OptionHeader
        title={title}
        dropDown={dropDown}
        headerOption={headerOption}
        buttonLabel={buttonLabel}
        my_key={my_key}
      />
      <div className={classes.header_option_content_root_container}>
        {METADATA.lentgh > 0 ? (
          METADATA.map((data, index) => (
            <OptionContent
              key={`${data.id}-${index}`}
              data={data}
              option={option}
              button={button}
              solidButtonDataType={solidButtonDataType}
              reactionData={reactionData}
            />
          ))
        ) : (
          <Text h4={emptyContentLabel} />
        )}
      </div>
    </div>
  );
}

export default CustomMenu;
