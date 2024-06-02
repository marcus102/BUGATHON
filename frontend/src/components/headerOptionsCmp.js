import React from 'react';
import classes from './headerOptionsCmp.module.css';
import { SolidButton } from '../utils/ButtonSection';
import Text from '../utils/TextSection';
import Image from '../utils/ImageSection';
import images from '../assets/images/globe.jpg';

function HeaderOptions({ headerOptionMainContainer, contributions, img1, img2, img3 }) {
  return (
    <SolidButton
      buttonMainContainerStyle={headerOptionMainContainer}
      buttonContainerStyle={classes.solid_button_container}
      buttonStyle={classes.solid_button}
      children={
        <>
          <Text label10Style={classes.contrib_label10_style} label10={'10K Contributions'} />
          <div className={classes.options_img_container}>
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={images}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={images}
            />
            <Image
              imgContainerStyle={classes.contrib_img_container}
              imgStyle={classes.contrib_img}
              src={images}
            />
          </div>
          <Text label16Style={classes.contrib_label16_style} label16={'...'} />
        </>
      }
    />
  );
}

export default HeaderOptions;
