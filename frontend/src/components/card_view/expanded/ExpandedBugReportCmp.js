import React, { useEffect, useState } from 'react';
import ExpandedCard from '../ExpandedCardView';
import Colors from '../../../constants/colors';
import { CARD_VIEW_OPTION } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faComment,
  faHeart,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { PORT } from '../../../http_requests/authentication';
import { getAuthToken } from '../../../utils/authSection';

const SUGESTION_BUTTON_DATA = [
  { id: '1', label: 'View People Contributions', children: null },
  { id: '2', label: 'Solve The Bug', children: null },
  {
    id: '3',
    label: 'Assign The Bug To',
    children: [
      { id: '3.1', label: 'Action', href: '#' },
      { id: '3.2', label: 'Another Action', href: '#' },
      { id: '3.3', label: 'Something Else Here', href: '#' },
    ],
  },
];

function ExpandedBugReport() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const [data, setData] = useState(null);
  const [id, setId] = useState(postId);
  const token = getAuthToken();

  useEffect(() => {
    const getBugReport = async () => {
      if (!postId) return; // If postId is null or undefined, don't proceed

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(`${PORT}api/v1/bug_reports/${postId}`, { headers });
        console.log('Success!!', response.data.data);
        setData(response.data.data); // Set the fetched data
        setId(null);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data);
      }
    };

    getBugReport();
  }, [id, token]);

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <ExpandedCard
      REACTIONS_META_DATA={[
        {
          id: 'likes',
          icon: faHeart,
          count: `${data?.likeCount}`,
          activeColor: Colors.red_FF2B2B,
        },
        {
          id: 'comments',
          icon: faComment,
          count: `${data?.commentCount}`,
          activeColor: null,
        },
        { id: 'pin', icon: faThumbTack, count: null, activeColor: Colors.yellow_ },
        {
          id: 'share',
          icon: faArrowUpFromBracket,
          count: `${data?.shareCount}`,
          activeColor: null,
        },
        { id: 'impression', icon: faChartSimple, count: `${data?.viewCount}`, activeColor: null },
      ]}
      CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION}
      SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_DATA}
      contributionsArray={data?.contributions}
      contributionsCount={data?.totalAttempts}
      likesCount={data?.likeCount}
      commentsCount={data?.commentCount}
      sharesCount={data?.shareCount}
      viewsCount={data?.viewCount}
      title={data?.title}
      potentialTitle={'Potential Bug Fixes'}
      description={data.description}
      firstName={data.user?.firstName}
      lastName={data.user?.lastName}
      profession={data.user?.profession}
      role={data.user?.role}
      username={data.user?.username}
      followersCount={data.user?.followersCount}
      followingCount={data.user?.followingCount}
      starCount={data.user?.starCount}
      profileImg={data.user.image[0]?.imageUrl}
      postId={data?._id}
      parentPosts={[]}
    />
  );
}

export default ExpandedBugReport;
