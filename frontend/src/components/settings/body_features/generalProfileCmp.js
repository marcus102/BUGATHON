import React from 'react';
import classes from './generalProfileCmp.module.css';
import { IconTextButton, SolidButton } from '../../../utils/ButtonSection';
import Image from '../../../utils/ImageSection';
import profile from '../../../assets/images/globe.jpg';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import { Input, TextArea } from '../../../utils/InputSection';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Line from '../../../utils/LineSection';

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

const PROFILE_EDIT_DATA = [
  {
    id: '1',
    label: 'First Name',
    placeholder: 'First Name',
    description:
      'It will be displayed on your profile and may be visible to other users depending on your privacy settings.',
    inputType: 'input',
  },
  {
    id: '2',
    label: 'Last Name(s)',
    placeholder: 'Last Name(s)',
    description:
      'It will appear alongside your first name on your profile and in certain interactions with other users.',
    inputType: 'input',
  },
  {
    id: '3',
    label: 'Location',
    placeholder: 'Location',
    description:
      'This could be your city, state, country, or any other relevant location information. It helps other users know where you are based.',
    inputType: 'input',
  },
  {
    id: '4',
    label: 'Bio',
    placeholder: 'Enter your bio',
    description: null,
    inputType: 'text_area',
  },
  {
    id: '5',
    label: 'GitHub',
    placeholder: 'add your GitHub url...',
    inputType: 'input',
    description:
      'This link will be visible on your profile and can provide additional context or ways for others to connect with you outside of the platform.',
  },
  {
    id: '6',
    label: 'Stack Overflow',
    placeholder: 'add your Stack Overflow url...',
    inputType: 'input',
    description:
      'This link will be visible on your profile and can provide additional context or ways for others to connect with you outside of the platform.',
  },
  {
    id: '7',
    label: 'LinkedIn',
    placeholder: 'add your LinkedIn profile url...',
    inputType: 'input',
    description:
      'This link will be visible on your profile and can provide additional context or ways for others to connect with you outside of the platform.',
  },
  {
    id: '8',
    label: 'X',
    placeholder: 'add your X url...',
    inputType: 'input',
    description:
      'This link will be visible on your profile and can provide additional context or ways for others to connect with you outside of the platform.',
  },
  {
    id: '9',
    label: 'YouTube',
    placeholder: 'add your youtube chanel url...',
    inputType: 'input',
    description:
      'This link will be visible on your profile and can provide additional context or ways for others to connect with you outside of the platform.',
  },
];

function GeneralProfile() {
  return (
    <div className={`${classes.general_profile_main_container} flex-column flex-md-row`}>
      <div className={`${classes.profile_main_container}`}>
        <Image
          src={profile}
          alt={'user profile picture'}
          imgContainerStyle={classes.profile_images_container}
          imgStyle={classes.profile_images}
        />
        <IconTextButton
          unwrap={true}
          inconTextButtonStyle={classes.profile_edit_button}
          label={'Edit Profile Picture'}
          icon={faImage}
        />
        <div className={classes.profile_tips_container}>
          <div className={classes.profile_tips_header}>
            <Text h6={'Tips'} />
            <Icon icon={faLightbulb} />
          </div>
          {TIPS_DATA.map((data) => (
            <Text key={data.id} label12={`=> ${data.content}`} />
          ))}
        </div>
      </div>

      <div className={classes.profile_edit_main_container}>
        <div className={classes.profile_edit_container}>
          <div>
            <Text textStyle={classes.profile_edit_title_container} h5={'Personal Info'} />
            <Line direction={'horizontal'} />
          </div>
          {PROFILE_EDIT_DATA.map((data) => (
            <div key={data.id} className={classes.profile_edit_input_container}>
              {data.inputType === 'input' && (
                <Input
                  placeholder={data.placeholder}
                  label={data.label}
                  instructionLabel={data.description}
                />
              )}
              {data.inputType === 'text_area' && (
                <TextArea placeholder={data.placeholder} label={data.label} />
              )}

              {data.id === '4' && (
                <>
                  <Text textStyle={classes.profile_edit_title_container} h5={'Social'} />
                  <Line direction={'horizontal'} />
                </>
              )}
            </div>
          ))}
        </div>
        <SolidButton buttonStyle={classes.profile_save_button} label={'Save Changes'} />
      </div>
    </div>
  );
}

export default GeneralProfile;
