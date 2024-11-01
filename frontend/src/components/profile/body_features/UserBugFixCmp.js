import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import CustomBugList from '../../custom/CustomBugListCmp';

function UserBugFix() {
  const { userBugFixesList } = useContext(ManagmentSystem);

  return (
    <CustomBugList
      DATA={userBugFixesList.data ? userBugFixesList.data : []}
      title={'Bug Fixes'}
      count={userBugFixesList.data.length}
    />
  );
}

export default UserBugFix;
