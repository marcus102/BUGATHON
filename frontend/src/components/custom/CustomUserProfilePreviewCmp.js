import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './CustomUserProfilePreviewCmp.module.css';
import Text from '../../utils/TextSection';
import { Image } from '../../utils/MediaSection';
import {
  IconButton,
  ButtonContainer,
  IconTextButton,
  DropdownMenu,
  OutlinedButton,
} from '../../utils/ButtonSection';
import Icon from '../../utils/IconSection';
import defaultProfile from '../../assets/images/general_profile.svg';
import VerifiedBadge from '../../assets/icons/verified_badge.svg';
import { faArrowUpRightFromSquare, faChevronDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProfileDropdownButton = ({ username, profession, profileImg }) => (
  <>
    <div className={classes.username_button_container}>
      {username ? (
        <Text
          unwrap={true}
          label14Style={classes.username_label14_style}
          label14={`@${username}`}
        />
      ) : (
        <Text unwrap={true} label14Style={classes.username_label14_style} label14={'User'} />
      )}
      {profession && (
        <Text unwrap={true} label10Style={classes.profession_label10_style} label10={profession} />
      )}
    </div>
    <Image
      imgContainerStyle={classes.img_container}
      imgStyle={classes.img}
      src={profileImg ? profileImg : defaultProfile}
    />
  </>
);

const GuestUserInfo = ({
  hideEdit,
  METADATA,
  userFullName,
  profession,
  userRole,
  profileImg,
  userId,
}) => {
  const { dropDownIsOpenHandler, profileSideBarButtonHandler } = useContext(ManagmentSystem);
  const navigate = useNavigate();

  const handleNavigation = (id, userId_) => {
    if (id === 'logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      navigate('/auth?mode=signin');
    } else if (id === 'profile') {
      dropDownIsOpenHandler(false);
      profileSideBarButtonHandler('General');
      navigate(`/profile?userId=${userId_}`);
    } else if (id === 'settings') {
      navigate(`/settings`);
      dropDownIsOpenHandler(false);
    }
  };

  return (
    <div className={classes.guest_user_info_full_name_overview_main_container}>
      <div className={classes.full_name_overview_container}>
        <Image
          imgContainerStyle={classes.profile_image_container}
          imgStyle={classes.profile_image}
          src={profileImg ? profileImg : defaultProfile}
          alt="Profile"
        />
        <div className={classes.full_name_container}>
          <div className={classes.full_name_overview_container}>
            <Text unwrap={true} h6={userFullName?.toUpperCase()} />
            <Image
              imgContainerStyle={classes.verified_badge_container}
              src={VerifiedBadge}
              alt="Verification Badge"
            />
          </div>
          <div className={classes.profession_main_container}>
            <Text label12={profession} />
            {userRole && (
              <Text unwrap={true} label10Style={classes.role_label10_style} label10={userRole} />
            )}
          </div>
          {hideEdit ? <Text label10="Online" /> : <IconButton icon={faEdit} />}
        </div>
      </div>
      {METADATA.length > 0 ? (
        METADATA.map((data, index) => (
          <div key={`${data.id}-${index}`} className={classes.popularity_overview_main_container}>
            <div className={classes.popularity_overview_container}>
              {data.engagement?.map((engData, engIndex) => (
                <ButtonContainer
                  key={`${engData.id}-${engIndex}`}
                  buttonContainerMainContainer={classes.popularity_overview_button_container}
                >
                  <div className={classes.popularity_button_overview_container}>
                    <Text label15Style={classes.popularity_text_overview} label15={engData.title} />
                    {engData.icon && <Icon icon={engData.icon} />}
                  </div>
                  <Text
                    label15Style={classes.popularity_text_overview}
                    label15={`${engData.total}`}
                  />
                </ButtonContainer>
              ))}
            </div>
            <IconTextButton
              unwrap={true}
              inconTextButtonStyle={classes.profile_overview_icon_text_button}
              label={'Visit profile'}
              icon_={faArrowUpRightFromSquare}
              onClick={() => handleNavigation('profile', userId)}
            />
            {data.buttons?.map((btnData) => (
              <IconTextButton
                inconTextButtonStyle={classes.popularity_overview_icon_text_button}
                unwrap
                key={btnData.id}
                icon={btnData.icon}
                label={btnData.title}
                onClick={() => handleNavigation(btnData.id)}
              />
            ))}
          </div>
        ))
      ) : (
        <Text label12="Not available" />
      )}
    </div>
  );
};

function CustomUserProfilePreview({
  METADATA,
  username,
  profession,
  userFullName,
  profileImg,
  hideFollow,
  hideEdit,
  mainProfile,
  userRole,
  userId,
}) {
  return (
    <DropdownMenu
      dropDownMenuStyle={
        mainProfile ? classes.create_drop_down_menu_2 : classes.create_drop_down_menu
      }
      profileId={username}
      buttonIcon={mainProfile ? faChevronDown : null}
      buttonChildren={
        <ProfileDropdownButton
          username={username}
          profession={profession}
          profileImg={profileImg}
        />
      }
    >
      <GuestUserInfo
        hideFollow={hideFollow}
        hideEdit={hideEdit}
        METADATA={METADATA}
        userFullName={userFullName}
        profession={profession}
        userRole={userRole}
        profileImg={profileImg}
        userId={userId}
      />
    </DropdownMenu>
  );
}

export default CustomUserProfilePreview;
