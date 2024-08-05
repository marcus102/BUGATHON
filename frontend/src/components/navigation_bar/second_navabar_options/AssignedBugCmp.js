import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
// import classes from './AssignedBugCmp.module.css';
import Colors from '../../../constants/colors';
import {
  faThumbTack,
  faArrowUpFromBracket,
  faTrashCan,
  faExclamation,
  faCaretRight,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import profile_1 from '../../../assets/images/study.jpg';
import profile_2 from '../../../assets/images/people.jpg';
import CustomMenu from '../../custom/CustomMenuCmp';
import { DUMMY_BUG_REPORT_DATA, DUMMY_USERS } from '../../../data/Database';

const DUMMY_ASSIGNED_BUG = [
  {
    id: '1',
    profile: profile_1,
    profile_2: profile_2,
    title: 'Bug report assigned to you by @leyla 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat. Mauris eleifend eros id metus volutpat',
    tag: 'Critical',
    type: 'submited',
  },
  {
    id: '2',
    profile: profile_2,
    profile_2: profile_1,
    title: 'Bug report assigned to you by @ben 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    tag: 'Pending',
    type: 'received',
  },
  {
    id: '3',
    profile: profile_1,
    profile_2: profile_2,
    title: 'Bug report assigned to you by @leyla 1mn ago',
    notification:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend eros id metus volutpat',
    tag: 'Stable',
    type: 'received',
  },
];

const ASSIGNMENT_BUG_BUTTON = [
  { id: '1', button_label: 'Yes I Will' },
  { id: '2', button_label: 'I Will Do It Later' },
  { id: '3', button_label: 'No I Am Busy' },
];

const ASSIGNMENT_REACTIONS_DATA = [
  { id: 'like', icon: faHeart, active_color: Colors.red_FF2B2B },
  { id: 'pin', icon: faThumbTack, active_color: Colors.yellow_ },
  { id: 'share', icon: faArrowUpFromBracket, active_color: Colors.green_039000 },
];

const ASSIGNMENT_DROP_DOWN = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Pinned' },
  { id: '3', label: 'For Me' },
  { id: '4', label: 'For others' },
  { id: '5', label: 'Critical' },
  { id: '6', label: 'Relevant' },
  { id: '7', label: 'Oldest' },
  { id: '8', label: 'Recent' },
];

const ASSIGNMENT_OPTION = [
  { id: '1', icon: faThumbTack, label: 'Pin', icon_2: null },
  { id: '2', icon: faHeart, label: 'Like', icon_2: null },
  { id: '3', icon: faArrowUpFromBracket, label: 'Share', icon_2: null },
  { id: '4', icon: faTrashCan, label: 'Remove this bug assignment', icon_2: null },
  { id: '5', icon: faExclamation, label: 'Report (users only)', icon_2: faCaretRight },
];

function AssignedBug() {
  const { dropDownDefault } = useContext(ManagmentSystem);
  const { assigned_bug } = dropDownDefault;

  const assignedBugsReports = DUMMY_BUG_REPORT_DATA.filter((bugReport) =>
    bugReport.assignedTo.some((assignee) => assignee.username === DUMMY_USERS[0].username)
  );

  return (
    <>
      <CustomMenu
        title={'Assigned Bugs'}
        dropDown={ASSIGNMENT_DROP_DOWN}
        METADATA={DUMMY_ASSIGNED_BUG}
        option={ASSIGNMENT_OPTION}
        button={ASSIGNMENT_BUG_BUTTON}
        reactionData={ASSIGNMENT_REACTIONS_DATA}
        solidButtonDataType={'received'}
        emptyContentLabel={'No Assigned Bugs'}
        buttonLabel={assigned_bug}
        my_key={'assigned_bug'}
      />
    </>
  );
}

export default AssignedBug;
