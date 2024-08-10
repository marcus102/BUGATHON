import { redirect } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../http_requests/authentication';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}

export async function fetchDataLoader() {
  const token = getAuthToken();

  if (!token) {
    console.error('No token available');
    return null;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${PORT}api/v1/users/me`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch user data.');
  }
}
