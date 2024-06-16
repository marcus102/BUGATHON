import React from 'react';
import Colors from '../../constants/colors';
import classes from './RankingCmp.module.css';
import Text from '../../utils/TextSection';
import BronzeBadge from '../../assets/icons/bronze_badge.svg';
import SilverBadge from '../../assets/icons/silver_badge.svg';
import GoldBadge from '../../assets/icons/gold_badge.svg';
import Profile from '../../assets/images/quote.jpg';
import { ButtonContainer, IconButton } from '../../utils/ButtonSection';
import { Overlay } from '../../utils/OverlaySection';
import Image from '../../utils/ImageSection';

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
    id: 'bronze',
    user: '@marcus',
    profile: Profile,
    title: 'Bronze',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    badge: BronzeBadge,
    criteria: [
      { id: '1', title: 'Total Bug Reports', result: '1K' },
      { id: '2', title: 'Total Bug Fixes', result: '500' },
      { id: '3', title: 'Total Reusable Code', result: '300' },
      { id: '4', title: 'Total Blog Posts', result: '4K' },
    ],
    status: 'Earned',
  },
  {
    id: 'silver',
    user: '@marcus',
    profile: Profile,
    title: 'Silver',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    badge: SilverBadge,
    criteria: [
      { id: '1', title: 'Total Bug Reports', result: '3K' },
      { id: '2', title: 'Total Bug Fixes', result: '500' },
      { id: '3', title: 'Total Reusable Code', result: '300' },
      { id: '4', title: 'Total Blog Posts', result: '4K' },
    ],
    status: 'Pending',
  },
  {
    id: 'gold',
    user: '@marcus',
    profile: Profile,
    title: 'Gold',
    description:
      'Users who are new to the website or community, with limited activity, experience, or problem-solving contributions.',
    criteria: [
      { id: '1', title: 'Total Bug Reports', result: '1K' },
      { id: '2', title: 'Total Bug Fixes', result: '500' },
      { id: '3', title: 'Total Reusable Code', result: '300' },
      { id: '4', title: 'Total Blog Posts', result: '4K' },
    ],
    badge: GoldBadge,
    status: 'Not Active',
  },
];

function Ranking() {
  return (
    <>
      <div className={`${classes.ranking_root_container}`}>
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
                  <Text label12={rank_data.description} />
                  <Text label12={'Click for more...'} />
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
                  <Text label12={badge_data.description} />
                  <Text label12={'Click for more...'} />
                </>
              }
            />
          ))}
        </div>
      </div>
      {/* OVERLAY */}
      <Overlay
        children={
          <>
            <div>
              <div>
                <Text h5={''} />
                <Image src={''} alt={''} />
                <Text textStyle={`${classes.badges_header_tag_container}`} label10={''} />
              </div>
              <div>
                <Image src={''} alt={''} />
                <Text label14={''} />
              </div>
            </div>
            <Text label14={''} />
            <Text h6={``} />
            <div>
              <Text h5={''} />
              <Image src={''} alt={''} />
              <Text textStyle={`${classes.badges_header_tag_container}`} label10={''} />
              <IconButton />
            </div>
            <Text label14={''} />
            <Text h6={''} />
            <Text label14={''} />
          </>
        }
      />
    </>
  );
}

export default Ranking;
