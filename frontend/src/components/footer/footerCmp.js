import React from 'react';
import classes from './footerCmp.module.css';
import Text from '../../utils/TextSection';
import Link from '../../utils/LinkSection';
import { PlaneButton } from '../../utils/ButtonSection';
import {
  faYoutube,
  faXTwitter,
  faLinkedin,
  faDiscord,
  faInstagram,
  faFacebook,
  faTelegram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import ToolTip from '../../utils/toolTipSection';
import Line from '../../utils/LineSection';

const LINK_DATA = [
  { id: '1', link_name: 'About', link: '' },
  { id: '2', link_name: 'API', link: '' },
  { id: '3', link_name: 'Blog', link: '' },
  { id: '4', link_name: 'Services', link: '' },
  { id: '5', link_name: 'Docs', link: '' },
  { id: '6', link_name: 'Support', link: '' },
  { id: '7', link_name: 'FAQ', link: '' },
  { id: '8', link_name: 'Legal', link: '' },
  { id: '9', link_name: 'Contact Us', link: '' },
  { id: '10', link_name: 'Terms & Conditions', link: '' },
  { id: '11', link_name: 'Cookies Settings', link: '' },
  { id: '12', link_name: 'Cookies Policy', link: '' },
  { id: '13', link_name: 'Product', link: '' },
];
const ICON_LINK_DATA = [
  { id: '1', icon: faYoutube, icon_link: '', tool_tip: 'YouTube' },
  { id: '2', icon: faXTwitter, icon_link: '', tool_tip: 'Twitter' },
  { id: '3', icon: faLinkedin, icon_link: '', tool_tip: 'Linkedin' },
  { id: '4', icon: faDiscord, icon_link: '', tool_tip: 'Discord' },
  { id: '5', icon: faInstagram, icon_link: '', tool_tip: 'Instagram' },
  { id: '6', icon: faFacebook, icon_link: '', tool_tip: 'Facebook' },
  { id: '7', icon: faTelegram, icon_link: '', tool_tip: 'Telegram' },
  { id: '8', icon: faTiktok, icon_link: '', tool_tip: 'Tiktok' },
];

function Footer() {
  return (
    <div className={classes.footer_main_container}>
      <Line direction={'horizontal'} />
      <PlaneButton
        buttonContainerMainContainer={classes.footer_header_container}
        label16={'BUGATHON'}
      />

      <div className={classes.footer_links_container}>
        {LINK_DATA.map((data, index) => (
          <PlaneButton
            key={`${data.id}-${index}`}
            buttonContainerMainContainer={classes.footer_link}
            label14={data.link_name}
          />
        ))}
      </div>
      <div className={classes.footer_icon_button_container}>
        {ICON_LINK_DATA.map((data) => (
          <ToolTip key={data.id} tooltipMessage={data.tool_tip}>
            <Link icon_link={data.icon} href={data.icon_link} />
          </ToolTip>
        ))}
      </div>
      <Text label12={'© Bugathon 2024 powered by soft all right reserved'} />
    </div>
  );
}

export default Footer;
