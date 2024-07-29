import React from 'react';
// import classes from './UserBugReportCmp.module.css';
import CustomBugList from '../../custom/CustomBugListCmp';
import { DUMMY_BUG_REPORT_DATA } from '../../../data/Database';
import { useSearchParams } from 'react-router-dom';

const filterDataByUser = (data, username) => {
  return data.filter((item) => item.user === username);
};

function UserBugReport() {
  const [searchParams] = useSearchParams();
  const currentUsername = searchParams.get('username');

  const currentUserBugReports = filterDataByUser(DUMMY_BUG_REPORT_DATA, currentUsername);
  return (
    <CustomBugList
      DATA={currentUserBugReports}
      title={'Bug Reports'}
      count={currentUserBugReports.length}
    />
  );
}

export default UserBugReport;
