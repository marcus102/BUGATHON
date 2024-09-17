import React from 'react';
import ExpandedBugFix from '../components/card_view/expanded/ExpandedBugFixCmp';
import ExpandedBugReport from '../components/card_view/expanded/ExpandedBugReportCmp';
import ExpandedReusableCode from '../components/card_view/expanded/ExpandedReusableCodeCmp';
import { useSearchParams } from 'react-router-dom';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';

function ExpandedCardView() {
  const [searchParams] = useSearchParams();
  const current_post = searchParams.get('post');
  return (
    <>
      {current_post === 'bug_report' && <ExpandedBugReport />}
      {current_post === 'bug_fix' && <ExpandedBugFix />}
      {current_post === 'reusable_code' && <ExpandedReusableCode />}
    </>
  );
}

export default ExpandedCardView;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const postId = searchParams.get('postId');
  const post = searchParams.get('post');
  const token = getAuthToken();

  if (!token) {
    console.error('No token available');
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  let urlName;
  post === 'bug_report'
    ? (urlName = 'bug_reports')
    : post === 'bug_fix'
    ? (urlName = 'bug_fixes')
    : (urlName = 'reusable_codes');

  try {
    const response = await axios.get(`${PORT}api/v1/${urlName}/${postId}`, { headers });
    console.log('Success!!', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
    return null;
  }
}

export async function action({ request }) {
  const formData = await request.formData();
  console.log(formData);
}
