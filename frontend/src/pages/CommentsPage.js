import React from 'react';
import CommentSection from '../components/comment/CommentSectionCmp';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';

function CommentsPage() {
  return <CommentSection />;
}

export default CommentsPage;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const post = searchParams.get('post');
  const postId = searchParams.get('postId');

  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    let URL;

    if (post === 'bug_report') {
      URL = 'bugReport';
    } else if (post === 'bug_fix') {
      URL = 'bugFix';
    } else {
      URL = 'reusableCode';
    }
    const response = await axios.get(`${PORT}api/v1/comments/?${URL}=${postId}`, { headers });
    console.log('Success!! from loader', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error.response.data);
    return [];
  }
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const post = searchParams.get('post');
  const postId = searchParams.get('postId');
  const data = await request.formData();

  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  console.log('comment', data.get('comment'));

  try {
    let response;
    let URL;
    post === 'bug_report'
      ? (URL = 'bug_reports')
      : post === 'bug_fix'
      ? (URL = 'bug_fixes')
      : (URL = 'reusable_codes');

    if (data.get('comment')) {
      response = await axios.post(
        `${PORT}api/v1/${URL}/${postId}/comments`,
        {
          comment: data.get('comment'),
        },
        { headers }
      );
    } else if (data.get('reply')) {
      const id = data.get('replyId');
      response = await axios.post(
        `${PORT}api/v1/comments/${id}`,
        {
          comment: data.get('reply'),
        },
        { headers }
      );
    }

    console.log('Success comment!! from action', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error creating comments:', error.response.data);
    return [];
  }
}
