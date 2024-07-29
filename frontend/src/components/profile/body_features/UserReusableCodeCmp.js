import React from 'react';
// import classes from './UserReusableCodeCmp.module.css';
import CustomBugList from '../../custom/CustomBugListCmp';
import { DUMMY_REUSABLE_CODE_DATA } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

const filterDataByUser = (data, username) => {
  return data.filter((item) => item.user === username);
};

function UserReusableCode() {
  const [searchParams] = useSearchParams();
  const currentUsername = searchParams.get('username');

  const currentUserReusableCodes = filterDataByUser(DUMMY_REUSABLE_CODE_DATA, currentUsername);
  return (
    <CustomBugList
      DATA={currentUserReusableCodes}
      title={'Reusable Code'}
      count={currentUserReusableCodes.length}
    />
  );
}

export default UserReusableCode;
