import axios from 'axios';
import { PORT } from './authentication';

export async function createProfile(token, file) {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${PORT}api/v1/users/profile`, formData, {
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
