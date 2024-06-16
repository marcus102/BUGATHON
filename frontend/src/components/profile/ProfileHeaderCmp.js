import React from 'react';
import classes from './ProfileHeaderCmp.module.css';
import { faStar, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faMedal } from '@fortawesome/free-solid-svg-icons';
import Image from '../../utils/ImageSection';
import images from '../../assets/images/people.jpg';
import Text from '../../utils/TextSection';
import { IconTextButton, ButtonContainer } from '../../utils/ButtonSection';
import Icon from '../../utils/IconSection';
import BronzeBadge from '../../assets/icons/bronze_badge.svg';
import VerifiedBadge from '../../assets/icons/verified_badge.svg';

const USER_TOTAL = [
  { id: 'Followers', total: '100K', icon: null },
  { id: 'Followings', total: '10K', icon: null },
  { id: 'Stars', total: '5K', icon: faStar },
];

const USER_BADGES = [
  { id: '@marcus', image: null },
  { id: 'Computer Scientist', image: null },
  { id: 'Admin', image: null },
  { id: 'Novice', image: null },
  { id: 'Bronze', image: BronzeBadge },
];

function ProfileHeader() {
  return (
    <div className={`${classes.content_user_info_overview_main_container} flex-column flex-xl-row`}>
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
            <Image src={VerifiedBadge} alt={'Verification Badge'} />
          </div>
          <div className={classes.full_name_overview_icon_text_button_container}>
            {USER_BADGES.map((data) => (
              <IconTextButton
                key={data.id}
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
                children={
                  <>
                    {data.image && <Image src={data.image} alt={'Badge'} />}
                    <Text label12Style={classes.button_text} label12={data.id} />
                  </>
                }
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileHeader;
