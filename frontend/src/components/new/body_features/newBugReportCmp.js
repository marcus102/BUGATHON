import React from 'react';
import {
  faUnderline,
  faItalic,
  faB,
  faCode,
  faFaceSmile,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faRotateLeft,
  faRotateRight,
  faHighlighter,
  faPaperclip,
  faListOl,
} from '@fortawesome/free-solid-svg-icons';

import { TextEditor } from '../../../utils/InputSection';

const NEW_BUG_REPORT_FORM_DATA = [
  {
    id: 'bug_report',
    title: 'Create A Bug Report',
    input_label: 'Title',
    input_placeholder: 'Enter Your Bug Report Title Here',
    children: [
      {
        id: '1',
        label: 'Description',
      },
      {
        id: '2',
        label: 'Code Base',
      },
      {
        id: '3',
        label: 'Bug Report',
      },
      {
        id: '4',
        label: 'Steps To Reproduce',
      },
      {
        id: '5',
        label: 'Expected Behavior',
      },
      {
        id: '6',
        label: 'Expected Behavior',
      },
    ],
    icon_buttons: [
      { id: '1', icon: faB, next: null },
      { id: '2', icon: faItalic, next: null },
      { id: '3', icon: faUnderline, next: null },
      { id: '4', icon: faHighlighter, next: null },
      { id: '5', icon: faCode, next: null },
      { id: '6', icon: faFaceSmile, next: null },
      { id: '7', icon: faPaperclip, next: null },
      { id: '8', icon: faListOl, next: null },
      { id: '9', icon: faAlignLeft, next: faAlignCenter },
      { id: '10', icon: faAlignCenter, next: faAlignRight },
      { id: '11', icon: faAlignRight, next: faAlignJustify },
      { id: '12', icon: faAlignJustify, next: faAlignLeft },
      { id: '13', icon: faRotateLeft, next: null },
      { id: '14', icon: faRotateRight, next: null },
    ],
    editor_placeholder: 'Description',
    options: [
      {
        id: '1',
        title: 'Browser (optional)',
        label: 'Chrome',
        menu: [
          { id: '1', label: 'Chrome' },
          { id: '2', label: 'Edge' },
          { id: '3', label: 'Brave' },
          { id: '4', label: 'FireFox' },
          { id: '5', label: 'Opera' },
        ],
      },
      {
        id: '2',
        title: 'Device(s) (optional)',
        label: 'Desktop',
        menu: [
          { id: '1', label: 'Desktop' },
          { id: '2', label: 'Modile' },
          { id: '3', label: 'Other' },
        ],
      },
      {
        id: '3',
        title: 'Severity (optional)',
        label: 'Medium',
        menu: [
          { id: '1', label: 'High' },
          { id: '2', label: 'Medium' },
          { id: '3', label: 'Low' },
        ],
      },
    ],
    check_box: 'By taking this action, you agree to our',
    check_box_link: 'terms & conditions.',
    button: 'Submit',
  },
];

function NewBugReport() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewBugReport;
