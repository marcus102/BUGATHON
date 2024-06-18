import React, { useState } from 'react';
import classes from './userProfileHeaderCmp.module.css';
import Icon from '../utils/IconSection';
import Image from '../utils/ImageSection';
import Text from '../utils/TextSection';
import {
  OutlinedButton,
  DropdownMenu,
  ButtonContainer,
  IconTextButton,
} from '../utils/ButtonSection';
import images from '../assets/images/globe.jpg';
import VerifiedBadge from '../assets/icons/verified_badge.svg';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';

const DUMMY_GUEST_USER_PROFILE = [
  {
    id: '1',
    engagement: [
      { id: '1.1', title: 'Followers', total: '100K', icon: null },
      { id: '1.2', title: 'Followings', total: '30K', icon: null },
      { id: '1.3', title: 'Star', total: '10K', icon: faStar },
    ],
    buttons: [
      { id: '1.4', title: 'Report This Account', icon: faExclamationCircle },
      { id: '1.5', title: 'Block This Account', icon: faUserLock },
    ],
  },
];

function UserProfileHeader({ username, profession, profileImg, hideFollow }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const renderProfileDropdownButton = () => (
    <>
      <div className={classes.username_button_container}>
        <Text label12Style={classes.username_label12_style} label12={`@${username}`} />
        <Text label10Style={classes.profession_label10_style} label10={'profession'} />
      </div>
      <Image
        imgContainerStyle={classes.img_container}
        imgStyle={classes.img}
        src={profileImg || images}
      />
    </>
  );

  const renderGuestUserInfo = () => (
    <div className={classes.guest_user_info_full_name_overview_main_container}>
      <div className={classes.guest_user_info_full_name_container}>
        <div className={classes.full_name_overview_container}>
          <Image
            imgContainerStyle={classes.profile_image_container}
            imgStyle={classes.profile_image}
            src={images}
            alt={'Profile'}
          />
          <div className={classes.full_name_container}>
            <div className={classes.full_name_overview_container}>
              <Text unwrap={true} h6={'SAWADOGO WENDPANGA MARCUS'} />
              <Image
                imgContainerStyle={classes.verified_badge_container}
                src={VerifiedBadge}
                alt={'Verification Badge'}
              />
            </div>
            <div className={classes.full_name_overview_container_3}>
              <Text label12={'Software Engineer'} />
              <OutlinedButton
                buttonMainContainerStyle={classes.follow_button_container}
                buttonStyle={classes.follow_button}
                onClick={handleFollowToggle}
              >
                <Text
                  label12Style={classes.follow_label12_style}
                  label12={!isFollowing ? 'Follow' : 'Unfollow'}
                />
              </OutlinedButton>
            </div>

            <Text label10={'Online'} />
          </div>
        </div>
      </div>

      {DUMMY_GUEST_USER_PROFILE.map((data) => (
        <div key={data.id} className={classes.popularity_overview_main_container}>
          <div className={classes.popularity_overview_container}>
            {data.engagement.map((engData) => (
              <ButtonContainer
                key={engData.id}
                buttonContainerMainContainer={classes.popularity_overview_button_container}
              >
                <div className={classes.popularity_button_overview_container}>
                  <Text label15Style={classes.popularity_text_overview} label15={engData.title} />
                  {engData.icon && <Icon icon={engData.icon} />}
                </div>
                <Text label15Style={classes.popularity_text_overview} label15={engData.total} />
              </ButtonContainer>
            ))}
          </div>
          <ButtonContainer
            buttonContainerMainContainer={classes.popularity_overview_button_container_2}
            children={<Text label10Style={classes.popularity_text_overview} label10={'Click for more...'} />}
          />
          {data.buttons.map((btnData) => (
            <IconTextButton
              inconTextButtonStyle={classes.popularity_overview_icon_text_button}
              unwrap={true}
              key={btnData.id}
              icon={btnData.icon}
              label={btnData.title}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes.header_profile_container}>
      <div className={classes.profile_container}>
        <DropdownMenu
          dropDownMenuStyle={classes.create_drop_down_menu}
          buttonChildren={renderProfileDropdownButton()}
          children={renderGuestUserInfo()}
        />
      </div>
      {!hideFollow && (
        <OutlinedButton
          buttonMainContainerStyle={classes.follow_button_container}
          buttonStyle={classes.follow_button}
          onClick={handleFollowToggle}
        >
          <Text
            label12Style={classes.follow_label12_style}
            label12={!isFollowing ? 'Follow' : 'Unfollow'}
          />
        </OutlinedButton>
      )}
    </div>
  );
}

export default UserProfileHeader;

// import React, { useState } from 'react';
// import classes from './userProfileHeaderCmp.module.css';
// import Icon from '../utils/IconSection';
// import Image from '../utils/ImageSection';
// import Text from '../utils/TextSection';
// import {
//   OutlinedButton,
//   DropdownMenu,
//   ButtonContainer,
//   IconTextButton,
// } from '../utils/ButtonSection';
// import images from '../assets/images/globe.jpg';
// import VerifiedBadge from '../assets/icons/verified_badge.svg';
// import { faStar } from '@fortawesome/free-regular-svg-icons';
// import { faExclamationCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';

// const DUMMY_GUEST_USER_PROFILE = [
//   {
//     id: '1',
//     engagement: [
//       { id: '1.1', title: 'Followers', total: '100K', icon: null },
//       { id: '1.2', title: 'Followings', total: '30K', icon: null },
//       { id: '1.3', title: 'Star', total: '10K', icon: faStar },
//     ],
//     buttons: [
//       { id: '1.4', title: 'Report This Account', icon: faExclamationCircle },
//       { id: '1.5', title: 'Block This Account', icon: faUserLock },
//     ],
//   },
// ];

// function UserProfileHeader({ username, profession, profileImg, hideFollow }) {
//   const [isFollowing, setIsFollowing] = useState(false);

//   return (
//     <div className={classes.header_profile_container}>
//       <div className={classes.profile_container}>
//         <DropdownMenu
//           buttonChildren={
//             <>
//               <div className={`${classes.username_button_container}`}>
//                 <Text label12Style={classes.username_label12_style} label12={'@marcus'} />
//                 <Text label10Style={classes.profession_label10_style} label10={'UI/UX design'} />
//               </div>
//               <Image
//                 imgContainerStyle={classes.img_container}
//                 imgStyle={classes.img}
//                 src={images}
//               />
//             </>
//           }
//           children={
//             <div className={classes.guest_user_info_full_name_overview_main_container}>
//               <div className={classes.guest_user_info_full_name_container}>
//                 <div className={classes.full_name_overview_container}>
//                   <Text h4={'SAWADOGO WENDPANGA MARCUS'} />
//                   <Image src={VerifiedBadge} alt={'Verification Badge'} />
//                 </div>
//                 <Text label12={'Software Engineer'} />
//                 <Text label10={'Online'} />
//                 <OutlinedButton
//                   buttonContainerStyle={classes.follow_button_container}
//                   buttonStyle={classes.follow_button}
//                   onClick={() => {
//                     setIsFollowing(!isFollowing);
//                   }}
//                   children={
//                     <Text
//                       label12Style={classes.follow_label12_style}
//                       label12={!isFollowing ? 'Follow' : 'Unfollow'}
//                     />
//                   }
//                 />
//               </div>

//               <div className={classes.full_info_popularity_overview_main_container}>
//                 {DUMMY_GUEST_USER_PROFILE.map((data) => (
//                   <div key={data.id} className={classes.popularity_overview_main_container}>
//                     <div className={classes.popularity_overview_container}>
//                       {data.engagement.map((eng_data) => (
//                         <ButtonContainer
//                           key={eng_data.id}
//                           buttonContainerMainContainer={
//                             classes.popularity_overview_button_container
//                           }
//                           children={
//                             <>
//                               <div className={classes.popularity_button_overview_container}>
//                                 <Text
//                                   label15Style={classes.popularity_text_overview}
//                                   label15={eng_data.title}
//                                 />
//                                 {data.icon && <Icon icon={eng_data.icon} />}
//                               </div>
//                               <Text
//                                 label15Style={classes.popularity_text_overview}
//                                 label15={eng_data.total}
//                               />
//                             </>
//                           }
//                         />
//                       ))}
//                     </div>
//                     {data.buttons.map((btn_data) => (
//                       <IconTextButton
//                         key={btn_data.id}
//                         icon={btn_data.icon}
//                         label={btn_data.title}
//                       />
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           }
//         />
//       </div>
//       {!hideFollow && (
//         <OutlinedButton
//           buttonContainerStyle={classes.follow_button_container}
//           buttonStyle={classes.follow_button}
//           onClick={() => {
//             setIsFollowing(!isFollowing);
//           }}
//           children={
//             <Text
//               label12Style={classes.follow_label12_style}
//               label12={!isFollowing ? 'Follow' : 'Unfollow'}
//             />
//           }
//         />
//       )}
//     </div>
//   );
// }

// export default UserProfileHeader;
