import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './HeaderCmp.module.css';
import Colors from '../../../constants/colors';
import ToolTip from '../../../utils/toolTipSection';
import { IconButton, SolidButton, DropdownMenu, PlaneButton } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faBookmark,
  faChevronLeft,
  faChevronRight,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../utils/IconSection';

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

function HomeHeader({ totalPosts, postTitle }) {
  const { sideBarHandler, sideBar, headerTabHandler, headerTab } = useContext(ManagmentSystem);
  const { isOpen } = sideBar;

  let title;

  if (postTitle === 'all') {
    title = 'All';
  } else if (postTitle === 'saved') {
    title = 'Saved';
  } else if (postTitle === 'trending') {
    title = 'Trending';
  } else if (postTitle === 'bug_report') {
    title = 'Bug Reports';
  } else if (postTitle === 'bug_fix') {
    title = 'Bug Fixes';
  } else if (postTitle === 'reusable_code') {
    title = 'Reusable Codes';
  } else if (postTitle === 'blog_post') {
    title = 'Blog Posts';
  }

  return (
    <div className={classes.list_header_container}>
      <ToolTip tooltipMessage={isOpen ? 'Close sidebar' : 'Open sidebar'}>
        {isOpen && (
          <IconButton
            inconButtonStyle={'d-none d-xl-block col-lg-2'}
            onClick={() => {
              sideBarHandler({ isOpen: !isOpen });
            }}
            icon={faChevronLeft}
          />
        )}
      </ToolTip>

      <div className={`${classes.header_buttons_container}`}>
        {HEADER_BUTTON.map((data, index) => (
          <PlaneButton
            key={`${data.id}-${index}`}
            buttonContainerMainContainer={`${classes.buttons_main_container} ${data.style}`}
            onClick={() => {
              headerTabHandler(data.id);
            }}
          >
            <div
              className={`${
                headerTab === data.id
                  ? classes.active_buttons_container
                  : classes.children_container
              }`}
            >
              {data.icon && <Icon icon={data.icon} color={data.color} />}
              <Text unwrap={true} label15={data.label} />
            </div>
          </PlaneButton>
        ))}

        <ToolTip tooltipMessage={'More...'}>
          <DropdownMenu
            dropDownMainContainerStyle={`d-block d-xxl-none`}
            dropDownMenuStyle={`${classes.itemMenuStyle}`}
            buttonIcon={faAngleRight}
            menuItems={HEADER_BUTTON_2}
            clickManager={headerTabHandler}
          />
        </ToolTip>
      </div>
      <div className={`${classes.header_results_container}`}>
        <ToolTip tooltipMessage={`total posts`}>
          <Text label14={`${title ? title : 'Results'}: ${totalPosts ? totalPosts : '0'} Posts`} />
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
