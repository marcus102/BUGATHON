import React from 'react';
import classes from './SearchSection.module.css';
import {
  faHome,
  faSearch,
  faGear,
  faQuestionCircle,
  faSun,
  faMoon,
  faDesktop,
  faGlobe,
  faFile,
  faUser,
  faHandshake,
  faIcicles,
} from '@fortawesome/free-solid-svg-icons';
import Icon from './IconSection';
import Text from './TextSection';
import { Input } from './InputSection';
import { DropdownMenu, IconTextButton, IconButton } from './ButtonSection';

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
      { id: '2', title: 'Dark Mode', icon: faMoon },
      { id: '3', title: 'System Mode', icon: faDesktop }
    ],
  },
  {
    id: 'APIs',
    children: [
      { id: '1', title: 'API 1', icon: faGlobe },
      { id: '2', title: 'API 2', icon: faGlobe },
      { id: '3', title: 'API 3', icon: faGlobe },
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
      { id: '1', title: 'Service 1', icon: faHandshake },
      { id: '2', title: 'Service 2', icon: faHandshake },
      { id: '3', title: 'Service 3', icon: faHandshake },
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

function Search({ icon, onClick }) {
  return (
    <>
      {!icon && (
        <DropdownMenu
          dropDownMainContainerStyle={classes.drop_down_main_container}
          dropDownMenuStyle={classes.drop_down_menu_main_container}
          buttonChildren={
            <div className={classes.search_main_container}>
              <Icon icon={faSearch} />
              <Input placeholder={'Search'} />
            </div>
          }
          children={
            <div className={classes.drop_down_menu_main_container_2}>
              {SEARCH_DROP_DOWN.map((data) => (
                <div className={`${classes.drop_down_menu_icon_text_container}`} key={data.id}>
                  <Text h6={data.id} />
                  {data.children.map((sub_data) => (
                    <IconTextButton
                      key={sub_data.id}
                      inconTextButtonStyle={classes.icon_text_container}
                      unwrap={true}
                      icon={sub_data.icon}
                      label={sub_data.title}
                    />
                  ))}
                </div>
              ))}
            </div>
          }
        />
      )}
      {icon && <IconButton icon={faSearch} onClick={onClick} />}
    </>
  );
}

export default Search;
