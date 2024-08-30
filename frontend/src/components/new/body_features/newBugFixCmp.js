import React from 'react';
import TextEditor from '../form/formCmp';

const NEW_BUG_REPORT_FORM_DATA = [
  {
    id: 'bug_fix',
    title: 'Create A Bug Fix',
    input_label: 'Title',
    input_id: 'bug_fix',
    input_name: 'bug_fix',
    input_placeholder: 'Enter Your Bug Fix Title Here',
    input_label_2: 'Solution',
    input_id_2: 'solution',
    input_name_2: 'solution',
  },
];

function NewBugFix() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewBugFix;
