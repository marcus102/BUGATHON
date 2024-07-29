import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './SideBarCmp.module.css';
import Colors from '../../../constants/colors';
import {
  IconButton,
  PlaneButton,
  SolidButton,
  IconTextButton,
} from '../../../utils/ButtonSection';
import ToolTip from '../../../utils/toolTipSection';
import {
  faArrowRightFromBracket,
  faArrowUpWideShort,
  faDesktop,
  faFilter,
  faMoon,
  faSun,
  faGears,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../../../utils/TextSection';
import { useNavigate } from 'react-router-dom';
import Line from '../../../utils/LineSection';

const THEME_DATA = [
  { id: '1', icon: faSun, active: 'light', tool_tip: 'Light Mode' },
  { id: '2', icon: faMoon, active: 'dark', tool_tip: 'Night Mode' },
  { id: '3', icon: faDesktop, active: 'system', tool_tip: 'System Mode' },
];

const FILTERING_DATA = [
  {
    id: 'category',
    tag: 'Category',
    data: [
      { id: '1', data: 'Lorem' },
      { id: '2', data: 'Lorem' },
      { id: '3', data: 'Lorem' },
      { id: '4', data: 'Lorem' },
      { id: '5', data: 'Lorem' },
    ],
  },
  {
    id: 'programming_language',
    tag: 'Programming Language',
    data: [
      { id: '1', data: 'Lorem' },
      { id: '2', data: 'Lorem' },
      { id: '3', data: 'Lorem' },
      { id: '4', data: 'Lorem' },
      { id: '5', data: 'Lorem' },
    ],
  },
  {
    id: 'operating_system',
    tag: 'Operating System',
    data: [
      { id: '1', data: 'Lorem' },
      { id: '2', data: 'Lorem' },
      { id: '3', data: 'Lorem' },
      { id: '4', data: 'Lorem' },
      { id: '5', data: 'Lorem' },
    ],
  },
];

const SORTING_DATA = [
  {
    id: 'name',
    tag: 'Name',
    data: [
      { id: '1', data: 'A-Z' },
      { id: '2', data: 'Z-A' },
    ],
  },
  {
    id: 'date',
    tag: 'Date',
    data: [
      { id: '1', data: 'Newest' },
      { id: '2', data: 'Oldest' },
    ],
  },
];

export function HomeExpandedSideBar() {
  const [isFiltering, setIsFiltering] = useState(true);
  const [expand, setExpand] = useState(
    FILTERING_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isThemeExpanded, setIsThemeExpanded] = useState(true);
  const { sideBarHandler, sideBar } = useContext(ManagmentSystem);
  const { theme } = sideBar;
  const navigate = useNavigate();

  const CURRENT_DATA = isFiltering ? FILTERING_DATA : SORTING_DATA;

  return (
    <>
      <div className={classes.side_bar_releases_main_container}>
        <Text h5={'Releases'} />
        <Line direction={'horizontal'} />
        <Text p16={'Release 1'} />
        <Text p16={'Release 2'} />
      </div>

      <div className={classes.side_bar_filterig_main_container}>
        <div className={classes.filterig_header_container}>
          <PlaneButton
            buttonContainerMainContainer={isFiltering && classes.active_button}
            label14={'Filtering'}
            onClick={() => {
              setIsFiltering(true);
            }}
          />
          <PlaneButton
            buttonContainerMainContainer={!isFiltering && classes.active_button}
            label14={'Sorting'}
            onClick={() => {
              setIsFiltering(false);
            }}
          />
        </div>
        <>
          {CURRENT_DATA.map((data) => (
            <div key={data.id} className={classes.filterig_main_container}>
              <IconTextButton
                onClick={() => {
                  setExpand((prev) => ({
                    ...prev,
                    [data.id]: !prev[data.id],
                  }));
                }}
                inconTextButtonStyle={classes.header_button_container}
                icon={expand[data.id] ? faAngleUp : faAngleDown}
                children={<Text label14Style={classes.tag_text} label14={data.tag} />}
              />
              {expand[data.id] && (
                <div className={classes.filterig_container}>
                  {data.data.map((subData) => (
                    <SolidButton
                      key={subData.id}
                      buttonMainContainerStyle={classes.tag_button_main_container}
                      buttonStyle={classes.tag_button}
                    >
                      <Text label12Style={classes.filter_tag_text} label12={subData.data} />
                    </SolidButton>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      </div>

      <div className={classes.side_bar_settings_main_container}>
        <IconTextButton
          onClick={() => {
            setIsSettingsExpanded(!isSettingsExpanded);
          }}
          inconTextButtonStyle={classes.setting_drop_down_container}
          icon={isSettingsExpanded ? faAngleUp : faAngleDown}
          children={<Text label14Style={classes.drop_down_text} label14={'Settings'} />}
        />
        {isSettingsExpanded && (
          <>
            <div className={classes.settings_container}>
              <IconTextButton
                onClick={() => {
                  setIsThemeExpanded(!isThemeExpanded);
                }}
                inconTextButtonStyle={classes.theme_drop_down_container}
                icon={isThemeExpanded ? faAngleUp : faAngleDown}
                children={<Text label14Style={classes.drop_down_text} label14={'Theme'} />}
              />
              {isThemeExpanded && (
                <div className={classes.theme_icon_container}>
                  {THEME_DATA.map((data) => (
                    <ToolTip key={data.id} tooltipMessage={data.tool_tip}>
                      <IconButton
                        icon={data.icon}
                        inconButtonStyle={theme === data.active && classes.active_icon_button}
                        onClick={() => sideBarHandler({ theme: data.active })}
                      />
                    </ToolTip>
                  ))}
                </div>
              )}
            </div>
            <IconTextButton
              unwrap={true}
              inconTextButtonStyle={classes.more_settings_container}
              icon={faGears}
              label={'More Settings'}
              onClick={() => navigate(`/settings`)}
            />

            <IconTextButton
              inconTextButtonStyle={classes.logout_container}
              icon={faArrowRightFromBracket}
              colorOnMouseUp={Colors.red_FF2B2B}
              colorOnMouseDown={Colors.red_ff3c3c}
              inconTextLabel16Style={classes.logout_text}
              label={'Logout'}
            />
          </>
        )}
      </div>
    </>
  );
}

export function HomeCollapsedSideBar() {
  const { sideBarHandler, sideBar } = useContext(ManagmentSystem);
  const { theme } = sideBar;

  return (
    <>
      <ToolTip toolTipStyle={classes.side_bar_tool_tip_container} tooltipMessage={'Filtering'}>
        <IconButton icon={faFilter} />
      </ToolTip>
      <ToolTip toolTipStyle={classes.side_bar_tool_tip_container} tooltipMessage={'Sorting'}>
        <IconButton icon={faArrowUpWideShort} />
      </ToolTip>
      {THEME_DATA.map((data) => (
        <ToolTip
          key={data.id}
          toolTipStyle={classes.side_bar_tool_tip_container}
          tooltipMessage={data.tool_tip}
        >
          <IconButton
            icon={data.icon}
            inconButtonStyle={theme === data.active && classes.active_icon_button}
            onClick={() => sideBarHandler({ theme: data.active })}
          />
        </ToolTip>
      ))}
      <ToolTip toolTipStyle={classes.side_bar_tool_tip_container} tooltipMessage={'Logout'}>
        <IconButton
          colorOnMouseUp={Colors.red_FF2B2B}
          colorOnMouseDown={Colors.red_ff3c3c}
          icon={faArrowRightFromBracket}
        />
      </ToolTip>
    </>
  );
}
