import React from 'react';
import classes from './GeneralUserInfoCmp.module.css';
import { IconTextButton } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import {
  faAt,
  faLocationDot,
  faPhone,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const categorizeLinks = (links) => {
  const categories = {
    GitHub: '',
    StackOverflow: '',
    LinkedIn: '',
    Twitter: '',
    YouTube: '',
    Default: '',
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
