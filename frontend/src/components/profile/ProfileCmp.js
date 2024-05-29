import React from 'react';
import classes from './ProfileCmp.module.css';
import Image from '../../utils/ImageSection';
import { IconTextButton, ButtonContainer } from '../../utils/ButtonSection';
import GeneralUserInfo from './GeneralUserInfoCmp';
import images from '../../assets/images/people.jpg';
import {
  faArrowPointer,
  faArrowRightFromBracket,
  faEdit,
  faGear,
  faMedal,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../../utils/IconSection';
import Text from '../../utils/TextSection';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const SIDE_BAR_DATA = [
  { id: 'General', icon: null, icon_: faArrowPointer },
  { id: 'Analytics', icon: null, icon_: faArrowPointer },
  { id: 'Ranking', icon: null, icon_: faArrowPointer },
  { id: 'Bug Reports', icon: null, icon_: faArrowPointer },
  { id: 'Bug Fixes', icon: null, icon_: faArrowPointer },
  { id: 'Reusable Code', icon: null, icon_: faArrowPointer },
  { id: 'Blog', icon: null, icon_: faArrowPointer },
  { id: 'Delete Account', icon: faTrashCan, icon_: faArrowPointer },
  { id: 'Logout', icon: faArrowRightFromBracket, icon_: null },
  { id: 'Settings', icon: faGear, icon_: null },
];

const USER_TOTAL = [
  { id: 'Followers', total: '100K', icon: null },
  { id: 'Followings', total: '10K', icon: null },
  { id: 'Stars', total: '5K', icon: faStar },
];

const USER_BADGES = [
  { id: '@marcus', icon: null },
  { id: 'Computer Scientist', icon: null },
  { id: 'Admin', icon: null },
  { id: 'Novice', icon: null },
  { id: 'Bronze', icon: faMedal },
];

const ProfilePage = () => {
  return (
    <div className={classes.profile_page_main_container}>
      <div className={`d-none d-xl-flex ${classes.profile_page_side_bar_main_container}`}>
        <div className={classes.side_bar_options_list_main_container}>
          <Image
            src={images}
            alt={'user profile picture'}
            imgContainerStyle={classes.profile_images_container}
            imgStyle={classes.profile_images}
          />
          <IconTextButton
            inconTextButtonStyle={classes.side_bar_profile_edit_button}
            label={'Edit Pofile'}
            icon_={faEdit}
          />
          {SIDE_BAR_DATA.map((data) => (
            <IconTextButton
              key={data.id}
              inconTextButtonStyle={classes.side_bar_icon_text_button_container}
              label={data.id}
              icon={data.icon}
              icon_={data.icon_}
            />
          ))}
        </div>
      </div>
      <div className={classes.profile_contents_main_container}>
        <div
          className={`${classes.content_user_info_overview_main_container} flex-column flex-xl-row`}
        >
          <div
            className={`d-flex flex-column flex-sm-row align-items-center align-items-sm-start w-100`}
          >
            <div className={`d-block d-xl-none`}>
              <Image
                src={images}
                alt={'user profile picture'}
                imgContainerStyle={classes.profile_images_container}
                imgStyle={classes.profile_images}
              />
              <IconTextButton
                inconTextButtonStyle={classes.side_bar_profile_edit_button}
                label={'Edit Pofile'}
                icon_={faEdit}
              />
            </div>
            <div className={classes.user_info_full_name_overview_main_container}>
              <div className={classes.full_name_overview_container}>
                <Text h4={'SAWADOGO WENDPANGA MARCUS'} />
                <Icon icon={faCircleCheck} />
              </div>
              <div className={classes.full_name_overview_icon_text_button_container}>
                {USER_BADGES.map((data) => (
                  <IconTextButton
                    key={data.id}
                    children={
                      <>
                        {data.icon && <Icon icon={data.icon} />}
                        <Text label12Style={classes.button_text} label12={data.id} />
                      </>
                    }
                    inconTextButtonStyle={`${classes.full_name_icon_text_button_overview} ${
                      data.id === 'Admin' && classes.admin_bg
                    } ${data.id === 'User' && classes.user_bg} ${
                      data.id === 'Bronze' && classes.bronze_bg
                    } ${data.id === 'Silver' && classes.silver_bg} ${
                      data.id === 'Gold' && classes.gold_bg
                    } ${data.id === 'Novice' && classes.novice_bg} ${
                      data.id === 'Advance' && classes.advance_bg
                    } ${data.id === 'Intermediate' && classes.intermediate_bg} ${
                      data.id === 'Expert' && classes.expert_bg
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={classes.full_info_popularity_overview_main_container}>
            {USER_TOTAL.map((data) => (
              <div key={data.id} className={classes.popularity_overview_container}>
                <ButtonContainer
                  buttonContainerMainContainer={classes.popularity_overview_button_container}
                  children={
                    <>
                      <div className={classes.popularity_button_overview_container}>
                        <Text label15Style={classes.popularity_text_overview} label15={data.id} />
                        {data.icon && <Icon icon={data.icon} />}
                      </div>
                      <Text label15Style={classes.popularity_text_overview} label15={data.total} />
                    </>
                  }
                />
                {/* <div className={classes.user_info_followers_overview_main_container}></div> */}
              </div>
            ))}
          </div>
        </div>
        <GeneralUserInfo />
      </div>
    </div>
  );
};

export default ProfilePage;
