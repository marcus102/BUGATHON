import React, { useState, useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './ProfileHeaderCmp.module.css';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { Image } from '../../../utils/MediaSection';
import Text from '../../../utils/TextSection';
import { IconTextButton, ButtonContainer } from '../../../utils/ButtonSection';
import Icon from '../../../utils/IconSection';
import BronzeBadge from '../../../assets/icons/bronze_badge.svg';
import VerifiedBadge from '../../../assets/icons/verified_badge.svg';
import defaultProfile from '../../../assets/images/general_profile.svg';
import FileUpload from '../../../utils/fileUploadManagerSection';
import { useRouteLoaderData } from 'react-router-dom';
import { createProfile, editProfile } from '../../../http_requests/imageUploadHttp';

// Helper function to get badge styles
const getBadgeStyles = (id) => {
  const badgeStyles = {
    admin: classes.admin_bg,
    user: classes.user_bg,
    collaborator: classes.collaborator_bg,
    moderator: classes.moderator_bg,
    Bronze: classes.bronze_bg,
    Silver: classes.silver_bg,
    Gold: classes.gold_bg,
    Novice: classes.novice_bg,
    Advance: classes.advance_bg,
    Intermediate: classes.intermediate_bg,
    Expert: classes.expert_bg,
  };
  return badgeStyles[id] || '';
};

// Component for user badges
const UserBadges = ({ badges }) => (
  <div className={classes.full_name_overview_icon_text_button_container}>
    {badges.map((data, index) => (
      <IconTextButton
        key={`${data.id}-${index}`}
        inconTextButtonStyle={`${classes.full_name_icon_text_button_overview} ${getBadgeStyles(
          data.id
        )}`}
      >
        {data.image && <Image src={data.image} alt={'Badge'} />}
        <Text label12Style={classes.button_text} label12={data.id} />
      </IconTextButton>
    ))}
  </div>
);

// Component for user total stats
const UserTotal = ({ totals }) => (
  <div className={classes.full_info_popularity_overview_main_container}>
    {totals.map((data, index) => (
      <div key={`${data.id}-${index}`} className={classes.popularity_overview_container}>
        <ButtonContainer
          buttonContainerMainContainer={classes.popularity_overview_button_container}
        >
          <div className={classes.popularity_button_overview_container}>
            <Text label15Style={classes.popularity_text_overview} label15={data.id} />
            {data.icon && <Icon icon={data.icon} />}
          </div>
          <Text
            label15Style={classes.popularity_text_overview}
            label15={data.total ? data.total : '0'}
          />
        </ButtonContainer>
      </div>
    ))}
  </div>
);

// Component for profile image and upload
const ProfileImageSection = ({ profile, onFileSelect }) => (
  <div className={`d-block d-xl-none`}>
    <Image
      src={profile ? profile : defaultProfile}
      alt={'user profile picture'}
      imgContainerStyle={classes.profile_images_container}
      imgStyle={classes.profile_images}
    />
    <FileUpload
      btnType={profile ? 'edit_profile' : 'add_profile'}
      type="image"
      onFileSelect={onFileSelect}
    />
  </div>
);

function ProfileHeader({
  userFullName,
  username,
  profession,
  role,
  profileImg,
  followerCount,
  followingCount,
  starCount,
}) {
  const USER_TOTAL = [
    { id: 'Followers', total: followerCount, icon: null },
    { id: 'Followings', total: followingCount, icon: null },
    { id: 'Stars', total: starCount, icon: faStar },
  ];

  const USER_BADGES = [
    { id: `@${username}`, image: null },
    { id: profession, image: null },
    { id: role, image: null },
    { id: 'Novice', image: null },
    { id: 'Bronze', image: BronzeBadge },
  ];

  const { myProfileImgHandler } = useContext(ManagmentSystem);
  const { tokenData } = useRouteLoaderData('root');

  const [profile, setProfile] = useState(profileImg);

  const handleProfileUpdate = async (file, updateFunction) => {
    const updatedProfile = await updateFunction(tokenData, file);
    myProfileImgHandler(updatedProfile.imageUrl);
    setProfile(updatedProfile.imageUrl);
  };

  const handleAddProfileClick = (file) => handleProfileUpdate(file, createProfile);
  const handleEditProfileClick = (file) => handleProfileUpdate(file, editProfile);

  return (
    <div className={`${classes.content_user_info_overview_main_container} flex-column flex-xl-row`}>
      <div
        className={`d-flex flex-column flex-sm-row align-items-center align-items-sm-start w-100`}
      >
        <ProfileImageSection
          profile={profile}
          onFileSelect={profile ? handleEditProfileClick : handleAddProfileClick}
        />
        <div className={classes.user_info_full_name_overview_main_container}>
          <div className={classes.full_name_overview_container}>
            <Text h4={userFullName ? userFullName.toUpperCase() : 'User'} />
            <Image src={VerifiedBadge} alt={'Verification Badge'} />
          </div>
          <UserBadges badges={USER_BADGES} />
        </div>
      </div>
      <UserTotal totals={USER_TOTAL} />
    </div>
  );
}

export default ProfileHeader;
