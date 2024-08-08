import React from 'react';
// import { SignInHttp, SignUpHttp } from '../http_requests/authentication';
import { json, redirect } from 'react-router-dom';
import axios from 'axios';
import { PORT } from '../http_requests/authentication';

import Authentication from '../components/authentication/AuthCmp';

function AuthenticationPage() {
  return <Authentication />;
}

export default AuthenticationPage;

/////////////////////////////////////////////

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

  try {
    let response;

    if (mode === 'signin') {
      const authData = {
        email: data.get('email'),
        username: data.get('username'),
        password: data.get('password'),
      };

      const formData = authData.username
        ? { username: authData.username, password: authData.password }
        : { email: authData.email, password: authData.password };

      response = await axios.post(`${PORT}api/v1/users/${mode}`, formData, {
        headers,
      });
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

      response = await axios.post(
        `${PORT}api/v1/users/${mode}`,
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
    }
    // Retrieve the token from the response
    const token = response.data.token;

    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Set the expiration to 30 days
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 30); // Add 30 days
    localStorage.setItem('expiration', expiration.toISOString());
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }

  return redirect('/');
}
