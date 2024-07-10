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
    title: 'Create A Reusable Code',
    input_label: 'Title',
    input_placeholder: 'Enter Your Reusable Code Title Here',
    children: [
      {
        id: '1',
        label: 'Description',
      },
      {
        id: '2',
        label: 'Reusable Code',
      },
      {
        id: '3',
        label: 'Acghieved Result',
      },
      {
        id: '4',
        label: 'Usage Guideline',
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
    options: null,
    check_box: 'By taking this action, you agree to our',
    check_box_link: 'terms & conditions.',
    button: 'Submit',
  },
];

function NewReusableCode() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewReusableCode;
