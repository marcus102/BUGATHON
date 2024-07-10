import React from 'react';
import Colors from '../../../constants/colors';
import {
  faHeart,
  faThumbTack,
  faArrowUpFromBracket,
  faPen,
  faClipboard,
  faComment,
  faUser,
  faShareNodes,
  faCaretRight,
  faFaceGrinStars,
  faEyeSlash,
  faTrashCan,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import ExpandedCard from '../ExpandedCardView';

const REACTIONS_DATA = [
  { id: 'likes', icon: faHeart, text: '10K', activeColor: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, text: null, activeColor: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, text: null, activeColor: Colors.green_039000 },
];

const CARD_VIEW_OPTION = [
  { id: '1', icon: faPen, label: 'Edit bug report (owner)', icon_2: null, href: null },
  { id: '2', icon: faClipboard, label: 'Assign bug to', icon_2: faCaretRight, href: null },
  { id: '3', icon: faComment, label: 'Comment', icon_2: null, href: null },
  { id: '4', icon: faUser, label: 'Contributions', icon_2: faCaretRight, href: null },
  { id: '5', icon: faShareNodes, label: 'Share', icon_2: null, href: null },
  { id: '6', icon: faThumbTack, label: 'Pin', icon_2: null, href: null },
  { id: '7', icon: faFaceGrinStars, label: 'Make a Review', icon_2: null, href: null },
  { id: '8', icon: faEyeSlash, label: 'I do not want to see this', icon_2: null, href: null },
  { id: '9', icon: faTrashCan, label: 'Delete bug report (owner)', icon_2: null, href: null },
  { id: '10', icon: faExclamation, label: 'Report', icon_2: faCaretRight, href: null },
];

const IMPLEMENTATION_DATA = [
  {
    id: 'Description',
    title: 'Description',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Bug Report',
    title: 'Bug Report',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Steps to Reproduce',
    title: 'Steps to Reproduce',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Expected Behavior',
    title: 'Expected Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: 'Actual Behavior',
    title: 'Actual Behavior',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
];

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
  return (
    <ExpandedCard
      REACTIONS_META_DATA={REACTIONS_DATA}
      CARD_VIEW_OPTION_META_DATA={CARD_VIEW_OPTION}
      IMPLEMENTATION_META_DATA={IMPLEMENTATION_DATA}
      SUGESTION_BUTTON_META_DATA={SUGESTION_BUTTON_DATA}
      title={"Bug Report Title"}
      potentialTitle={'Potential Bug Fixes'}
    />
  );
}

export default ExpandedBugReport;
