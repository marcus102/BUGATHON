import React from 'react';
import Settings from '../components/settings/settingsCmp';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';
// import { link } from '../../../backend/app';

function SettingsPage() {
  return <Settings />;
}

export default SettingsPage;

export async function action({ request }) {
  const data = await request.formData();
  const token = getAuthToken();

  if (!token) {
    console.error('No token available');
    return null;
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  let userData;
  if (!data.get('email')) {
    userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      professions: [data.get('profession')],
      location: data.get('location'),
      bio: data.get('bio'),
      links: [data.get('link1'), data.get('link2'), data.get('link3'), data.get('link4')],
    };
  } else {
    userData = {
      email: {
        address: data.get('email'),
        visibility: data.get('visibility'),
      },
    };
  }

  try {
    const response = await axios.patch(`${PORT}api/v1/users/updateMe`, userData, {
      headers,
    });
    console.log('Success!!');
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error.response.data);
    return null;
  }
}
