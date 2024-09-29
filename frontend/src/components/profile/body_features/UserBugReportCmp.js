import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import CustomBugList from '../../custom/CustomBugListCmp';

function UserBugReport() {
  const { userBugReportsList } = useContext(ManagmentSystem);

  return (
    <CustomBugList
      DATA={userBugReportsList.data ? userBugReportsList.data : []}
      title={'Bug Reports'}
      count={userBugReportsList.data.length}
    />
  );
}

export default UserBugReport;
