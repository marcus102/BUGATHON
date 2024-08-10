import axios from 'axios';
import { PORT } from './authentication';

// Generic function for file upload
async function uploadFile(token, file, endpoint, method) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios({
      url: `${PORT}${endpoint}`,
      method: method,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.newImage;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

// Create profile
export async function createProfile(token, file) {
  return uploadFile(token, file, 'api/v1/users/profile', 'post');
}

// Edit profile
export async function editProfile(token, file) {
  return uploadFile(token, file, 'api/v1/users/profile', 'patch');
}
