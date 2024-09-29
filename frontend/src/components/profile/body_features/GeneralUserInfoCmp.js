import React from 'react';
import classes from './GeneralUserInfoCmp.module.css';
import { IconTextButton } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
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

//PENDING const PostSection = () => {
//   const [searchParams] = useSearchParams();
//   const currentUsername = searchParams.get('username');

//   const filterDataByUser = (data, username) => {
//     return data.filter((item) => item.user === username);
//   };

//   const currentUserBugReports = filterDataByUser(DUMMY_BUG_REPORT_DATA, currentUsername);
//   const currentUserBugFixes = filterDataByUser(DUMMY_BUG_FIX_DATA, currentUsername);
//   const currentUserReusableCodes = filterDataByUser(DUMMY_REUSABLE_CODE_DATA, currentUsername);
//   const currentUserBlogPosts = filterDataByUser(DUMMY_REUSABLE_CODE_DATA, currentUsername);

//   const DUMMY_POST_DATA = [
//     { id: 'Bug Reports', children: currentUserBugReports },
//     { id: 'Bug Fixes', children: currentUserBugFixes },
//     { id: 'Reusable Codes', children: currentUserReusableCodes },
//     { id: 'Blog Posts', children: currentUserBlogPosts },
//   ];

//   const [isExpanded, setIsExpanded] = useState(
//     DUMMY_POST_DATA.reduce((acc, post) => {
//       acc[post.id] = false;
//       return acc;
//     }, {})
//   );

//   const handleToggleExpand = (id) => {
//     setIsExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className={classes.content_user_post_overview_main_container}>
//       {DUMMY_POST_DATA.map((data, index) => (
//         <div key={`${data.id}-${index}`}>
//           <IconTextButton
//             inconTextButtonStyle={classes.user_post_overview_container}
//             label={data.id}
//             icon_={!isExpanded[data.id] ? faChevronDown : faChevronUp}
//             onClick={() => handleToggleExpand(data.id)}
//           />
//           {isExpanded[data.id] && (
//             <>
//               {data.children.length > 0 ? (
//                 data.children.map((subData) => (
//                   <div key={subData.id} className={classes.post_card_overview_main_container}>
//                     <HomeCard
//                       cardButtonState={subData.state}
//                       key={subData.id}
//                       isHeaderOption
//                       postTitle={subData.title}
//                       postDescription={subData.description.content}
//                       username={subData.user}
//                       postId={subData.id}
//                       TAGS={subData.tags}
//                       REACTIONSMETADATA={[
//                         {
//                           id: 'likes',
//                           icon: faHeart,
//                           count: subData.likeCount,
//                           activeColor: Colors.red_FF2B2B,
//                         },
//                         { id: 'comments', icon: faComment, count: subData.totalComments },
//                         { id: 'pin', icon: faThumbTack, activeColor: Colors.yellow_ },
//                         { id: 'share', icon: faArrowUpFromBracket, count: subData.shareCount },
//                         { id: 'impression', icon: faChartSimple, count: subData.viewCount },
//                       ]}
//                       contributionsArray={subData.contributions}
//                       contributionsCount={subData.totalAttempts}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <Text label14="No posts yet" />
//               )}
//               {data.children.length > 0 && (
//                     <ButtonContainer>
//                   <Text label14="Click here for more..." />
//                 </ButtonContainer>
//               )}
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

function GeneralUserInfo({ link1, link2, link3, link4, emails, telNumber, location, bio }) {
  const categorizedUserLinks = categorizeLinks(
    [link1, link2, link3, link4].filter((link) => link !== undefined)
  );

  const iconMapping = {
    GitHub: faGithub,
    StackOverflow: faStackOverflow,
    LinkedIn: faLinkedin,
    Twitter: faXTwitter,
    YouTube: faYoutube,
    Default: faLink,
  };

  const generateSocialData = (categorizedLinks) => {
    return Object.keys(categorizedLinks).reduce((acc, key) => {
      const address = categorizedLinks[key];
      if (address) {
        acc.push({
          id: key,
          icon: iconMapping[key] || iconMapping.Default,
          address: address,
        });
      }
      return acc;
    }, []);
  };

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
      ].filter((item) => item.address),
    },
  ];

  return (
    <div className={classes.general_user_info_content_overview_main_container}>
      <div className={classes.content_user_bio_main_container}>
        <SocialSection socialData={SOCIAL_DATA} />
        <BioSection bio={bio} />
      </div>
    </div>
  );
}

export default GeneralUserInfo;
