import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
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
    {(data.profile || data.profile_2) && (
      <div className={classes.option_content_img_main_container}>
        {data.profile && (
          <Image
            imgContainerStyle={classes.content_img_container}
            imgStyle={classes.content_img}
            src={data.profile}
            alt="profile_1"
          />
        )}
        {data.profile_2 && (
          <Image
            imgContainerStyle={classes.content_img_container}
            imgStyle={classes.content_img}
            src={data.profile_2}
            alt="profile_2"
          />
        )}
      </div>
    )}
    {(data.title || data.tag) && (
      <div className={classes.option_content_body_text_container}>
        {data.title && <Text h6={data.title} />}
        {data.tag && (
          <Text textStyle={classes.content_body_critical_tag_container} label10={data.tag} />
        )}
      </div>
    )}
  </div>
);

const OptionContent = ({ data, option, button, solidButtonDataType, reactionData }) => (
  <div className={classes.header_option_content_main_container}>
    {(data.profile_2 || data.profile || data.title || data.tag || option) && (
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
        {METADATA ? (
          METADATA.map((data) => (
            <OptionContent
              key={data.id}
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
