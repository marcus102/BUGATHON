import React, { useState } from 'react';
import classes from './appearanceCmp.module.css';
import { faChevronDown, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import {
  DropdownMenu,
  IconButton,
  ButtonContainer,
  DynamicLabelDropdownMenu,
} from '../../../utils/ButtonSection';
import Link from '../../../utils/LinkSection';

const APPEARANCE_DATA = [
  {
    id: '1',
    title: 'UI Theme Customization',
    description:
      'Navigation refers to the system or interface elements that allow you to move around and explore different sections or pages within the platform. It serves as a roadmap for users, helping them easily find and access the content, features, and functionality they are looking for.',
    description_link: 'Learn more about UI customization',
    sub_title: 'Theme Mode',
    children: [
      { id: 'system_mode', label: 'System Mode', icon: faDesktop, icon_: faCircle },
      { id: 'light_mode', label: 'Light Mode', icon: faSun, icon_: faCircle },
      { id: 'dark_mode', label: 'Dark Mode', icon: faMoon, icon_: faCircle },
    ],
  },
  {
    id: '2',
    title: 'Navigation',
    description:
      'Navigation refers to the system or interface elements that allow you to move around and explore different sections or pages within the platform. It serves as a roadmap for users, helping them easily find and access the content, features, and functionality they are looking for.',
    description_link: 'Learn more about navigation',
    sub_title: null,
    children: [
      {
        id: 'home',
        title: 'Main home side bar',
        button: 'Always open(default)',
        menu: [
          { id: 'open', label: 'Always open(default)' },
          { id: 'close', label: 'Always closed' },
        ],
        icon: faChevronDown,
      },
      {
        id: 'settings',
        title: 'Settings side bar',
        button: 'Always open(default)',
        menu: [
          { id: 'open', label: 'Always open(default)' },
          { id: 'close', label: 'Always closed' },
        ],
        icon: faChevronDown,
      },
      {
        id: 'profile',
        title: 'Profile side bar',
        button: 'Always open(default)',
        menu: [
          { id: 'open', label: 'Always open(default)' },
          { id: 'close', label: 'Always closed' },
        ],
        icon: faChevronDown,
      },
    ],
  },
];

function Appearance() {
  const [selectedLabel, setSelectedLabel] = useState('Always open(default)');

  return (
    <>
      {APPEARANCE_DATA.map((data) => (
        <div key={data.id} className={classes.appearance_main_container}>
          <Text h5={data.title} />
          <div className={classes.title_container}>
            <Text label12={data.description} />
            <Link underline={true} children12={data.description_link} />
          </div>
          <Text h6={data.sub_title} />
          {data.id === '1' && (
            <div className={classes.card_main_container}>
              {data.children.map((sub_data) => (
                <div key={sub_data.id} className={classes.card_container}>
                  <ButtonContainer
                    buttonContainerMainContainer={classes.button_container}
                    children={
                      <div className={classes.card}>
                        <div className={classes.header}>
                          <div className={classes.icon_text}>
                            <Icon icon={sub_data.icon} />
                            <Text label14={sub_data.label} />
                          </div>
                          <Icon icon={sub_data.icon_} />
                        </div>
                        <div className={classes.content}>
                          <div className={classes.circle}></div>
                          <div className={`${classes.line} ${classes.long}`}></div>
                          <div className={`${classes.line} ${classes.short}`}></div>
                          <div className={`${classes.rectangle}`}></div>
                          <div className={`${classes.rectangle} ${classes.small}`}></div>
                        </div>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {data.id === '2' && (
            <div className={classes.dropdown_main_container}>
              {data.children.map((sub_data) => (
                <div key={sub_data.id} className={classes.dropdown_container}>
                  <Text h6={sub_data.title} />
                  <DynamicLabelDropdownMenu
                    dropDownIconTextStyle={classes.dropdown_button_container}
                    dropDownMenuStyle={classes.dropdown_menu_container}
                    buttonLabel={sub_data.button}
                    buttonIcon={sub_data.icon}
                    menuItems={sub_data.menu}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Appearance;
