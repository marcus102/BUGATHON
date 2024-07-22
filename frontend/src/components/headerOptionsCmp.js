import React from 'react';
import Colors from '../constants/colors';
import classes from './headerOptionsCmp.module.css';
import Text from '../utils/TextSection';
import { Image } from '../utils/MediaSection';
import images from '../assets/images/globe.jpg';
import {
  faArrowUpFromBracket,
  faCaretDown,
  faExclamationCircle,
  faHeart,
  faThumbTack,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu } from '../utils/ButtonSection';
import CustomMenu from './custom/CustomMenuCmp';

const DUMMY_CONTRIBUTIONS = [
  {
    id: '1',
    profile: images,
    title: '@leyla contributed on you bug report 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat. Mauris eleifend eros id metus volutpat',
    type: 'user',
  },
  {
    id: '2',
    profile: images,
    title: '@adam contributed on your bug report 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: 'user',
  },
  {
    id: '3',
    profile: images,
    title: 'You contibuted to @leyla bug report  1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    type: 'me',
  },
];

const CONTRIBUTION_REACTIONS_DATA = [
  { id: 'like', icon: faHeart, active_color: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, active_color: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, active_color: Colors.green_039000 },
];

const CONTRIBUTION_DROP_DOWN = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Pinned' },
  { id: '3', label: 'Trending' },
  { id: '4', label: 'Relevant' },
  { id: '5', label: 'Recent' },
  { id: '6', label: 'Oldest' },
];

const CONTRIBUTIONS_OPTION = [
  { id: '1', icon: faThumbTack, label: 'Pin', icon_2: null },
  { id: '2', icon: faHeart, label: 'Like', icon_2: null },
  { id: '3', icon: faArrowUpFromBracket, label: 'Share', icon_2: null },
  { id: '4', icon: faTrashCan, label: 'Remove this post', icon_2: null },
  { id: '5', icon: faExclamationCircle, label: 'Report (users only)', icon_2: faCaretDown },
];

function HeaderOptions({ contributions, img1, img2, img3 }) {
  return (
    <DropdownMenu
      dropDownMenuStyle={classes.header_option_menu}
      buttonChildren={
        <div className={classes.solid_button_container}>
          <Text
            unwrap={true}
            label10Style={classes.contrib_label10_style}
            label10={contributions ? contributions : 'No Contribution'}
          />
          <div className={classes.options_img_container}>
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img1 ? img1 : images}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img2 ? img2 : images}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img3 ? img3 : images}
            />
          </div>
        </div>
      }
      children={
        <CustomMenu
          title={'Contribution(s)'}
          dropDown={CONTRIBUTION_DROP_DOWN}
          dataList={DUMMY_CONTRIBUTIONS}
          option={CONTRIBUTIONS_OPTION}
          reactionData={CONTRIBUTION_REACTIONS_DATA}
          emptyContentLabel={'No Contributions Available yet!'}
        />
      }
    />
  );
}

export default HeaderOptions;
