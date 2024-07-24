import React from 'react';
import ExpandedCard from '../ExpandedCardView';
import { DUMMY_BUG_REPORT_DATA, CARD_VIEW_OPTION } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

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
  const post_id = searchParams.get('postId');
  const postData = DUMMY_BUG_REPORT_DATA.find((post) => post.id === post_id);

  const IMPLEMENTATION_DATA = [
    {
      id: 'Description',
      title: postData.description.title,
      content: postData.description.content,
    },
    {
      id: 'Bug Report',
      title: postData.bug_report.title,
      content: postData.bug_report.content,
    },
    {
      id: 'Steps to Reproduce',
      title: postData.steps_to_reproduce.title,
      content: postData.steps_to_reproduce.content,
    },
    {
      id: 'Expected Behavior',
      title: postData.expected_behavior.title,
      content: postData.expected_behavior.content,
    },
    {
      id: 'Actual Behavior',
      title: postData.actual_behavior.title,
      content: postData.actual_behavior.content,
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
      potentialTitle={'Potential Bug Fixes'}
    />
  );
}

export default ExpandedBugReport;
