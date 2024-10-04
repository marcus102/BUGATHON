import React from 'react';
import classes from './headerOptionsCmp.module.css';
import Text from '../utils/TextSection';
import { Image } from '../utils/MediaSection';
import userProfile from '../assets/images/general_profile.svg';
import { DropdownMenu } from '../utils/ButtonSection';
import CustomMenu from './custom/CustomMenuCmp';
import { CONTRIBUTION_DROP_DOWN, CONTRIBUTIONS_OPTION } from '../data/Database';

function HeaderOptions({ contributionsCount, img1, img2, img3, contributionsArray }) {
  return (
    <DropdownMenu
      dropDownMenuStyle={classes.header_option_menu}
      buttonChildren={
        <div className={classes.solid_button_container}>
          <Text
            unwrap={true}
            label10Style={classes.contrib_label10_style}
            label10={
              contributionsCount ? `${contributionsCount} contibution(s)` : 'No Contribution'
            }
          />
          <div className={classes.options_img_container}>
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img1 ? img1 : userProfile}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img2 ? img2 : userProfile}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={img3 ? img3 : userProfile}
            />
          </div>
        </div>
      }
    >
      <CustomMenu
        title={'Contribution(s)'}
        dropDown={CONTRIBUTION_DROP_DOWN}
        METADATA={contributionsArray}
        option={CONTRIBUTIONS_OPTION}
        emptyContentLabel={'No Contributions Available yet!'}
      />
    </DropdownMenu>
  );
}

export default HeaderOptions;
