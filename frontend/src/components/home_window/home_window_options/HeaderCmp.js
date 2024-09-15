import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './HeaderCmp.module.css';
import Colors from '../../../constants/colors';
import ToolTip from '../../../utils/toolTipSection';
import { IconButton, SolidButton } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faFire,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

const HEADER_BUTTON = [
  {
    id: '1',
    button: 'Saved',
    icon: faBookmark,
    color: Colors.yellow_,
    data: 'saved',
    style: 'd-none d-lg-block',
  },
  {
    id: '2',
    button: 'Trending',
    icon: faFire,
    color: Colors.orange_ff7811,
    data: 'trending',
    style: '',
  },
  {
    id: '3',
    button: 'All',
    icon: null,
    color: null,
    data: 'all',
    style: '',
  },
  {
    id: '4',
    button: 'Bug Reports',
    icon: null,
    color: null,
    data: 'bug_report',
    style: 'd-none d-lg-block',
  },
  {
    id: '5',
    button: 'Bug Fixes',
    icon: null,
    color: null,
    data: 'bug_fixe',
    style: 'd-none d-xl-block',
  },
  {
    id: '6',
    button: 'Reusable Code',
    icon: null,
    color: null,
    data: 'reusable_code',
    style: 'd-none d-xxl-block',
  },
  {
    id: '7',
    button: '',
    icon: faAngleRight,
    color: null,
    data: '',
    style: '',
  },
];

function HomeHeader({ totalPosts }) {
  const { sideBarHandler, sideBar, headerTabHandler, headerTab } = useContext(ManagmentSystem);
  const { isOpen } = sideBar;

  return (
    <div className={classes.list_header_container}>
      <ToolTip
        children={
          <IconButton
            inconButtonStyle={'d-none d-xl-block col-lg-2'}
            onClick={() => {
              sideBarHandler({ isOpen: !isOpen });
            }}
            icon={isOpen ? faChevronLeft : faChevronRight}
          />
        }
        tooltipMessage={isOpen ? 'Close sidebar' : 'Open sidebar'}
      />

      <div className={`${classes.header_buttons_container}`}>
        {HEADER_BUTTON.map((data, index) => (
          <SolidButton
            key={`${data.id}-${index}`}
            buttonMainContainerStyle={`${classes.buttons_main_container} ${data.style}`}
            buttonStyle={
              headerTab === data.data ? classes.active_buttons_container : classes.buttons_style
            }
            onClick={() => {
              headerTabHandler(data.data);
            }}
            color={data.color}
            label={data.button}
            icon={data.icon}
          />
        ))}
      </div>
      <div className={`${classes.header_results_container}`}>
        <ToolTip
          children={<Text label14={`Result: ${totalPosts ? totalPosts : '0'} Posts`} />}
          tooltipMessage={`total posts`}
        />
        <ToolTip
          children={
            <IconButton
              inconButtonStyle={classes.info_icon_button}
              colorOnMouseUp={Colors.red_FF2B2B}
              colorOnMouseDown={Colors.red_ff3c3c}
              icon={faQuestionCircle}
            />
          }
          tooltipMessage={'Help'}
        />
      </div>
    </div>
  );
}

export default HomeHeader;
