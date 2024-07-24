import React from 'react';
import ExpandedCard from '../ExpandedCardView';
import Colors from '../../../constants/colors';
import { DUMMY_REUSABLE_CODE_DATA, CARD_VIEW_OPTION } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faChartSimple,
  faComment,
  faHeart,
  faThumbTack,
} from '@fortawesome/free-solid-svg-icons';

const SUGESTION_BUTTON_DATA = [
  { id: '1', label: 'View People Contributions', children: null },
  { id: '2', label: 'Contribute To The Code', children: null },
];

function ExpandedReusableCode() {
  const [searchParams] = useSearchParams();
  const post_id = searchParams.get('postId');
  const postData = DUMMY_REUSABLE_CODE_DATA.find((post) => post.id === post_id);

  const IMPLEMENTATION_DATA = [
    {
      id: 'Code',
      title: postData.code.title,
      content: postData.code.content,
    },
    {
      id: 'Description',
      title: postData.description.title,
      content: postData.description.content,
    },
    {
      id: 'Achieved Result',
      title: postData.achieved_result.title,
      content: postData.achieved_result.content,
    },
    {
      id: 'Usage Guideline',
      title: postData.usage_guideline.title,
      content: postData.usage_guideline.content,
    },
  ];

  return (
    <ExpandedCard
      REACTIONS_META_DATA={[
        {
          id: 'likes',
          icon: faHeart,
          count: postData.likeCount,
          activeColor: Colors.red_FF2B2B,
        },
        { id: 'comments', icon: faComment, count: postData.totalComments, activeColor: null },
        { id: 'pin', icon: faThumbTack, count: null, activeColor: Colors.yellow_ },
        {
          id: 'share',
          icon: faArrowUpFromBracket,
          count: postData.shareCount,
          activeColor: null,
        },
        { id: 'impression', icon: faChartSimple, count: postData.viewCount, activeColor: null },
      ]}
      contributionsArray={postData.contributions}
      contributionsCount={postData.totalAttempts}
      CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION}
      IMPLEMENTATION_META_DATA={IMPLEMENTATION_DATA}
      SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_DATA}
      title={postData.title}
      potentialTitle={'Potential Reusable Codes'}
    />
  );
}

export default ExpandedReusableCode;
