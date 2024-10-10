import { useRouteError, redirect } from 'react-router-dom';
import Text from '../utils/TextSection';

import ErrorContent from '../components/error/errorContentCmp';
import { getAuthToken } from '../utils/authSection';

function Error() {
  const error = useRouteError();
  const token = getAuthToken();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  // if (!token) {
  //   redirect('/auth?mode=signin')
  // }

  return <ErrorContent title={title}>{message}</ErrorContent>;
}

export default Error;
