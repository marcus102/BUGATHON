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

  const firstName = data.get('firstName');
  const lastName = data.get('lastName');
  const username = data.get('username');
  const telephone = data.get('telephone');
  const profession = data.get('profession');
  const location = data.get('location');
  const bio = data.get('bio');
  const link1 = data.get('link1');
  const link2 = data.get('link2');
  const link3 = data.get('link3');
  const link4 = data.get('link4');

  let userData;
  if (!data.get('email')) {
    userData = {};
    if (firstName !== '') userData.firstName = firstName;
    if (lastName !== '') userData.lastName = lastName;
    if (username !== '') userData.username = username;
    if (telephone !== '') userData.phone = telephone;
    if (profession !== '') userData.profession = profession;
    if (location !== '') userData.location = location;
    if (bio !== '') userData.bio = bio;
    if (link1 !== '') userData.link1 = link1;
    if (link2 !== '') userData.link2 = link2;
    if (link3 !== '') userData.link3 = link3;
    if (link4 !== '') userData.link4 = link4;
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
