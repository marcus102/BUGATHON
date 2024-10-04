import React from 'react';
import Profile from '../components/profile/ProfileCmp';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';

function ProfilePage() {
  return <Profile />;
}

export default ProfilePage;

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const userId = searchParams.get('userId');

  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${PORT}api/v1/users/${userId}`, { headers });
    console.log('Success!!', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching comments:', error.response.data);
    return [];
  }
}
