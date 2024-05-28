import React from 'react';
import classes from './GeneralUserInfoCmp.module.css';
import Image from '../../utils/ImageSection';
import { IconTextButton, ButtonContainer } from '../../utils/ButtonSection';
import Line from '../../utils/LineSection';
import Text from '../../utils/TextSection';
import Link from '../../utils/LinkSection';
import HomeCard from '../card_view/HomeCardView';
import Icon from '../../utils/IconSection';
import {
  faArrowPointer,
  faArrowRightFromBracket,
  faAt,
  faEdit,
  faGear,
  faIdBadge,
  faLocationDot,
  faMedal,
  faPhone,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import images from '../../assets/images/people.jpg';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const DUMMY_POST_DATA = [
  {
    id: 'Trending',
    children: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '2',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_report',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '3',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'reusable_code',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
    ],
  },
  {
    id: 'Bug Report',
    children: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_report',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '2',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_report',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '3',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_report',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_report',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
    ],
  },
  {
    id: 'Bug Fix',
    children: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '2',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '3',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'bug_fix',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
    ],
  },
  {
    id: 'Reusable Code',
    children: [
      {
        id: '1',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'reusable_code',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '2',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'reusable_code',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '3',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'reusable_code',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
      {
        id: '4',
        title: 'Lorem ipsum dolor sit amet.',
        state: 'reusable_code',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
      },
    ],
  },
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

const SOCIAL_DATA = [
  {
    id: 'Social',
    children: [
      { id: 'GitHub', icon: faGithub },
      { id: 'Stack Overflow', icon: faStackOverflow },
      { id: 'LinkedIn', icon: faLinkedin },
      { id: '@marcus', icon: faXTwitter },
      { id: 'YouTube', icon: faYoutube },
    ],
  },
  {
    id: 'Contact',
    children: [
      { id: 'Email Address', icon: faAt },
      { id: 'Tel Number:', icon: faPhone },
      { id: 'Located At', icon: faLocationDot },
    ],
  },
];

const GeneralUserInfo = () => {
  return (
    <div className={classes.general_user_info_content_overview_main_container}>
      {/* USER INFO */}
      <div className={classes.content_user_info_overview_main_container}>
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
                    <Icon icon={data.icon} />
                    <Text label12={data.id} />
                  </>
                }
                inconTextButtonStyle={classes.full_name_icon_text_button_overview}
              />
            ))}
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
                      <Text label15={data.id} />
                      <Icon icon={data.icon} />
                    </div>
                    <Text label15={data.total} />
                  </>
                }
              />
              {/* <div className={classes.user_info_followers_overview_main_container}></div> */}
            </div>
          ))}
        </div>
      </div>
      {/* BIO */}
      <div className={classes.content_user_bio_main_container}>
        <div className={classes.bio_contact_container}>
          {SOCIAL_DATA.map((data) => (
            <div key={data.id} className={classes.contact_social_container}>
              <Text h5={data.id} />
              <div className={classes.social_container}>
                {data.children.map((subData) => (
                  <IconTextButton
                    key={subData.id}
                    inconTextButtonStyle={classes.social_icon_text_button_container}
                    label={subData.id}
                    icon={subData.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.bio_container}>
          <Text h5={'Bio'} />
          <Text
            p16={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.'
            }
          />
        </div>
      </div>
      {/* TRENDING - BUG REPORT - BUG FIX - REUSABLE CODE */}
      <div className={classes.content_user_post_overview_main_container}>
        {DUMMY_POST_DATA.map((data) => (
          <div key={data.id}>
            <Text h5={data.id} />
            {data.children.map((subData) => (
              <div key={subData.id} className={classes.post_card_overview_main_container}>
                <HomeCard
                  key={subData.id}
                  postTitle={subData.title}
                  postDescription={subData.description}
                  cardButtonState={subData.state}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralUserInfo;
