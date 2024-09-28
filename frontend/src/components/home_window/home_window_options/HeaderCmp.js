import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './HeaderCmp.module.css';
import Colors from '../../../constants/colors';
import ToolTip from '../../../utils/toolTipSection';
import { IconButton, SolidButton, DropdownMenu } from '../../../utils/ButtonSection';
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
    id: 'all',
    label: 'All',
    icon: null,
    color: null,
    style: 'd-none d-sm-block',
  },
  {
    id: 'saved',
    label: 'Saved',
    icon: faBookmark,
    color: Colors.yellow_,
    style: 'd-none d-md-block',
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: faFire,
    color: Colors.orange_ff7811,
    style: 'd-none d-md-block',
  },
  {
    id: 'bug_report',
    label: 'Bug Reports',
    icon: null,
    color: null,
    style: 'd-none d-lg-block',
  },
  {
    id: 'bug_fix',
    label: 'Bug Fixes',
    icon: null,
    color: null,
    style: 'd-none d-xl-block',
  },
  {
    id: 'reusable_code',
    label: 'Reusable Code',
    icon: null,
    color: null,
    style: 'd-none d-xl-block',
  },
  {
    id: 'blog_post',
    label: 'Blog Post',
    icon: null,
    color: null,
    style: 'd-none d-xxl-block',
  },
];

const HEADER_BUTTON_2 = [
  {
    id: 'all',
    label: 'All',
    icon: null,
    color: null,
    style: 'd-block d-sm-none',
  },
  {
    id: 'saved',
    label: 'Saved',
    icon: faBookmark,
    color: Colors.yellow_,
    style: 'd-block d-md-none',
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: faFire,
    color: Colors.orange_ff7811,
    style: 'd-block d-md-none',
  },
  {
    id: 'bug_report',
    label: 'Bug Reports',
    icon: null,
    color: null,
    style: 'd-block d-lg-none',
  },
  {
    id: 'bug_fix',
    label: 'Bug Fixes',
    icon: null,
    color: null,
    style: 'd-block d-xl-none',
  },
  {
    id: 'reusable_code',
    label: 'Reusable Code',
    icon: null,
    color: null,
    style: 'd-block d-xl-none',
  },
  {
    id: 'blog_post',
    label: 'Blog Post',
    icon: null,
    color: null,
    style: 'd-block d-xxl-none',
  },
];

function HomeHeader({ totalPosts }) {
  const { sideBarHandler, sideBar, headerTabHandler, headerTab } = useContext(ManagmentSystem);
  const { isOpen } = sideBar;

  return (
    <div className={classes.list_header_container}>
      <ToolTip tooltipMessage={isOpen ? 'Close sidebar' : 'Open sidebar'}>
        <IconButton
          inconButtonStyle={'d-none d-xl-block col-lg-2'}
          onClick={() => {
            sideBarHandler({ isOpen: !isOpen });
          }}
          icon={isOpen ? faChevronLeft : faChevronRight}
        />
      </ToolTip>

      <div className={`${classes.header_buttons_container}`}>
        {HEADER_BUTTON.map((data, index) => (
          <SolidButton
            key={`${data.id}-${index}`}
            unwrap={true}
            buttonMainContainerStyle={`${classes.buttons_main_container} ${data.style}`}
            buttonStyle={
              headerTab === data.id ? classes.active_buttons_container : classes.buttons_style
            }
            onClick={() => {
              headerTabHandler(data.id);
            }}
            color={data.color}
            label={data.label}
            icon={data.icon}
          />
        ))}
        <DropdownMenu
          dropDownMainContainerStyle={`d-block d-xxl-none`}
          dropDownMenuStyle={`${classes.itemMenuStyle}`}
          buttonIcon={faAngleRight}
          menuItems={HEADER_BUTTON_2}
        />
      </div>
      <div className={`${classes.header_results_container}`}>
        <ToolTip tooltipMessage={`total posts`}>
          <Text label14={`Result: ${totalPosts ? totalPosts : '0'} Posts`} />
        </ToolTip>
        <ToolTip tooltipMessage={'Help'}>
          <IconButton
            inconButtonStyle={classes.info_icon_button}
            colorOnMouseUp={Colors.red_FF2B2B}
            colorOnMouseDown={Colors.red_ff3c3c}
            icon={faQuestionCircle}
          />
        </ToolTip>
      </div>
    </div>
  );
}

export default HomeHeader;
