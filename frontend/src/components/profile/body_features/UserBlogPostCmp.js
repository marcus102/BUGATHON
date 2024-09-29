import React, { useContext } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import CustomBugList from '../../custom/CustomBugListCmp';

function UserBlogPost() {
  const { userBlogPostsList } = useContext(ManagmentSystem);
  return (
    <CustomBugList
      DATA={userBlogPostsList.data}
      title={'Blog Posts'}
      count={userBlogPostsList.data.length}
    />
  );
}

export default UserBlogPost;
