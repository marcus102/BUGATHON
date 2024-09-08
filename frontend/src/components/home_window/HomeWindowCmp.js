import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import Colors from '../../constants/colors';
import classes from './HomeWindowCmp.module.css';
import HomeCard from '../card_view/HomeCardView';
import { HomeCollapsedSideBar, HomeExpandedSideBar } from './home_window_options/SideBarCmp';
import HomeHeader from './home_window_options/HeaderCmp';
import { VerticalScrollView } from '../../utils/ScrollViewsSection';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faComment,
  faHeart,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../../http_requests/authentication';
import { getAuthToken } from '../../utils/authSection';
import Text from '../../utils/TextSection';

function HomeWindow({ homeWindowMainContainerStyle }) {
  const { sideBar } = useContext(ManagmentSystem);
  const initialPosts = useLoaderData();
  const [visiblePosts, setVisiblePosts] = useState(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

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
      const response1 = await axios.get(`${PORT}api/v1/bug_reports?page=1&limit=5`, { headers });

      const response2 = await axios.get(`${PORT}api/v1/bug_fixes?page=1&limit=5`, { headers });

      const response3 = await axios.get(`${PORT}api/v1/reusable_codes?page=1&limit=5`, { headers });

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

      console.log('Success', shuffledData);

      return shuffledData;
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

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
        <HomeHeader totalPosts={`${visiblePosts.length}`} />

        {/* BODY */}
        <VerticalScrollView>
          {visiblePosts.length > 0 ? (
            visiblePosts.map((data, index) => (
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
                profession={data.user?.profession}
                role={data.user?.role}
                profileImg={data.user.image && data.user.image[0]?.imageUrl}
                timestamp={data?.createdAt}
                postId={data?._id}
                TAGS={data?.tags}
                REACTIONSMETADATA={[
                  {
                    id: 'likes',
                    icon: faHeart,
                    count: `${data.likeCount}`,
                    activeColor: Colors.red_FF2B2B,
                  },
                  {
                    id: 'comments',
                    icon: faComment,
                    count: `${data.totalComments !== undefined ? data.totalComments : '0'}`,
                    activeColor: null,
                  },
                  { id: 'pin', icon: faThumbTack, count: null, activeColor: Colors.yellow_ },
                  {
                    id: 'share',
                    icon: faArrowUpFromBracket,
                    count: `${data.shareCount}`,
                    activeColor: null,
                  },
                  {
                    id: 'impression',
                    icon: faChartSimple,
                    count: `${data.viewCount}`,
                    activeColor: null,
                  },
                ]}
                contributionsArray={data?.contributors}
                contributionsCount={data?.totalAttempts}
                likedBy={data?.likedBy}
                pinMode={data?.pinMode}
              />
            ))
          ) : (
            <Text h4={'No posts found'} />
          )}
          {loading && <p>Loading more posts...</p>}
        </VerticalScrollView>
      </div>
    </div>
  );
}

export default HomeWindow;
