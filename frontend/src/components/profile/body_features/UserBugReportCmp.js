import React from 'react';
import classes from './UserBugReportCmp.module.css';
import CustomBugList from '../../custom/CustomBugListCmp';

const DUMMY_BUG_REPORT_DATA = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '2',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '3',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '4',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '5',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '6',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '7',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '8',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '9',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
  {
    id: '10',
    title: 'Lorem ipsum dolor sit amet.',
    state: 'bug_report',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat, id ultrices neque venenatis. Integer ut aliquet odio, a feugiat augue. In tristique magna sit amet.',
  },
];

function UserBugReport() {
    return <CustomBugList DATA={DUMMY_BUG_REPORT_DATA} title={'Bug Reports'} count={'5k'} />;
}

export default UserBugReport;
