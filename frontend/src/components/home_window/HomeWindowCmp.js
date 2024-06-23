import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './HomeWindowCmp.module.css';
import Colors from '../../constants/colors';
import {
  IconButton,
  SolidButton,
  IconTextButton,
  ButtonContainer,
} from '../../utils/ButtonSection';
import {
  faChevronLeft,
  faChevronRight,
  faThumbTack,
  faQuestion,
  faFire,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../../utils/TextSection';
import HomeCard from '../card_view/HomeCardView';
import ToolTip from '../../utils/toolTipSection';
import { HomeCollapsedSideBar, HomeExpandedSideBar } from './home_window_options/SideBarCmp';
import HomeHeader from './home_window_options/HeaderCmp';

const DUMMY_POST_DATA = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_fix',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'reusable_code',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '4',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_fix',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '6',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '7',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'reusable code',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '8',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '9',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '10',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_fix',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '11',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '12',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '13',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'reusable_code',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '14',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_fix',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '15',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '16',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
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
  const { headerTab, headerTabHandler } = useContext(ManagmentSystem);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(DUMMY_POST_DATA.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = DUMMY_POST_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`${classes.home_window_main_container} ${homeWindowMainContainerStyle}`}>
      {/* SIDE BAR */}

      <div className={`d-flex d-xl-none ${classes.home_window_collapsed_side_bar_main_container}`}>
        <HomeCollapsedSideBar />
      </div>

      {!isSideBarOpen && (
        <div
          className={` d-none d-xl-flex ${classes.home_window_collapsed_side_bar_main_container}`}
        >
          <HomeCollapsedSideBar />
        </div>
      )}

      {isSideBarOpen && (
        <div className={`d-none d-xl-flex col-lg-2 ${classes.home_window_side_bar_main_container}`}>
          <HomeExpandedSideBar />
        </div>
      )}

      <div className={classes.home_window_list_main_container}>
        {/* HEADER */}
        <HomeHeader />

        {/* BODY */}
        <div className={[classes.list_second_container].join(' ')}>
          {paginatedData.map((data) => (
            <HomeCard
              cardButtonState={data.state}
              key={data.id}
              isHeaderOption={true}
              postTitle={data.title}
              postDescription={data.description}
            />
          ))}
        </div>

        <div className={classes.list_pagination_container}>
          <hr className={classes.horizontal_line} />
          <IconTextButton
            inconTextButtonStyle={classes.previous_pagination_icon_text_container}
            label={'Previous'}
            icon={faChevronLeft}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          />

          <div className={classes.pagination_button_main_container}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <ButtonContainer
                key={page}
                buttonContainerMainContainer={[
                  classes.pagination_button_container,
                  page === currentPage ? classes.active_page : '',
                ].join(' ')}
                onClick={() => handlePageChange(page)}
                children={<Text label12={`${page}`} />}
              />
            ))}
          </div>

          <IconTextButton
            inconTextButtonStyle={classes.next_pagination_icon_text_container}
            label={'Next'}
            icon={faChevronRight}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeWindow;
