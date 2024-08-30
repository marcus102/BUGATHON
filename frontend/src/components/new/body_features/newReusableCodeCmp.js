import React from 'react';
import TextEditor from '../form/formCmp';

const NEW_BUG_REPORT_FORM_DATA = [
  {
    id: 'reusable_code',
    title: 'Create A Reusable Code',
    input_label: 'Title',
    input_id: 'reusable_code',
    input_name: 'reusable_code',
    input_placeholder: 'Enter Your Reusable Code Title Here',
    input_label_2: 'Description',
    input_id_2: 'description',
    input_name_2: 'description',
  },
];

function NewReusableCode() {
  return <TextEditor META_DATA={NEW_BUG_REPORT_FORM_DATA} />;
}

export default NewReusableCode;
