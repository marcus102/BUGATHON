import React, { useState } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import { IconTextButton } from '../utils/ButtonSection';
import Image from '../utils/ImageSection';
import Text from '../utils/TextSection';
import { OutlinedButton } from '../utils/ButtonSection';
import images from '../assets/images/globe.jpg';

function UserProfileHeader({ username, profession, profileImg, hideFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className={classes.header_profile_container}>
      <div className={classes.profile_container}>
        <Image imgContainerStyle={classes.img_container} imgStyle={classes.img} src={images} />

        <IconTextButton
          inconTextButtonStyle={classes.username_button_container}
          children={
            <>
              <Text label12Style={classes.username_label12_style} label12={'@marcus'} />
              <Text label10Style={classes.profession_label10_style} label10={'UI/UX design'} />
            </>
          }
        />
      </div>
      {!hideFollow && (
        <OutlinedButton
          buttonContainerStyle={classes.follow_button_container}
          buttonStyle={classes.follow_button}
          onClick={() => {
            setIsFollowing(!isFollowing);
          }}
          children={
            <Text
              label12Style={classes.follow_label12_style}
              label12={!isFollowing ? 'Follow' : 'Unfollow'}
            />
          }
        />
      )}
    </div>
  );
}

export default UserProfileHeader;
