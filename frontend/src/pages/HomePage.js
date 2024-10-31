import React from 'react';
import classes from './HomePage.module.css';
import HomeWindow from '../components/home_window/HomeWindowCmp';
import { getAuthToken } from '../utils/authSection';
import axios from 'axios';
import { PORT } from '../http_requests/authentication';

function HomePage() {
  return (
    <div className={classes.home_main_container}>
      <HomeWindow />
    </div>
  );
}

export default HomePage;

export async function loader({ request }) {
  const token = getAuthToken();

  if (!token) {
    console.error('No token available');
    return [];
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const response1 = await axios.get(`${PORT}api/v1/bug_reports?page=1&limit=5`, { headers });
    const response2 = await axios.get(`${PORT}api/v1/bug_fixes?page=1&limit=5`, { headers });
    const response3 = await axios.get(`${PORT}api/v1/reusable_codes?page=1&limit=5`, { headers });

    const allData = [];

    // Add non-empty response data to the array
    if (response1.data.data.length > 0) {
      allData.push(...response1.data.data);
    }
    if (response2.data.data.length > 0) {
      allData.push(...response2.data.data);
    }
    if (response3.data.data.length > 0) {
      allData.push(...response3.data.data);
    }

    if (allData.length === 0) {
      console.log('No data available');
      return [];
    }

    // Shuffle the combined array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledData = shuffleArray(allData);

    console.log('Success', shuffledData);

    return shuffledData;
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    return [];
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
    await axios.post(`${PORT}api/v1/users/${data.get('user_id')}/${route}`, userData, { headers });
    window.location.reload();
    console.log('Success');
  } catch (error) {
    console.error('Error performing this action on user:', error.response?.data || error.message);
  }
}
