import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './generalProfileCmp.module.css';
import { SolidButton } from '../../../utils/ButtonSection';
import { Image } from '../../../utils/MediaSection';
import userGeneralProfile from '../../../assets/images/general_profile.svg';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import { Input, TextArea } from '../../../utils/InputSection';
import FileUpload from '../../../utils/fileUploadManagerSection';
import { useRouteLoaderData, Form } from 'react-router-dom';
import { createProfile, editProfile } from '../../../http_requests/imageUploadHttp';

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

function GeneralProfile({
  profileImg,
  firstName,
  lastName,
  location,
  bio,
  link1,
  link2,
  link3,
  link4,
  username,
  telephone,
  profession,
}) {
  const PROFILE_EDIT_DATA = [
    {
      id: 'firstName',
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: firstName,
      description:
        'It will be displayed on your profile and may be visible to other users depending on your privacy settings.',
      inputMode: 'input',
    },
    {
      id: 'lastName',
      type: 'text',
      name: 'lastName',
      label: 'Last Name(s)',
      placeholder: 'Last Name(s)',
      value: lastName,
      description:
        'It will appear alongside your first name on your profile and in certain interactions with other users.',
      inputMode: 'input',
    },
    {
      id: 'username',
      type: 'text',
      name: 'username',
      label: 'Username',
      placeholder: 'Username',
      value: username,
      description:
        'It will appear alongside your first name on your profile and in certain interactions with other users.',
      inputMode: 'input',
    },
    {
      id: 'telephone',
      type: 'text',
      name: 'telephone',
      label: 'Telephone',
      placeholder: 'Telephone',
      value: telephone,
      description:
        'It will appear alongside your first name on your profile and in certain interactions with other users.',
      inputMode: 'input',
    },
    {
      id: 'profession',
      type: 'text',
      name: 'profession',
      label: 'Profession',
      placeholder: 'Profession',
      value: profession,
      description:
        'It will appear alongside your first name on your profile and in certain interactions with other users.',
      inputMode: 'input',
    },
    {
      id: 'location',
      type: 'text',
      name: 'location',
      label: 'Location',
      placeholder: 'Location',
      value: location,
      description:
        'This could be your city, state, country, or any other relevant location information. It helps other users know where you are based.',
      inputMode: 'input',
    },
    {
      id: 'bio',
      type: 'text',
      name: 'bio',
      label: 'Bio',
      placeholder: 'Enter your bio',
      value: bio,
      description: null,
      inputMode: 'text_area',
    },
    {
      id: 'link1',
      type: 'text',
      name: 'link1',
      label: null,
      placeholder: 'link 1',
      value: link1,
      description: null,
      inputMode: 'input',
    },
    {
      id: 'link2',
      type: 'text',
      name: 'link2',
      label: null,
      placeholder: 'link 2',
      value: link2,
      description: null,
      inputMode: 'input',
    },
    {
      id: 'link3',
      type: 'text',
      name: 'link3',
      label: null,
      placeholder: 'link 3',
      value: link3,
      description: null,
      inputMode: 'input',
    },
    {
      id: 'link4',
      type: 'text',
      name: 'link4',
      label: null,
      placeholder: 'link 4',
      value: link4,
      description: null,
      inputMode: 'input',
    },
  ];
  const { tokenData } = useRouteLoaderData('root');
  const { myProfileImgHandler, myProfileImg } = useContext(ManagmentSystem);

  let profile = profileImg;

  const handleAddProfileClick = async (file) => {
    try {
      const myProfile = await createProfile(tokenData, file);
      myProfileImgHandler(myProfile.imageUrl);
      profile = myProfileImg;
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const handleEditProfileClick = async (file) => {
    try {
      const myProfile = await editProfile(tokenData, file);
      myProfileImgHandler(myProfile.imageUrl);
      profile = myProfileImg;
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  return (
    <div className={`${classes.general_profile_main_container} flex-column flex-md-row`}>
      <div className={`${classes.profile_main_container}`}>
        <Image
          src={profile ? profile : userGeneralProfile}
          alt="User profile picture"
          imgContainerStyle={classes.profile_images_container}
          imgStyle={classes.profile_images}
        />
        <FileUpload
          btnType={profile ? 'edit_profile' : 'add_profile'}
          type="image"
          onFileSelect={profile ? handleEditProfileClick : handleAddProfileClick}
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

      <Form method="post" className={classes.profile_edit_main_container}>
        <div className={classes.profile_edit_container}>
          <SectionTitle title="Personal Info" />
          {PROFILE_EDIT_DATA.map((data) => (
            <div key={data.id} className={classes.profile_edit_input_container}>
              <div className={classes.profile_edit_input}>
                {!data.label && <Icon iconContainerStyle={classes.icon_container} icon={faLink} />}
                {data.inputMode === 'input' && (
                  <Input
                    id={data.id}
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    label={data.label}
                    instructionLabel={data.description}
                    defaultValue={data?.value}
                  />
                )}
                {data.inputMode === 'text_area' && (
                  <TextArea
                    id={data.id}
                    type={data.type}
                    name={data.name}
                    placeholder={data.placeholder}
                    label={data.label}
                    defaultValue={data?.value}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <SolidButton buttonStyle={classes.profile_save_button} label="Save Changes" />
      </Form>
    </div>
  );
}

export default GeneralProfile;
