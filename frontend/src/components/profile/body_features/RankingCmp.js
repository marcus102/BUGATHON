import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import Colors from '../../../constants/colors';
import classes from './RankingCmp.module.css';
import Text from '../../../utils/TextSection';
import BronzeBadge from '../../../assets/icons/bronze_badge.svg';
import SilverBadge from '../../../assets/icons/silver_badge.svg';
import GoldBadge from '../../../assets/icons/gold_badge.svg';
import Profile from '../../../assets/images/quote.jpg';
import RankingImage from '../../../assets/images/study.jpg';
import { ButtonContainer, IconButton, SolidButton } from '../../../utils/ButtonSection';
import { Overlay } from '../../../utils/OverlaySection';
import Image from '../../../utils/ImageSection';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '../../activity_chart/ProgressBarCmp';

const RANKING_DATA = [
  {
    id: '1',
    title: 'Novice',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    status: 'Earned',
    completed_challenges: 2,
  },
  {
    id: '2',
    title: 'Intermediate',
    description:
      'Users who have gained some experience and have become more active on the site, showing progress in their problem-solving skills and contributions.',
    status: 'Pending',
    completed_challenges: 2,
  },
  {
    id: '3',
    title: 'Advanced',
    description:
      'Users who have demonstrated a high level of activity and proficiency in problem-solving, making significant contributions to the community.',
    status: 'Not Active',
    completed_challenges: 2,
  },
  {
    id: '4',
    title: 'Expert',
    description:
      'Users who are highly experienced, active, and knowledgeable, often regarded as leaders or authorities within the community.',
    status: 'Not Active',
    completed_challenges: 2,
  },
];

const BADGES_DATA = [
  {
    id: 'bronze',
    title: 'Bronze',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    badge: BronzeBadge,
    status: 'Earned',
  },
  {
    id: 'silver',
    title: 'Silver',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    badge: SilverBadge,
    status: 'Pending',
  },
  {
    id: 'gold',
    title: 'Gold',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    badge: GoldBadge,
    status: 'Not Active',
  },
];

const BADGES_DETAILS_DATA = [
  {
    id: 'novice',
    rank: 'Novice',
    user: '@marcus',
    profile: Profile,
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    completed_challenges: '2',
    badges: [
      { id: '1', badge: BronzeBadge },
      { id: '2', badge: SilverBadge },
    ],
    status: 'Earned',
    children: [
      {
        id: 'bronze',
        title: 'Bronze',
        description:
          'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
        badge: BronzeBadge,
        criteria: [
          { id: '1', title: 'Total Bug Reports', result: '1K', progress: 20 },
          { id: '2', title: 'Total Bug Fixes', result: '500', progress: 90 },
          { id: '3', title: 'Total Reusable Code', result: '300', progress: 30 },
          { id: '4', title: 'Total Blog Posts', result: '4K', progress: 50 },
        ],
        status: 'Earned',
      },
      {
        id: 'silver',
        title: 'Silver',
        description:
          'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
        badge: SilverBadge,
        criteria: [
          { id: '1', title: 'Total Bug Reports', result: '3K', progress: 20 },
          { id: '2', title: 'Total Bug Fixes', result: '500', progress: 40 },
          { id: '3', title: 'Total Reusable Code', result: '300', progress: 10 },
          { id: '4', title: 'Total Blog Posts', result: '4K', progress: 30 },
        ],
        status: 'Pending',
      },
      {
        id: 'gold',
        title: 'Gold',
        description:
          'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
        criteria: [
          { id: '1', title: 'Total Bug Reports', result: '1K', progress: 15 },
          { id: '2', title: 'Total Bug Fixes', result: '500', progress: 80 },
          { id: '3', title: 'Total Reusable Code', result: '300', progress: 30 },
          { id: '4', title: 'Total Blog Posts', result: '10K', progress: 50 },
        ],
        badge: GoldBadge,
        status: 'Not Active',
      },
    ],
  },
];

