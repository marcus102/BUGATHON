import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import CustomBugList from '../../custom/CustomBugListCmp';

function UserReusableCode() {
  const { userReusableCodesList } = useContext(ManagmentSystem);

  return (
    <CustomBugList
      DATA={userReusableCodesList.data ? userReusableCodesList.data : []}
      title={'Reusable Code'}
      count={userReusableCodesList.data.length}
    />
  );
}

export default UserReusableCode;
