import React from 'react';
import ExpandedCard from '../ExpandedCardView';
import { DUMMY_BUG_FIX_DATA, CARD_VIEW_OPTION } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

const SUGESTION_BUTTON_DATA = [
  { id: '1', label: 'View People Contributions', children: null },
  { id: '2', label: 'Contribute To The Code', children: null },
];

function ExpandedBugFix() {
  const [searchParams] = useSearchParams();
  const post_id = searchParams.get('postId');
  const postData = DUMMY_BUG_FIX_DATA.find((post) => post.id === post_id);

  const IMPLEMENTATION_DATA = [
    {
      id: 'Bug Report',
      title: postData.bug_report.title,
      content: postData.bug_report.content,
    },
    {
      id: 'Solution',
      title: postData.solution.title,
      content: postData.solution.content,
    },
    {
      id: 'Result',
      title: postData.result.title,
      content: postData.result.content,
    },
    {
      id: 'Description',
      title: postData.description.title,
      content: postData.description.content,
    },
  ];

  return (
    <ExpandedCard
      REACTIONS_META_DATA={postData.reactions}
      CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION}
      IMPLEMENTATION_META_DATA={IMPLEMENTATION_DATA}
      SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_DATA}
      contributionsArray={postData.contributions}
      contributionsCount={postData.totalAttempts}
      title={postData.title}
      potentialTitle={'Related Bug Reports'}
    />
  );
}

export default ExpandedBugFix;
