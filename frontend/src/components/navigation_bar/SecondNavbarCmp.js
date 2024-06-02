import React from 'react';
import Colors from '../../constants/colors';
import {
  DropdownMenu,
  DynamicLabelDropdownMenu,
  SolidButton,
  OutlinedButton,
  IconButton,
} from '../../utils/ButtonSection';
import Text from '../../utils/TextSection';
import classes from './SecondNavbarCmp.module.css';
import {
  faInbox,
  faBell,
  faBug,
  faPlus,
  faEllipsis,
  faSliders,
  faNewspaper,
  faThumbTack,
  faArrowUpFromBracket,
  faTrashCan,
  faExclamation,
  faCaretRight,
  faHome,
  faGear,
  faDesktop,
  faFile,
  faCheckDouble,
  faCaretDown,
  faChevronCircleDown,
  faEllipsisVertical,
  faChevronDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import Search from '../../utils/SearchSection';
import {
  faEyeSlash,
  faMoon,
  faQuestionCircle,
  faSun,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import profile_1 from '../../assets/images/study.jpg';
import profile_2 from '../../assets/images/people.jpg';
import ApiIcon from '../../assets/icons/API.svg';
import ServiceIcon from '../../assets/icons/service.svg';
import Image from '../../utils/ImageSection';
import AssignedBug from './second_navabar_options/AssignedBugCmp';
import Notification from './second_navabar_options/NotificationCmp';

const MENU_OPTIONS = [
  { id: '1', icon: faBug, label: 'Assigned Bug', icon_2: null },
  { id: '2', icon: faInbox, label: 'Inbox', icon_2: null },
  { id: '3', icon: faBell, label: 'Notifications', icon_2: null },
  { id: '4', icon: faSliders, label: 'Adjust', icon_2: null },
];

const CREATE_MENU = [
  { id: '1', icon: faBug, label: 'Bug Report', icon_2: null, href: null },
  { id: '2', icon: faInbox, label: 'Reusable Code', icon_2: null, href: null },
  { id: '3', icon: faNewspaper, label: 'Blog Post', icon_2: null, href: null },
];

const SEARCH_DROP_DOWN = [
  {
    id: 'Quick Actions',
    children: [
      { id: '1', title: 'Home', icon: faHome },
      { id: '2', title: 'Settings', icon: faGear },
      { id: '3', title: 'Help', icon: faQuestionCircle },
    ],
  },
  {
    id: 'Theme',
    children: [
      { id: '1', title: 'Light Mode', icon: faSun },
      { id: '2', title: 'Night Mode', icon: faMoon },
      { id: '3', title: 'System Mode', icon: faDesktop },
    ],
  },
  {
    id: 'APIs',
    children: [
      { id: '1', title: 'API 1', icon: ApiIcon },
      { id: '2', title: 'API 2', icon: ApiIcon },
      { id: '3', title: 'API 3', icon: ApiIcon },
    ],
  },
  {
    id: 'Docs',
    children: [
      { id: '1', title: 'Doc 1', icon: faFile },
      { id: '2', title: 'Doc 2', icon: faFile },
      { id: '3', title: 'Doc 3', icon: faFile },
    ],
  },
  {
    id: 'Account',
    children: [{ id: '1', title: '@marcus ', icon: faUser }],
  },
  {
    id: 'Services',
    children: [
      { id: '1', title: 'Service 1', icon: ServiceIcon },
      { id: '2', title: 'Service 2', icon: ServiceIcon },
      { id: '3', title: 'Service 3', icon: ServiceIcon },
    ],
  },
  {
    id: 'Other',
    children: [
      { id: '1', title: 'Other 1', icon: null },
      { id: '2', title: 'Other 2', icon: null },
      { id: '3', title: 'Other 3', icon: null },
    ],
  },
];

const INBOX_DATA = [];

const ADJUST_DATA = [
  {
    id: 'Collapse',
    icon: faCaretDown,
    children: [
      { id: '1', label: 'All' },
      { id: '2', label: 'Potential Suggestions' },
      { id: '3', label: 'Analytics' },
      { id: '4', label: 'None (default)' },
    ],
  },
  {
    id: 'Other',
    icon: null,
    children: [
      { id: '1', label: '---' },
      { id: '2', label: '----' },
      { id: '3', label: '-----' },
      { id: '4', label: '------' },
    ],
  },
];

function SecondNavbar() {
  return (
    <div className={classes.nav_main_container}>
      <div className="row align-items-center ">
        {/* NEW */}
        <div className="col-md-2 col-4 d-flex justify-content-start ">
          <DropdownMenu
            dropDownMenuStyle={classes.create_drop_down_menu}
            dropDownIconTextStyle={classes.new_button_container}
            buttonLabel={'New'}
            buttonIcon={faPlus}
            menuItems={CREATE_MENU}
          />
        </div>
        {/* SEARCH */}

        <div className="col-md-8 col-lg-5 col-7  justify-content-center ">
          <Search />
        </div>
        {/* DROP DOWN OPTIONS */}

        <div className="col-lg-5 d-none d-lg-flex justify-content-end gap-3 ">
          {/* {MENU_OPTIONS.map((data) => (
            <DropdownMenu
              key={data.id}
              dropDownMenuStyle={classes.header_option_menu}
              dropDownIconTextStyle={classes.header_option_button}
              buttonIcon={data.icon}
              buttonLabel={data.label}
              children={
                <>
                  data.id === '1' && <AssignedBug />
                  data.id === '2' && <Notification />
                </>
              }
            />
          ))} */}
          <DropdownMenu
            dropDownMenuStyle={classes.header_option_menu}
            dropDownIconTextStyle={classes.header_option_button}
            buttonIcon={faBug}
            buttonLabel={'Assigned Bug'}
            children={<AssignedBug />}
          />
          <DropdownMenu
            dropDownMenuStyle={classes.header_option_menu}
            dropDownIconTextStyle={classes.header_option_button}
            buttonIcon={faInbox}
            buttonLabel={'Inbox'}
            menuItems={''}
          />
          <DropdownMenu
            dropDownMenuStyle={classes.header_option_menu}
            dropDownIconTextStyle={classes.header_option_button}
            buttonIcon={faBell}
            buttonLabel={'Notifications'}
            children={<Notification />}
          />
          <DropdownMenu
            dropDownMenuStyle={classes.header_option_menu}
            dropDownIconTextStyle={classes.header_option_button}
            buttonIcon={faSliders}
            buttonLabel={'Adjust'}
            menuItems={''}
          />
        </div>

        <div className="col-1 d-lg-none d-flex justify-content-end">
          <DropdownMenu
            dropDownMenuStyle={classes.dorp_down_menu}
            buttonIcon={faEllipsis}
            menuItems={MENU_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
}

export default SecondNavbar;
