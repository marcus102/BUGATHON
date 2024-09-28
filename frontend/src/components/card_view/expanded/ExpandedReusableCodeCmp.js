import React from 'react';
import ExpandedCard from '../ExpandedCardView';
import Colors from '../../../constants/colors';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faBookmark,
  faChartSimple,
  faComment,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

const SUGESTION_BUTTON_DATA = [
  { id: '1', label: 'View People Contributions', children: null },
  { id: '2', label: 'Contribute To The Code', children: null },
];

function ExpandedReusableCode() {
  const [searchParams] = useSearchParams();
  const post = searchParams.get('post');
  const data = useLoaderData();

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <ExpandedCard
      state={data?.state}
      contributionsArray={data?.contributors}
      contributionsCount={data?.totalAttempts}
      likesCount={data?.likeCount}
      commentsCount={data?.commentCount}
      sharesCount={data?.shareCount}
      viewsCount={data?.viewCount}
      SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_DATA}
      title={data?.title}
      potentialTitle={'Potential Reusable Codes'}
      description={data?.description}
      firstName={data.user?.firstName}
      lastName={data.user?.lastName}
      profession={data.user?.profession}
      role={data.user?.role}
      username={data.user?.username}
      followersCount={data.user?.followersCount}
      followingCount={data.user?.followingCount}
      starCount={data.user?.starCount}
      profileImg={data.user.image && data.user.image[0]?.profileImg}
      postId={data?._id}
      parentPosts={[data?.parentSolution?.title]}
      post={post}
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

export default ExpandedReusableCode;
