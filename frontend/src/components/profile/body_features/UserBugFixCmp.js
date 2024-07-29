import React from 'react';
// import classes from './UserBugFixCmp.module.css';
import CustomBugList from '../../custom/CustomBugListCmp';
import { DUMMY_BUG_FIX_DATA } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

const filterDataByUser = (data, username) => {
  return data.filter((item) => item.user === username);
};

function UserBugFix() {
  const [searchParams] = useSearchParams();
  const currentUsername = searchParams.get('username');

  const currentUserBugFixes = filterDataByUser(DUMMY_BUG_FIX_DATA, currentUsername);

  return (
    <CustomBugList
      DATA={currentUserBugFixes}
      title={'Bug Fixes'}
      count={currentUserBugFixes.length}
    />
  );
}

export default UserBugFix;
