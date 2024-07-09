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
      { id: '1', icon: faB, tooltipmessage: 'Bold', next: null },
      { id: '2', icon: faItalic, tooltipmessage: 'Italic', next: null },
      { id: '3', icon: faUnderline, tooltipmessage: 'Underline', next: null },
      { id: '4', icon: faHighlighter, tooltipmessage: 'Highlight Text', next: null },
      { id: '5', icon: faCode, tooltipmessage: 'Block Code', next: null },
      { id: '6', icon: faFaceSmile, tooltipmessage: 'Emoji', next: null },
      { id: '7', icon: faPaperclip, tooltipmessage: 'Attachment', next: null },
      { id: '8', icon: faListOl, tooltipmessage: 'Ordered List', next: null },
      { id: '9', icon: faAlignLeft, tooltipmessage: 'Left', next: faAlignCenter },
      { id: '10', icon: faAlignCenter, tooltipmessage: 'Center', next: faAlignRight },
      { id: '11', icon: faAlignRight, tooltipmessage: 'Right', next: faAlignJustify },
      { id: '12', icon: faAlignJustify, tooltipmessage: 'Justify', next: faAlignLeft },
      { id: '13', icon: faRotateLeft, tooltipmessage: 'Previous' },
      { id: '14', icon: faRotateRight, tooltipmessage: 'Next' },
    ],
    editor_placeholder: 'Description',
    options: null,
    check_box: 'By proceeding with this action, you are consenting to abide by our',
    check_box_link: 'terms & conditions.',
    button: 'Submit',
  },
];

function NewReusableCode() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewReusableCode;
