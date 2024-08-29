import React from 'react';
import CreateNew from '../components/new/createNewCmp';
import NewBugReport from '../components/new/body_features/newBugReportCmp';
import NewBugFix from '../components/new/body_features/newBugFixCmp';
import NewReusableCode from '../components/new/body_features/newReusableCodeCmp';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../http_requests/authentication';
import { json, redirect } from 'react-router-dom';
import { getAuthToken } from '../utils/authSection';

function CreatePage() {
  const [searchParams] = useSearchParams();
  const post_type = searchParams.get('type');
  return (
    <CreateNew>
      {post_type === 'bug_report' && <NewBugReport />}
      {post_type === 'bug_fix' && <NewBugFix />}
      {post_type === 'reusable_code' && <NewReusableCode />}
    </CreateNew>
  );
}

export default CreatePage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const type = searchParams.get('type');
  const token = getAuthToken();
  const data = await request.formData();

  if (type !== 'bug_report' && type !== 'bug_fix' && type !== 'reusable_code') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  let route;
  let userData;
  if (type === 'bug_report') {
    route = 'bug_reports';
    userData = {
      title: data.get('bug_report'),
      description: data.get('description'),
    };
  } else if (type === 'bug_fix') {
    route = 'bug_fixes';
    userData = {
      title: data.get('bug_fix'),
      soloution: data.get('solution'),
    };
  } else if (type === 'reusable_code') {
    route = 'reusable_codes';
    userData = {
      title: data.get('reusable_code'),
      description: data.get('description'),
    };
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  console.log('userData', userData);

  try {
    await axios.post(`${PORT}api/v1/${route}`, userData, {
      headers,
    });
    console.log('Success!!');

    return redirect('/');
  } catch (error) {
    console.error('Error creating post:', error.response.data);
    return null;
  }
}
