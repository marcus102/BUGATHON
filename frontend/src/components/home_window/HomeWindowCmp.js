import React, { useState, useCallback, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
import classes from './HomeWindowCmp.module.css';
import HomeCard from '../card_view/HomeCardView';
import { HomeCollapsedSideBar, HomeExpandedSideBar } from './home_window_options/SideBarCmp';
import HomeHeader from './home_window_options/HeaderCmp';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';
import { faBookmark, faChartSimple, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { getAuthToken } from '../../utils/authSection';
import Text from '../../utils/TextSection';
import { PlaneButton } from '../../utils/ButtonSection';

function HomeWindow({ homeWindowMainContainerStyle }) {
  const { sideBar, headerTab } = useContext(ManagmentSystem);
  const initialPosts = useLoaderData();
  const [visiblePosts, setVisiblePosts] = useState(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [sideBarTab, setSideBarTab] = useState({
    filter: { category: '', os: '', language: '' },
    sort: { name: '', date: '' },
  });

  const loadMorePosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const token = getAuthToken();

    if (!token) {
      console.error('No token available');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response1 = await axios.get(`${PORT}api/v1/bug_reports?page=${page}&limit=26`, {
        headers,
      });
      const response2 = await axios.get(`${PORT}api/v1/bug_fixes?page=${page}&limit=26`, {
        headers,
      });
      const response3 = await axios.get(`${PORT}api/v1/reusable_codes?page=${page}&limit=26`, {
        headers,
      });

      const allData = [];

      // Add non-empty response data to the array
      if (response1.data.data.length > 0) {
        allData.push(...response1.data.data);
      }
      if (response2.data.data.length > 0) {
        allData.push(...response2.data.data);
      }
      if (response3.data.data.length > 0) {
        allData.push(...response3.data.data);
      }

      if (allData.length === 0) {
        console.log('No data available');
        return [];
      }

      // Shuffle the combined array
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const shuffledData = shuffleArray(allData);
      setVisiblePosts((prevPosts) => [...prevPosts, ...shuffledData]);
      setPage((prevPage) => prevPage + 1);
      console.log('Success', shuffledData);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  // Filter posts based on the current tab
  const { fetchData } = useRouteLoaderData('root');
  const currentUserId = fetchData?.data?.id;

  const sideBarHandler = (data, id) => {
    if (id === 'category') {
      setSideBarTab({ ...sideBarTab, filter: { ...sideBarTab.filter, category: data } });
    } else if (id === 'operating_system') {
      setSideBarTab({ ...sideBarTab, filter: { ...sideBarTab.filter, os: data } });
    } else if (id === 'programming_language') {
      setSideBarTab({ ...sideBarTab, filter: { ...sideBarTab.filter, language: data } });
    } else if (id === 'name') {
      setSideBarTab({ ...sideBarTab, sort: { ...sideBarTab.sort, name: data } });
    } else if (id === 'date') {
      setSideBarTab({ ...sideBarTab, sort: { ...sideBarTab.sort, date: data } });
    }
  };

  const headerFilteredPosts = visiblePosts.filter((post) => {
    if (headerTab === 'saved') {
      return post?.savedBy?.some((item) => item.user === currentUserId);
    } else if (headerTab === 'bug_fix') {
      return post.state === 'bug_fix';
    } else if (headerTab === 'bug_report') {
      return post.state === 'bug_report';
    } else if (headerTab === 'reusable_code') {
      return post.state === 'reusable_code';
    } else if (headerTab === 'blog_post') {
      return post.state === 'blog_post';
    }
    return true;
  });

  const sideBarFilteredPosts = () => {
    const { filter, sort } = sideBarTab;
    const { category, os, language } = filter;
    const { name, date } = sort;

    let filtered = [...headerFilteredPosts];

    if (category) {
      filtered = filtered.filter((post) => post?.categories[0]?.category === category);
    }

    if (os) {
      filtered = filtered.filter((post) => post?.operatingSystem[0]?.operatingSystem === os);
    }

    if (language) {
      filtered = filtered.filter((post) => post?.programmingLanguages[0]?.language === language);
    }

    if (name === 'A-Z') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort.name === 'Z-A') {
      filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (date === 'Newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort.date === 'Oldest') {
      filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filtered;
  };

  const filteredPosts = sideBarFilteredPosts();

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
          <VerticalScrollView>
            <HomeExpandedSideBar
              handleCategoryFiltering={sideBarHandler}
              handleOperatingSystemFiltering={sideBarHandler}
              handleProgrammingLanguageFiltering={sideBarHandler}
              handleSortingByName={sideBarHandler}
              handleSortingByDate={sideBarHandler}
            />
          </VerticalScrollView>
        </div>
      )}

      <div className={classes.home_window_list_main_container}>
        {/* HEADER */}
        <HomeHeader totalPosts={`${filteredPosts.length}`} postTitle={headerTab} />

        {/* BODY */}
        <VerticalScrollView>
          {filteredPosts?.length > 0 ? (
            filteredPosts.map((data, index) => (
              <HomeCard
                cardButtonState={data?.state}
                key={`${data.id}-${index}`}
                isHeaderOption={true}
                postTitle={data?.title}
                firstName={data.user?.firstName}
                lastName={data.user?.lastName}
                followersCount={data.user?.followersCount}
                followingCount={data.user?.followingCount}
                starCount={data.user?.starCount}
                postDescription={data?.description}
                username={data.user?.username}
                userId={data.user?.id}
                profession={data.user?.profession}
                role={data.user?.role}
                profileImg={data.user.image && data.user.image[0]?.imageUrl}
                timestamp={data?.createdAt}
                postId={data?.id}
                TAGS={data?.tags}
                REACTIONSMETADATA={reactionData(data)}
                contributionsArray={data?.contributors}
                contributionsCount={data?.totalAttempts}
                likedBy={data?.likedBy}
                savedBy={data?.savedBy}
                commentsArray={data?.comments}
                viewersArray={data?.viewers}
              />
            ))
          ) : (
            <Text h4={'No post found'} />
          )}
          {filteredPosts.length > 20 && (
            <PlaneButton
              label14={loading ? 'Loading more posts...' : 'Load More Posts...'}
              onClick={loadMorePosts}
            />
          )}
        </VerticalScrollView>
      </div>
    </div>
  );
}

export default HomeWindow;

const reactionData = (data) => [
  {
    id: 'likes',
    icon: faHeart,
    count: `${data?.likeCount}`,
    state: null,
    activeColor: Colors.red_FF2B2B,
  },
  {
    id: 'comments',
    icon: faComment,
    count: `${data?.comments?.length}`,
    state: null,
    activeColor: null,
  },
  {
    id: 'save',
    icon: faBookmark,
    count: `${data?.savesCount}`,
    state: data?.saveMode,
    activeColor: Colors.yellow_,
  },
  {
    id: 'impression',
    icon: faChartSimple,
    count: `${data?.viewCount}`,
    state: null,
    activeColor: null,
  },
];
