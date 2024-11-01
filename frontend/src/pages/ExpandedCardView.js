import React from 'react';
import ExpandedBugFix from '../components/card_view/expanded/ExpandedBugFixCmp';
import ExpandedBugReport from '../components/card_view/expanded/ExpandedBugReportCmp';
import ExpandedReusableCode from '../components/card_view/expanded/ExpandedReusableCodeCmp';
import { useSearchParams, defer } from 'react-router-dom';
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

// async function LoadViewers({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   const postId = searchParams.get('postId');
//   const post = searchParams.get('post');
//   const token = getAuthToken();

//   if (!token) {
//     console.error('No token available');
//     return null;
//   }

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   let urlName;
//   post === 'bug_report'
//     ? (urlName = 'bug_reports')
//     : post === 'bug_fix'
//     ? (urlName = 'bug_fixes')
//     : (urlName = 'reusable_codes');

//   try {
//     const response = await axios.get(`${PORT}api/v1/${urlName}/${postId}/viewers`, { headers });
//     console.log('Success!!');
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching data:', error.response.data);
//     return null;
//   }
// }
// async function LoadDetails({ request }) {
//   const searchParams = new URL(request.url).searchParams;
//   const postId = searchParams.get('postId');
//   const post = searchParams.get('post');
//   const token = getAuthToken();

//   if (!token) {
//     console.error('No token available');
//     return null;
//   }

//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   let urlName;
//   post === 'bug_report'
//     ? (urlName = 'bug_reports')
//     : post === 'bug_fix'
//     ? (urlName = 'bug_fixes')
//     : (urlName = 'reusable_codes');

//   try {
//     const response = await axios.get(`${PORT}api/v1/${urlName}/${postId}`, { headers });
//     console.log('Success!!', response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error fetching data:', error.response.data);
//     return null;
//   }
// }

// export async function loader({ request }) {
//   return defer({
//     details: await LoadDetails(),
//     viewers: LoadViewers(),
//   });
// }

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
  const token = getAuthToken();
  const data = await request.formData();

  if (!token) {
    console.error('No token available');
    return [];
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  let userData = {};
  let route = '';

  if (data.get('block_reason')) {
    userData = { reason: data.get('block_reason') };
    route = 'block';
  } else if (data.get('report_reason')) {
    userData = { reason: data.get('report_reason') };
    route = 'report';
  }

  try {
    await axios.post(
      `${PORT}api/v1/users/${data.get('user_id')}/${route}`,
      { userData },
      { headers }
    );

    console.log('Success');
    window.location.reload();
  } catch (error) {
    console.error('Error performing this action on user:', error.response?.data || error.message);
  }
}
