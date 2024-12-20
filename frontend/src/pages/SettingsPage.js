import React from 'react';
import Settings from '../components/settings/settingsCmp';
import { getAuthToken } from '../utils/authSection';
import { PORT } from '../http_requests/authentication';
import axios from 'axios';
import { redirect } from 'react-router-dom';

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
  let route;

  if (data.get('currentPassword')) {
    userData = {
      passwordCurent: data.get('currentPassword'),
      password: data.get('newPassword'),
      passwordConfirm: data.get('confirmPassword'),
    };
    route = 'updateMyPassword';
  } else if (data.get('firstName')) {
    route = 'updateMe';
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
  } else if (data.get('email')) {
    userData = {
      email: {
        address: data.get('visibility'),
        visibility: data.get('visibility'),
      },
    };
    route = 'updateMe';
  } else if (data.get('block_id')) {
    route = 'unblock';
    userData = {};
  } else {
    userData = {};
    route = 'deleteMe';
  }

  try {
    let response;

    if (route === 'unblock') {
      response = await axios.delete(
        `${PORT}api/v1/blocked_users/${data.get('block_id')}/${route}`,
        {
          headers,
        }
      );
    } else {
      response = await axios.patch(`${PORT}api/v1/users/${route}`, userData, {
        headers,
      });
    }

    console.log('Success!!');
    if (route === 'updateMyPassword') {
      return redirect('/auth?mode=signin');
    } else if (route === 'deleteMe') {
      return redirect('/auth?mode=signup');
    }
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error.response.data);
    return null;
  }
}

export async function loader() {
  const token = getAuthToken();
  if (!token) {
    console.error('No token available');
    return null;
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${PORT}api/v1/blocked_users`, { headers });
    console.log('Success!!');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response.data);
    return null;
  }
}
