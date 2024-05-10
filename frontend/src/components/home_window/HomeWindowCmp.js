import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './HomeWindow.module.css';
import Colors from '../../constants/colors';
import {
  IconButton,
  SolidButton,
  OutlinedButton,
  IconTextButton,
  ButtonContainer,
} from '../../utils/ButtonSection';
import { Radio } from '../../utils/InputSection';
import {
  faChevronLeft,
  faChevronRight,
  faThumbTack,
  faQuestion,
  faPlus,
  faAngleUp,
  faSun,
  faMoon,
  faDesktop,
  faArrowRightFromBracket,
  faAngleDown,
  faChevronUp,
  faChevronDown,
  faFire,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../../utils/TextSection';
import HomeCard from '../card_view/HomeCardView';
import { Overlay } from '../../utils/OverlaySection';
import ToolTip from '../../utils/toolTipSection';

const DUMMY_POST_DATA = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '4',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '6',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '7',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '8',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '9',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '10',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '11',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '12',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '13',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '14',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '15',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '16',
    title: 'Lorem ipsum dolor sit amet.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
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

const THEME_DATA = [
  { id: '1', icon: faSun, active: 'light', tool_tip: 'Light Mode' },
  { id: '2', icon: faMoon, active: 'dark', tool_tip: 'Night Mode' },
  { id: '3', icon: faDesktop, active: 'system', tool_tip: 'System Mode' },
];

const HEADER_BUTTON = [
  {
    id: '1',
    button: 'Pinned',
    icon: faThumbTack,
    color: Colors.orange_ff7811,
    data: 'pinned',
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

function HomeWindow({ homeWindowMainContainerStyle }) {
  const { headerTab, headerTabHandler, overlay, overlayHandler, theme, themeHandler } =
    useContext(ManagmentSystem);

  const [isFiltering, setIsFiltering] = useState(true);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [expand, setExpand] = useState(
    FILTERING_DATA.reduce((acc, reaction) => {
      acc[reaction.id] = false;
      return acc;
    }, {})
  );
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isThemeExpanded, setIsThemeExpanded] = useState(true);

  const CURRENT_DATA = isFiltering ? FILTERING_DATA : SORTING_DATA;

  return (
    <div className={[classes.home_window_main_container, homeWindowMainContainerStyle].join(' ')}>
      {/* SIDE BAR */}

      {isSideBarOpen && (
        <div
          className={[
            'd-none d-xl-flex col-lg-2',
            classes.home_window_side_bar_main_container,
          ].join(' ')}
        >
          <OutlinedButton
            buttonMainContainerStyle={classes.add_button_main_container}
            buttonStyle={classes.add_button}
            icon={faPlus}
            label={'New'}
          />
          <div className={[classes.side_bar_releases_main_container].join(' ')}>
            <Text h5={'Releases'} />
            <hr className={classes.releases_horizontal_bar} />
            <Text p16={'Release 1'} />
            <Text p16={'Release 2'} />
          </div>

          <div className={[classes.side_bar_filterig_main_container].join(' ')}>
            <div className={[classes.filterig_header_container].join(' ')}>
              <SolidButton
                buttonMainContainerStyle={classes.filtering_button_main_container}
                buttonStyle={isFiltering ? classes.active_button : classes.filtering_button}
                onClick={() => {
                  setIsFiltering(true);
                }}
                label={'Filtering'}
              />
              <SolidButton
                buttonMainContainerStyle={classes.filtering_button_main_container}
                buttonStyle={!isFiltering ? classes.active_button : classes.filtering_button}
                onClick={() => {
                  setIsFiltering(false);
                }}
                label={'Sorting'}
              />
            </div>
            <>
              {CURRENT_DATA.map((data) => (
                <div key={data.id} className={[classes.filterig_main_container].join(' ')}>
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
                    <div className={[classes.filterig_container].join(' ')}>
                      {data.data.map((subData) => (
                        <SolidButton
                          key={subData.id}
                          buttonMainContainerStyle={classes.tag_button_main_container}
                          buttonStyle={classes.tag_button}
                          children={
                            <Text label12Style={classes.filter_tag_text} label12={subData.data} />
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          </div>

          <div className={[classes.side_bar_settings_main_container].join(' ')}>
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
                <div className={[classes.settings_container].join(' ')}>
                  <IconTextButton
                    onClick={() => {
                      setIsThemeExpanded(!isThemeExpanded);
                    }}
                    inconTextButtonStyle={classes.theme_drop_down_container}
                    icon={isThemeExpanded ? faAngleUp : faAngleDown}
                    children={<Text label14Style={classes.drop_down_text} label14={'Theme'} />}
                  />
                  {isThemeExpanded && (
                    <div className={[classes.theme_icon_container].join(' ')}>
                      {THEME_DATA.map((data) => (
                        <ToolTip
                          children={
                            <IconButton
                              key={data.id}
                              icon={data.icon}
                              inconButtonStyle={theme === data.active && classes.active_icon_button}
                              onClick={() => themeHandler(data.active)}
                            />
                          }
                          tooltipMessage={data.tool_tip}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <IconTextButton
                  inconTextButtonStyle={classes.logout_container}
                  iconContainerStyle={classes.logout_icon_container}
                  icon={faArrowRightFromBracket}
                  colorOnMouseUp={Colors.red_FF2B2B}
                  colorOnMouseDown={Colors.red_ff3c3c}
                  children={<Text label14Style={classes.logout_text} label14={'Logout'} />}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* OVERLAY */}

      <Overlay
        keyId={'side_bar'}
        className={[classes.home_window_side_bar_main_container].join(' ')}
      >
        <OutlinedButton
          buttonMainContainerStyle={classes.add_button_main_container}
          buttonStyle={classes.add_button}
          icon={faPlus}
          label={'New'}
        />
        <div className={[classes.side_bar_releases_main_container].join(' ')}>
          <Text h5={'Releases'} />
          <hr className={classes.releases_horizontal_bar} />
          <Text p16={'Release 1'} />
          <Text p16={'Release 2'} />
        </div>

        <div className={[classes.side_bar_filterig_main_container].join(' ')}>
          <div className={[classes.filterig_header_container].join(' ')}>
            <SolidButton
              buttonMainContainerStyle={classes.filtering_button_main_container}
              buttonStyle={isFiltering ? classes.active_button : classes.filtering_button}
              onClick={() => {
                setIsFiltering(true);
              }}
              label={'Filtering'}
            />
            <SolidButton
              buttonMainContainerStyle={classes.filtering_button_main_container}
              buttonStyle={!isFiltering ? classes.active_button : classes.filtering_button}
              onClick={() => {
                setIsFiltering(false);
              }}
              label={'Sorting'}
            />
          </div>
          <>
            {CURRENT_DATA.map((data) => (
              <div key={data.id} className={[classes.filterig_main_container].join(' ')}>
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
                  <div className={[classes.filterig_container].join(' ')}>
                    {data.data.map((subData) => (
                      <SolidButton
                        key={subData.id}
                        buttonMainContainerStyle={classes.tag_button_main_container}
                        buttonStyle={classes.tag_button}
                        children={
                          <Text label12Style={classes.filter_tag_text} label12={subData.data} />
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        </div>

        <div className={[classes.side_bar_settings_main_container].join(' ')}>
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
              <div className={[classes.settings_container].join(' ')}>
                <IconTextButton
                  onClick={() => {
                    setIsThemeExpanded(!isThemeExpanded);
                  }}
                  inconTextButtonStyle={classes.theme_drop_down_container}
                  icon={isThemeExpanded ? faAngleUp : faAngleDown}
                  children={<Text label14Style={classes.drop_down_text} label14={'Theme'} />}
                />
                {isThemeExpanded && (
                  <div className={[classes.theme_icon_container].join(' ')}>
                    {THEME_DATA.map((data) => (
                      <ToolTip
                        children={
                          <IconButton
                            key={data.id}
                            icon={data.icon}
                            inconButtonStyle={theme === data.active && classes.active_icon_button}
                            onClick={() => themeHandler(data.active)}
                          />
                        }
                        tooltipMessage={data.tool_tip}
                      />
                    ))}
                  </div>
                )}
              </div>
              <IconTextButton
                inconTextButtonStyle={classes.logout_container}
                iconContainerStyle={classes.logout_icon_container}
                icon={faArrowRightFromBracket}
                colorOnMouseUp={Colors.red_FF2B2B}
                colorOnMouseDown={Colors.red_ff3c3c}
                children={<Text label14Style={classes.logout_text} label14={'Logout'} />}
              />
            </>
          )}
        </div>
      </Overlay>

      {/* LIST */}

      <div className={[classes.home_window_list_main_container].join(' ')}>
        <div className={[classes.list_header_container].join(' ')}>
          <ToolTip
            children={
              <IconButton
                inconButtonStyle={'d-none d-xl-block col-lg-2'}
                onClick={() => {
                  setIsSideBarOpen(!isSideBarOpen);
                }}
                icon={isSideBarOpen ? faChevronLeft : faChevronRight}
              />
            }
            tooltipMessage={isSideBarOpen ? 'Close sidebar' : 'Open sidebar'}
          />

          <IconButton
            inconButtonStyle={'d-block d-xl-none col-lg-2'}
            onClick={() => {
              overlayHandler('side_bar', 'overlay');
            }}
            icon={overlay ? faChevronUp : faChevronDown}
          />
          <div className={[classes.header_buttons_container].join(' ')}>
            {HEADER_BUTTON.map((data) => (
              <SolidButton
                key={data.id}
                buttonMainContainerStyle={[classes.buttons_main_container, data.style].join(' ')}
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
          <div className={[classes.header_results_container].join(' ')}>
            <ToolTip
              children={<Text label14={'Result: 10.000.000 Posts'} />}
              tooltipMessage={'Total posts'}
            />
            <ToolTip
              children={
                <IconButton
                  inconButtonStyle={classes.info_icon_button}
                  colorOnMouseUp={Colors.red_FF2B2B}
                  colorOnMouseDown={Colors.red_ff3c3c}
                  icon={faQuestion}
                />
              }
              tooltipMessage={'Help'}
            />
          </div>
        </div>

        <div className={[classes.list_second_container].join(' ')}>
          {DUMMY_POST_DATA.map((data) => (
            <HomeCard key={data.id} postTitle={data.title} postDescription={data.description} />
          ))}
        </div>

        <div className={classes.list_pagination_container}>
          <hr className={classes.horizontal_line} />
          <IconTextButton
            inconTextButtonStyle={classes.previous_pagination_icon_text_container}
            label={'Previous'}
            icon={faChevronLeft}
          />
          <ButtonContainer
            buttonContainerMainContainer={classes.pagination_button_container}
            children={<Text label12={'1'} />}
          />
          <IconTextButton
            inconTextButtonStyle={classes.next_pagination_icon_text_container}
            label={'Next'}
            icon={faChevronRight}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeWindow;
