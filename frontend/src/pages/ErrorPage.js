import { useRouteError } from 'react-router-dom';
import Text from '../utils/TextSection';

// import PageContent from '../components/PageContent';

function Error() {
//   const error = useRouteError();

//   let title = 'An error occurred!';
//   let message = 'Something went wrong!';

//   if (error.status === 500) {
//     message = error.data.message;
//   }

//   if (error.status === 404) {
//     title = 'Not found!';
//     message = 'Could not find resource or page.';
//   }

  return (
    <>
      {/* <PageContent title={title}>
        <p>{message}</p>
      </PageContent> */}
      <Text h1={'hey'}/>
    </>
  );
}

export default Error;
