import React, { useState } from 'react';
import classes from './generalProfileCmp.module.css';
import { IconTextButton, SolidButton, IconButton } from '../../../utils/ButtonSection';
import { Image } from '../../../utils/MediaSection';
import userGeneralProfile from '../../../assets/images/general_profile.svg';
import { faLightbulb, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import { Input, TextArea } from '../../../utils/InputSection';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const TIPS_DATA = [
  {
    id: 1,
    content: 'Keep your bio concise. A few well-chosen sentences have the most impact.',
  },
  {
    id: 2,
    content:
      "Your location can be as general or specific as you like. You don't need to give your street address.",
  },
  {
    id: 3,
    content:
      "Consider carefully the type of URL you want to link. It should reflect who you are and what you'd like people to connect with.",
  },
];

const SectionTitle = ({ title }) => (
  <>
    <Text textStyle={classes.profile_edit_title_container} h5={title} />
  </>
);

function GeneralProfile({ profileImg, firstName, lastName, location, bio, linksArray }) {
  const PROFILE_EDIT_DATA = [
    {
      id: '1',
      label: 'First Name',
      placeholder: 'First Name',
      value: firstName,
      description:
        'It will be displayed on your profile and may be visible to other users depending on your privacy settings.',
      inputType: 'input',
    },
    {
      id: '2',
      label: 'Last Name(s)',
      placeholder: 'Last Name(s)',
      value: lastName,
      description:
        'It will appear alongside your first name on your profile and in certain interactions with other users.',
      inputType: 'input',
    },
    {
      id: '3',
      label: 'Location',
      placeholder: 'Location',
      value: location,
      description:
        'This could be your city, state, country, or any other relevant location information. It helps other users know where you are based.',
      inputType: 'input',
    },
    {
      id: '4',
      label: 'Bio',
      placeholder: 'Enter your bio',
      value: bio,
      description: null,
      inputType: 'text_area',
    },
  ];

  const [socialLinks, setSocialLinks] = useState([{ id: 1, link: '' }]);

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { id: socialLinks.length + 1, link: '' }]);
  };

  return (
    <div className={`${classes.general_profile_main_container} flex-column flex-md-row`}>
      <div className={`${classes.profile_main_container}`}>
        <Image
          src={profileImg ? profileImg : userGeneralProfile}
          alt="User profile picture"
          imgContainerStyle={classes.profile_images_container}
          imgStyle={classes.profile_images}
        />
        <IconTextButton
          unwrap={true}
          inconTextButtonStyle={classes.profile_edit_button}
          label="Edit Profile Picture"
          icon={faImage}
        />
        <div className={classes.profile_tips_container}>
          <div className={classes.profile_tips_header}>
            <Text h6="Tips" />
            <Icon icon={faLightbulb} />
          </div>
          {TIPS_DATA.map((tip) => (
            <Text key={tip.id} label12={`=> ${tip.content}`} />
          ))}
        </div>
      </div>

      <div className={classes.profile_edit_main_container}>
        <div className={classes.profile_edit_container}>
          <SectionTitle title="Personal Info" />
          {PROFILE_EDIT_DATA.map((data) => (
            <div key={data.id} className={classes.profile_edit_input_container}>
              {data.inputType === 'input' && (
                <Input
                  placeholder={data.placeholder}
                  label={data.label}
                  instructionLabel={data.description}
                  defaultValue={data?.value}
                />
              )}
              {data.inputType === 'text_area' && (
                <TextArea
                  placeholder={data.placeholder}
                  label={data.label}
                  defaultValue={data?.value}
                />
              )}
            </div>
          ))}
          <SectionTitle title="Social" />
          <div className={`${classes.link_main_container}`}>
            <div className={`${classes.link_second_container}`}>
              {socialLinks.map((socialLink) => (
                <div key={socialLink.id} className={`${classes.link_container}`}>
                  <Icon iconContainerStyle={classes.icon_container} icon={faGithub} />
                  <Input placeholder={'Enter a link'} label={'Link'} />
                </div>
              ))}
            </div>
            <IconButton
              inconButtonStyle={classes.icon_button}
              icon={faPlusCircle}
              onClick={addSocialLink}
            />
          </div>
        </div>
        <SolidButton buttonStyle={classes.profile_save_button} label="Save Changes" />
      </div>
    </div>
  );
}

export default GeneralProfile;
