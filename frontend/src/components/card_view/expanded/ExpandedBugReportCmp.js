import React from 'react';
import ExpandedCard from '../ExpandedCardView';
import Colors from '../../../constants/colors';
import { CARD_VIEW_OPTION } from '../../../data/Database';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faBookmark,
  faChartSimple,
  faComment,
  faHeart,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

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
  const post = searchParams.get('post');
  const data = useLoaderData();

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <ExpandedCard
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
      post={post}
      parentPosts={[]}
      likedBy={data?.likedBy}
      saveMode={data?.saveMode}
      REACTIONS_META_DATA={[
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
          count: `${data?.comments.length}`,
          state: null,
          activeColor: null,
        },
        {
          id: 'save',
          icon: faBookmark,
          count: null,
          state: data?.saveMode,
          activeColor: Colors.yellow_,
        },
        {
          id: 'share',
          icon: faArrowUpFromBracket,
          count: `${data?.shareCount}`,
          state: null,
          activeColor: null,
        },
        {
          id: 'impression',
          icon: faChartSimple,
          count: `${data?.viewCount}`,
          state: null,
          activeColor: null,
        },
      ]}
    />
  );
}

export default ExpandedBugReport;