function Ranking() {
  const { overlayHandler } = useContext(ManagmentSystem);
  return (
    <div className={`${classes.ranking_root_container}`}>
      <IconButton
        icon={faQuestionCircle}
        onClick={() => {
          overlayHandler('rank_info', 'overlay');
        }}
      />
      <div className={`${classes.ranking_container}`}>
        {/* RANKING */}
        <div className={`${classes.ranking_level_main_container}`}>
          <Text h5={'Ranking'} />
          {RANKING_DATA.map((rank_data) => (
            <ButtonContainer
              key={rank_data.id}
              buttonContainerMainContainer={`${classes.level_main_container} ${
                rank_data.status === 'Earned' && classes.blue_color
              } ${rank_data.status === 'Pending' && classes.yellow_color} ${
                rank_data.status === 'Not Active' && classes.red_color
              }`}
              children={
                <>
                  <div className={`${classes.level_header_container}`}>
                    <Text h6={rank_data.title} />
                    <Text
                      textStyle={`${classes.level_header_tag_container} ${
                        rank_data.status === 'Earned' && classes.blue_color_
                      } ${rank_data.status === 'Pending' && classes.yellow_color_} ${
                        rank_data.status === 'Not Active' && classes.red_color_
                      }`}
                      label10Style={`${classes.level_header_tag_text}`}
                      label10={rank_data.status}
                    />
                  </div>
                  <Text label12Style={`${classes.body_style}`} label12={rank_data.description} />
                  <Text label12Style={`${classes.body_style}`} label12={'Click for more...'} />
                </>
              }
            />
          ))}
        </div>

        {/* BADGE */}
        <div className={`${classes.ranking_badges_main_container}`}>
          <Text h5={'Badges'} />
          {BADGES_DATA.map((badge_data) => (
            <ButtonContainer
              key={badge_data.id}
              buttonContainerMainContainer={`${classes.badges_main_container} ${
                badge_data.id === 'bronze' && classes.bronze_color
              } ${badge_data.id === 'silver' && classes.silver_color} ${
                badge_data.id === 'gold' && classes.gold_color
              }`}
              children={
                <>
                  <div className={`${classes.badges_header_container}`}>
                    <Text h6={badge_data.title} />
                    <Image src={badge_data.badge} alt={'badge'} />
                    <Text
                      textStyle={`${classes.badges_header_tag_container} ${
                        badge_data.id === 'bronze' && classes.bronze_color_
                      } ${badge_data.id === 'silver' && classes.silver_color_} ${
                        badge_data.id === 'gold' && classes.gold_color_
                      }`}
                      label10Style={`${classes.badges_header_tag_text}`}
                      label10={badge_data.status}
                    />
                  </div>
                  <Text label12Style={`${classes.body_style}`} label12={badge_data.description} />
                  <Text label12Style={`${classes.body_style}`} label12={'Click for more...'} />
                </>
              }
            />
          ))}
        </div>
      </div>

      {/* OVERLAY */}
      <Overlay keyId={'rank_info'}>
        <div className={`${classes.ranking_image_main_container}`}>
          <Image
            imgContainerStyle={`${classes.ranking_image_container}`}
            imgStyle={`${classes.ranking_image}`}
            src={RankingImage}
            alt={'Ranking Details Image'}
          />
        </div>

        {BADGES_DETAILS_DATA.map((data) => (
          <div key={data.id} className={`${classes.rank_root_container}`}>
            <div className={`${classes.rank_overlay_header_container}`}>
              <div className={`${classes.header_badge_container}`}>
                <Text h5={data.rank} />
                {data.badges.map((badge) => (
                  <Image
                    key={badge.id}
                    imgContainerStyle={`${classes.header_badge_image_container}`}
                    src={badge.badge}
                    alt={'Badges'}
                  />
                ))}
                <Text
                  textStyle={`${classes.header_tag_container} ${classes.blue_color_}`}
                  label10Style={`${classes.header_tag_text}`}
                  label10={data.status}
                />
              </div>
              <div className={`${classes.header_profile_container}`}>
                <Image
                  imgContainerStyle={`${classes.header_profile_image_container}`}
                  imgStyle={`${classes.header_profile_image}`}
                  src={data.profile}
                  alt={'User Profile'}
                />
                <Text label14={data.user} />
              </div>
            </div>
            <Text label14={data.description} />
            <Text h6={`Completed Challenges: ${data.completed_challenges}`} />
            {data.children.map((sub_data) => (
              <div key={sub_data.id} className={`${classes.body_badge_main_container}`}>
                <div className={`${classes.body_badge_container}`}>
                  <Text h5={sub_data.title} />
                  <Image
                    imgContainerStyle={`${classes.body_badge_image_container}`}
                    src={sub_data.badge}
                    alt={'Badges'}
                  />
                  <Text
                    textStyle={`${classes.body_tag_container} ${
                      sub_data.title === 'Bronze' && classes.bronze_color_
                    } ${sub_data.title === 'Silver' && classes.silver_color_} ${
                      sub_data.title === 'Gold' && classes.gold_color_
                    }`}
                    label10Style={`${classes.body_tag_text}`}
                    label10={sub_data.status}
                  />
                  <IconButton icon={faChevronDown} />
                </div>
                <Text label14={sub_data.description} />
                <Text h6={'Criteria'} />

                {sub_data.criteria.map((criteria) => (
                  <div key={criteria.id} className={`${classes.criteria_list_container}`}>
                    <Text unwrap={true} p16={`${criteria.title}: ${criteria.result}`} />
                    <ProgressBar percent={criteria.progress} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <SolidButton label={'OK'} />
      </Overlay>
    </div>
  );
}

export default Ranking;
