import React, { useEffect, useState } from 'react';
import ExpandedCard from '../ExpandedCardView';
import { CARD_VIEW_OPTION } from '../../../data/Database';
import Colors from '../../../constants/colors';
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
  { id: '2', label: 'Contribute To The Code', children: null },
];

function ExpandedBugFix() {
  const [searchParams] = useSearchParams();
  const post_id = searchParams.get('postId');
  const [data, setData] = useState();
  const [id, setId] = useState(post_id);
  const token = getAuthToken();

  useEffect(() => {
    const getBugReport = async () => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(`${PORT}api/v1/bug_fixes/${post_id}`, { headers });
        console.log('Success!!', response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
        return null;
      }
    };

    getBugReport();
    setId(null);
  }, [id]);

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
      potentialTitle={'Related Bug Reports'}
      description={data?.description}
      firstName={data.user?.firstName}
      lastName={data.user?.lastName}
      profession={data.user?.profession}
      role={data.user?.role}
      username={data.user?.username}
      followersCount={data.user?.followersCount}
      followingCount={data.user?.followingCount}
      starCount={data.user?.starCount}
      profileImg={data.user.image[0]?.profileImg}
      postId={data?._id}
      parentPosts={[data?.bugReport?.title, data?.parentSolution?.title]}
    />
  );
}

export default ExpandedBugFix;
