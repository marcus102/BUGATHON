import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
import classes from './HomeWindowCmp.module.css';
import HomeCard from '../card_view/HomeCardView';
import { HomeCollapsedSideBar, HomeExpandedSideBar } from './home_window_options/SideBarCmp';
import HomeHeader from './home_window_options/HeaderCmp';
import Pagination from '../../utils/PaginationSection';
import usePagination from '../../custom_hooks/usePaginationHook';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';
import { DUMMY_POST_DATA } from '../../data/Database';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faComment,
  faHeart,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

// const DUMMY_POST_DATA = [
//   {
//     id: '1',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '2',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '3',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'reusable_code',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '4',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '5',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '6',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '7',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'reusable code',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '8',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '9',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '10',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '11',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '12',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '13',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'reusable_code',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '14',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_fix',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '15',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
//   {
//     id: '16',
//     title: 'Lorem ipsum dolor sit amet.',
//     state: 'bug_report',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
//   },
// ];

function HomeWindow({ homeWindowMainContainerStyle }) {
  const { sideBar } = useContext(ManagmentSystem);

  const ITEMS_PER_PAGE = 5;
  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(
    DUMMY_POST_DATA,
    ITEMS_PER_PAGE
  );

  return (
    <div className={`${classes.home_window_main_container} ${homeWindowMainContainerStyle}`}>
      {/* SIDE BAR */}

      <div className={`d-flex d-xl-none ${classes.home_window_collapsed_side_bar_main_container}`}>
        <HomeCollapsedSideBar />
      </div>

      {!sideBar.isOpen && (
        <div
          className={`d-none d-xl-flex ${classes.home_window_collapsed_side_bar_main_container}`}
        >
          <HomeCollapsedSideBar />
        </div>
      )}

      {sideBar.isOpen && (
        <div className={`d-none d-xl-flex col-lg-2 ${classes.home_window_side_bar_main_container}`}>
          <VerticalScrollView children={<HomeExpandedSideBar />} />
        </div>
      )}

      <div className={classes.home_window_list_main_container}>
        {/* HEADER */}
        <HomeHeader />

        {/* BODY */}
        <VerticalScrollView>
          {paginatedData.map((data) => (
            <HomeCard
              cardButtonState={data.state}
              key={data.id}
              isHeaderOption={true}
              postTitle={data.title}
              postDescription={data.description.content}
              username={data.user}
              postId={data.id}
              TAGS={data.tags}
              REACTIONSMETADATA={[
                {
                  id: 'likes',
                  icon: faHeart,
                  count: data.likeCount,
                  activeColor: Colors.red_FF2B2B,
                },
                { id: 'comments', icon: faComment, count: data.totalComments, activeColor: null },
                { id: 'pin', icon: faThumbTack, count: null, activeColor: Colors.yellow_ },
                {
                  id: 'share',
                  icon: faArrowUpFromBracket,
                  count: data.shareCount,
                  activeColor: null,
                },
                { id: 'impression', icon: faChartSimple, count: data.viewCount, activeColor: null },
              ]}
              contributionsArray={data.contributions}
              contributionsCount={data.totalAttempts}
            />
          ))}
        </VerticalScrollView>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default HomeWindow;
