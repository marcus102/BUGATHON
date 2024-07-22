import React from 'react';
import { SignInHttp, SignUpHttp } from '../http_requests/authentication';
import { json } from 'react-router-dom';
import axios from 'axios';

import Authentication from '../components/authentication/AuthCmp';

function AuthenticationPage() {
  return <Authentication />;
}

export default AuthenticationPage;

/////////////////////////////////////////////

const PORT = 'http://172.20.10.6:3000';

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'signin' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (mode === 'signin') {
    const authData = {
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
    };

    const formData = authData.username
      ? { username: authData.username, password: authData.password }
      : { email: authData.email, password: authData.password };

    try {
      const response = await axios.post(`${PORT}${'/api/v1/users/'}${mode}`, formData, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  if (mode === 'signup') {
    const authData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      username: data.get('username'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm'),
    };

    try {
      const response = await axios.post(
        `${PORT}${'/api/v1/users/'}${mode}`,
        {
          firstName: authData.firstName,
          lastName: authData.lastName,
          email: authData.email,
          username: authData.username,
          password: authData.password,
          passwordConfirm: authData.passwordConfirm,
        },
        { headers }
      );

      return response;
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}
