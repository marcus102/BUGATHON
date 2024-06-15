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
import Image from '../../utils/ImageSection';
import { faChevronDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function CustomMenu({
  title,
  dropDown,
  dataList,
  option,
  button,
  reactionData,
  solidButtonDataType,
  emptyContentLabel,
  headerOption,
}) {
  return (
    <div className={classes.header_option_main_container}>
      {(title || dropDown) && (
        <div className={classes.option_header_container}>
          <Text h5={title} />
          {(headerOption || dropDown) && (
            <div className={classes.option_header_button_container}>
              {headerOption &&
                headerOption.map((data) => (
                  <IconTextButton
                    unwrap={true}
                    inconTextButtonStyle={classes.option_header_icon_text_button_container}
                    key={data.id}
                    label={data.label}
                    icon={data.icon}
                  />
                ))}
              <DynamicLabelDropdownMenu
                dropDownMenuStyle={classes.option_header_menu_container}
                buttonIcon={faChevronDown}
                menuItems={dropDown}
              />
            </div>
          )}
        </div>
      )}

      <div className={`${classes.header_option_content_root_container}`}>
        {dataList &&
          dataList.map((data) => (
            <>
              {data && (
                <div key={data.id} className={classes.header_option_content_main_container}>
                  {(data.profile_2 || data.profile || data.title || data.tag || option) && (
                    <div className={classes.option_content_header_container}>
                      {(data.profile_2 || data.profile || data.title || data.tag) && (
                        <div className={classes.option_content_profile_container}>
                          {(data.profile_2 || data.profile) && (
                            <div className={classes.option_content_img_main_container}>
                              {data.profile && (
                                <Image
                                  imgContainerStyle={classes.content_img_container}
                                  imgStyle={classes.content_img}
                                  src={data.profile}
                                  alt={'profile_1'}
                                />
                              )}
                              {data.profile_2 && (
                                <Image
                                  imgContainerStyle={classes.content_img_container}
                                  imgStyle={classes.content_img}
                                  src={data.profile_2}
                                  alt={'profile_2'}
                                />
                              )}
                            </div>
                          )}
                          {(data.title || data.tag) && (
                            <div className={classes.option_content_body_text_container}>
                              {data.title && <Text h6={data.title} />}
                              {data.tag && (
                                <Text
                                  textStyle={`${classes.content_body_critical_tag_container}`}
                                  label10={data.tag}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      )}

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
                    label={'View more...'}
                  />
                  {data.type && data.type === solidButtonDataType && (
                    <>
                      <Text p16={'Would yo like to proceed with this action?'} />
                      <div className={classes.option_content_body_2_container}>
                        {button &&
                          button.map((btn_data) => (
                            <ButtonContainer
                              key={btn_data.id}
                              buttonContainerMainContainer={
                                classes.footer_option_solid_button_container
                              }
                              children={<Text unwrap={true} label16={btn_data.button_label} />}
                            />
                          ))}
                      </div>
                    </>
                  )}

                  {reactionData && (
                    <div className={classes.option_content_footer_container}>
                      {reactionData.map((icon_data) => (
                        <IconButton
                          key={icon_data.id}
                          icon={icon_data.icon}
                          colorOnMouseUp={icon_data.active_color}
                        />
                      ))}
                    </div>
                  )}
                  <hr className={classes.header_option_horizontal_line_container} />
                </div>
              )}

              {!data.id && <Text h4={emptyContentLabel} />}
            </>
          ))}
      </div>
    </div>
  );
}

export default CustomMenu;
