import axios from 'axios';

const PORT = 'http://172.20.10.6:3000';
const URL = PORT + '/api/v1/users/';

const signUpUrl = URL + 'signup';
const signInUrl = URL + 'signin';

export async function SignInHttp(email, username, password) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const data = username
    ? { username: username, password: password }
    : { email: email, password: password };

  try {
    const response = await axios.post(signInUrl, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function SignUpHttp(firstName, lastName, email, username, password, passwordConfirm) {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(
      signUpUrl,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
      },
      { headers }
    );

    return response;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
