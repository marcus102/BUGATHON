import React from 'react';
import TextEditor from '../form/formCmp';

const NEW_BUG_REPORT_FORM_DATA = [
  {
    id: 'bug_report',
    title: 'Create A Bug Report',
    input_label: 'Title',
    input_id: 'bug_report',
    input_name: 'bug_report',
    input_placeholder: 'Enter Your Bug Report Title Here',
    input_label_2: 'Description',
    input_id_2: 'description',
    input_name_2: 'description',
  },
];

function NewBugReport() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewBugReport;
