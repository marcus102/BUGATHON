import React from 'react';
import classes from './sessionCmp.module.css';
import desktopImg from '../../../assets/icons/session.svg';
import dotImg from '../../../assets/icons/green_dot.svg';
import { Image } from '../../../utils/MediaSection';
import Text from '../../../utils/TextSection';
import Link from '../../../utils/LinkSection';

const SESSION_DATA = [
  { id: '1', title: 'Device', sub_title: 'Chrome on window' },
  { id: '2', title: 'Location', sub_title: 'FCT, Abuja, Nigeria' },
  { id: '3', title: 'Last Accessed', sub_title: 'February 14, 2024' },
  { id: '4', title: 'Signed in', sub_title: 'February 29, 2024' },
];

function Session() {
  return (
    <div className={classes.session_main_container}>
      <Text h5={'Web Sessions'} />
      <div className={classes.session_description_container}>
        <Text
          label12={
            'These are the devices that have accessed your account. If you see any sessions you do not recognize, you can revoke their access.'
          }
        />
        <Link underline={true} children12={'Learn more about web sessions'} />
      </div>
      <div className={classes.session_content_main_container}>
        <div className={classes.session_image_main_container}>
          <Image
            imgContainerStyle={classes.session_image_container}
            imgStyle={classes.session_image}
            src={desktopImg}
            alt={'desktop image'}
          />
          <div className={classes.session_current_session_container}>
            <Text label15={'Current session'} />
            <Image
              imgContainerStyle={classes.dot_image_container}
              imgStyle={classes.dot_image}
              src={dotImg}
              alt={'dot image'}
            />
          </div>
        </div>
        <div className={classes.session_data_container}>
          {SESSION_DATA.map((data) => (
            <div key={data.id}>
              <Text h6={data.title} />
              <Text label12={data.sub_title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Session;
