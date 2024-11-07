import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './appearanceCmp.module.css';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Text from '../../../utils/TextSection';
import Icon from '../../../utils/IconSection';
import { ButtonContainer } from '../../../utils/ButtonSection';
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
      { id: 'light_mode', label: 'Light Mode', icon: faSun },
      { id: 'dark_mode', label: 'Dark Mode', icon: faMoon },
    ],
  },
  // {
  //   id: '2',
  //   title: 'Navigation',
  //   description:
  //     'Navigation refers to the system or interface elements that allow you to move around and explore different sections or pages within the platform. It serves as a roadmap for users, helping them easily find and access the content, features, and functionality they are looking for.',
  //   description_link: 'Learn more about navigation',
  //   sub_title: null,
  //   children: [
  //     {
  //       id: 'home',
  //       title: 'Main home side bar',
  //       button: 'Always open(default)',
  //       menu: [
  //         { id: 'open', label: 'Always open(default)' },
  //         { id: 'close', label: 'Always closed' },
  //       ],
  //       icon: faChevronDown,
  //     },
  //     {
  //       id: 'settings',
  //       title: 'Settings side bar',
  //       button: 'Always open(default)',
  //       menu: [
  //         { id: 'open', label: 'Always open(default)' },
  //         { id: 'close', label: 'Always closed' },
  //       ],
  //       icon: faChevronDown,
  //     },
  //     {
  //       id: 'profile',
  //       title: 'Profile side bar',
  //       button: 'Always open(default)',
  //       menu: [
  //         { id: 'open', label: 'Always open(default)' },
  //         { id: 'close', label: 'Always closed' },
  //       ],
  //       icon: faChevronDown,
  //     },
  //   ],
  // },
];

const Appearance = () => {
  return (
    <>
      {APPEARANCE_DATA.map((data, index) => (
        <div key={`${data.id}-${index}`} className={classes.appearance_main_container}>
          <Text h5={data.title} />
          {renderDescription(data)}
          {data.sub_title && <Text h6={data.sub_title} />}
          {data.id === '1' && <RenderThemeMode children={data.children} />}
        </div>
      ))}
    </>
  );
};

const renderDescription = (data) => (
  <div className={classes.title_container}>
    <Text label12={data.description} />
    <Link underline children12={data.description_link} />
  </div>
);

const RenderThemeMode = ({ children }) => {
  const { systemThemeHandler, systemTheme } = useContext(ManagmentSystem);

  return (
    <div className={classes.card_main_container}>
      {children.map((sub_data, sub_index) => (
        <div key={`${sub_data.id}-${sub_index}`}>
          <ButtonContainer
            buttonContainerMainContainer={classes.button_container}
            onClick={() => {
              systemThemeHandler(sub_data.id);
              localStorage.setItem('theme', sub_data.id);
            }}
            children={
              <div className={classes.card}>
                <div className={classes.header}>
                  <div className={classes.icon_text}>
                    <Icon icon={sub_data.icon} />
                    <Text label14={sub_data.label} />
                  </div>
                  <Icon icon={sub_data.id === systemTheme ? faCircleCheck : faCircle} />
                </div>
                <div className={classes.content}>
                  <div className={classes.circle}></div>
                  <div className={`${classes.line} ${classes.long}`}></div>
                  <div className={`${classes.line} ${classes.short}`}></div>
                  <div className={classes.rectangle}></div>
                  <div className={`${classes.rectangle} ${classes.small}`}></div>
                </div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

// const renderNavigation = (children) => (
//   <div className={classes.dropdown_main_container}>
//     {children.map((sub_data) => (
//       <div key={sub_data.id} className={classes.dropdown_container}>
//         <Text h6={sub_data.title} />
//         <DynamicLabelDropdownMenu
//           dropDownIconTextStyle={classes.dropdown_button_container}
//           dropDownMenuStyle={classes.dropdown_menu_container}
//           buttonLabel={sub_data.button}
//           buttonIcon={sub_data.icon}
//           menuItems={sub_data.menu}
//         />
//       </div>
//     ))}
//   </div>
// );

export default Appearance;
