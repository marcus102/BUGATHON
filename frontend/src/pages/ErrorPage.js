import { useRouteError } from 'react-router-dom';

import ErrorContent from '../components/error/errorContentCmp';

function Error() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    title = 'Internal server error!';
    message = error.data.message;
  }
  if (error.status === 401 || error.status === 405) {
    title = 'Unauthorized!';
    message = 'You are not authorized to access this resource.';
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return <ErrorContent title={title}>{message}</ErrorContent>;
}

export default Error;
