import React, { useState } from 'react';
import classes from './GeneralUserInfoCmp.module.css';
import Colors from '../../../constants/colors';
import { IconTextButton, ButtonContainer } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import HomeCard from '../../card_view/HomeCardView';
import {
  faArrowUpFromBracket,
  faAt,
  faChartSimple,
  faChevronDown,
  faChevronUp,
  faLocationDot,
  faPhone,
  faThumbTack,
  faComment,
  faHeart,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  DUMMY_BUG_FIX_DATA,
  DUMMY_BUG_REPORT_DATA,
  DUMMY_REUSABLE_CODE_DATA,
} from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

const categorizeLinks = (links) => {
  const categories = {
    GitHub: '',
    StackOverflow: '',
    LinkedIn: '',
    Twitter: '',
    YouTube: '',
    Default: '', // Add a default category
  };

  links?.forEach((link) => {
    if (link && link.includes('github.com')) {
      categories.GitHub = link;
    } else if (link && link.includes('stackoverflow.com')) {
      categories.StackOverflow = link;
    } else if (link && link.includes('linkedin.com')) {
      categories.LinkedIn = link;
    } else if (link && link.includes('twitter.com')) {
      categories.Twitter = link;
    } else if (link && link.includes('youtube.com')) {
      categories.YouTube = link;
    } else {
      categories.Default = link;
    }
  });

  return categories;
};

const SocialSection = ({ socialData }) => {
  return (
    <div className={classes.bio_contact_container}>
      {socialData.map((data) => (
        <div key={data.id} className={classes.contact_social_container}>
          <Text h5={data.id} />
          <div className={classes.social_container}>
            {data.children.map((subData) => (
              <IconTextButton
                key={subData.id}
                inconTextButtonStyle={classes.social_icon_text_button_container}
                label={subData.address}
                icon={subData.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const BioSection = ({ bio }) => {
  return (
    bio && (
      <div className={classes.bio_container}>
        <Text h5="Bio" />
        <Text p16={bio} />
      </div>
    )
  );
};

const PostSection = ({ postData }) => {
  const [isExpanded, setIsExpanded] = useState(
    postData.reduce((acc, post) => {
      acc[post.id] = false;
      return acc;
    }, {})
  );

  const handleToggleExpand = (id) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={classes.content_user_post_overview_main_container}>
      {postData.map((data) => (
        <div key={data.id}>
          <IconTextButton
            inconTextButtonStyle={classes.user_post_overview_container}
            label={data.id}
            icon_={!isExpanded[data.id] ? faChevronDown : faChevronUp}
            onClick={() => handleToggleExpand(data.id)}
          />
          {isExpanded[data.id] && (
            <>
              {data.children.length > 0 ? (
                data.children.map((subData) => (
                  <div key={subData.id} className={classes.post_card_overview_main_container}>
                    <HomeCard
                      cardButtonState={subData.state}
                      key={subData.id}
                      isHeaderOption
                      postTitle={subData.title}
                      postDescription={subData.description.content}
                      username={subData.user}
                      postId={subData.id}
                      TAGS={subData.tags}
                      REACTIONSMETADATA={[
                        {
                          id: 'likes',
                          icon: faHeart,
                          count: subData.likeCount,
                          activeColor: Colors.red_FF2B2B,
                        },
                        { id: 'comments', icon: faComment, count: subData.totalComments },
                        { id: 'pin', icon: faThumbTack, activeColor: Colors.yellow_ },
                        { id: 'share', icon: faArrowUpFromBracket, count: subData.shareCount },
                        { id: 'impression', icon: faChartSimple, count: subData.viewCount },
                      ]}
                      contributionsArray={subData.contributions}
                      contributionsCount={subData.totalAttempts}
                    />
                  </div>
                ))
              ) : (
                <Text label14="No posts yet" />
              )}
              <ButtonContainer>
                <Text label14="Click here for more..." />
              </ButtonContainer>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const filterDataByUser = (data, username) => {
  return data.filter((item) => item.user === username);
};

function GeneralUserInfo({ link1, link2, link3, link4, emails, telNumber, location, bio }) {
  const [searchParams] = useSearchParams();
  const currentUsername = searchParams.get('username');

  const currentUserBugReports = filterDataByUser(DUMMY_BUG_REPORT_DATA, currentUsername);
  const currentUserBugFixes = filterDataByUser(DUMMY_BUG_FIX_DATA, currentUsername);
  const currentUserReusableCodes = filterDataByUser(DUMMY_REUSABLE_CODE_DATA, currentUsername);

  const DUMMY_POST_DATA = [
    { id: 'Trending', children: [] },
    { id: 'Top Bug Report', children: currentUserBugReports },
    { id: 'Top Bug Fix', children: currentUserBugFixes },
    { id: 'Top Reusable Code', children: currentUserReusableCodes },
  ];

  const categorizedUserLinks = categorizeLinks(
    [link1, link2, link3, link4].filter((link) => link !== undefined)
  );

  // Define a mapping between link types and icons
  const iconMapping = {
    GitHub: faGithub,
    StackOverflow: faStackOverflow,
    LinkedIn: faLinkedin,
    Twitter: faXTwitter,
    YouTube: faYoutube,
    Default: faLink, // Default icon for any other links
  };

  const generateSocialData = (categorizedLinks) => {
    return Object.keys(categorizedLinks).reduce((acc, key) => {
      const address = categorizedLinks[key];
      if (address) {
        // Only include items where the address is defined and not empty
        acc.push({
          id: key,
          icon: iconMapping[key] || iconMapping.Default, // Use default icon if no specific icon found
          address: address,
        });
      }
      return acc;
    }, []);
  };

  // Assuming categorizedUserLinks is already defined
  const SOCIAL_DATA = [
    {
      id: 'Social',
      children: generateSocialData(categorizedUserLinks),
    },
    {
      id: 'Contact',
      children: [
        { id: 'Email Address', icon: faAt, address: emails },
        { id: 'Tel Number', icon: faPhone, address: telNumber },
        { id: 'Location', icon: faLocationDot, address: location },
      ].filter((item) => item.address), // Only include items where the address is defined
    },
  ];
  // const SOCIAL_DATA = [
  //   {
  //     id: 'Social',
  //     children: [
  //       { id: 'GitHub', icon: faGithub, address: categorizedUserLinks.GitHub },
  //       {
  //         id: 'Stack Overflow',
  //         icon: faStackOverflow,
  //         address: categorizedUserLinks.StackOverflow,
  //       },
  //       { id: 'LinkedIn', icon: faLinkedin, address: categorizedUserLinks.LinkedIn },
  //       { id: 'Twitter', icon: faXTwitter, address: categorizedUserLinks.Twitter },
  //       { id: 'YouTube', icon: faYoutube, address: categorizedUserLinks.YouTube },
  //     ],
  //   },
  //   {
  //     id: 'Contact',
  //     children: [
  //       { id: 'Email Address', icon: faAt, address: emails },
  //       { id: 'Tel Number', icon: faPhone, address: telNumber },
  //       { id: 'Location', icon: faLocationDot, address: location },
  //     ],
  //   },
  // ];

  return (
    <div className={classes.general_user_info_content_overview_main_container}>
      <div className={classes.content_user_bio_main_container}>
        <SocialSection socialData={SOCIAL_DATA} />
        <BioSection bio={bio} />
      </div>
      <PostSection postData={DUMMY_POST_DATA} />
    </div>
  );
}

export default GeneralUserInfo;
