import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './AdminDashBoardCmp.module.css';
import Text from '../../../utils/TextSection';
import UserProfileHeader from '../../userProfileHeaderCmp';
import Line from '../../../utils/LineSection';
import { IconTextButton } from '../../../utils/ButtonSection';
import {
  faBan,
  faChartSimple,
  faChevronDown,
  faSquareCheck,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { CheckBox } from '../../../utils/InputSection';

const AdminDashBoard = () => {
  const { usersList } = useContext(ManagmentSystem);
  const [isExpanded, setIsExpnaded] = useState(
    usersList.data &&
      usersList.data.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {})
  );

  const admins_list = usersList.data.filter((admins) => admins.role === 'admin');
  const moderators_list = usersList.data.filter((moderators) => moderators.role === 'moderator');
  const collaborators_list = usersList.data.filter(
    (collaborators) => collaborators.role === 'collaborator'
  );
  const blocled_users_list = usersList.data.filter(
    (blocled_users) => blocled_users.acountSatus === 'banned'
  );
  const reported_users_list = usersList.data.filter(
    (reported_users) => reported_users.reportCount > 0
  );
  const deleted_accounts_list = usersList.data.filter(
    (deleted_accounts) => deleted_accounts.active === false
  );

  const ADMIN_DASHBOARD = [
    { id: '1', title: 'All Users', children: usersList.data, count: usersList.data.length },
    { id: '2', title: 'Admins', children: admins_list, count: admins_list.length },
    { id: '3', title: 'Moderators', children: moderators_list, count: moderators_list.length },
    {
      id: '4',
      title: 'Collaborators',
      children: collaborators_list,
      count: collaborators_list.length,
    },
    {
      id: '5',
      title: 'Blocked Users',
      children: blocled_users_list,
      count: blocled_users_list.length,
    },
    {
      id: '6',
      title: 'Reported Users',
      children: reported_users_list,
      count: reported_users_list.length,
    },
    {
      id: '7',
      title: 'Deleted Accounts',
      children: deleted_accounts_list,
      count: deleted_accounts_list.length,
    },
  ];

  const USER_LIST_OPTIONS = [
    { id: '1.1', label: 'Slect All', icon: faSquareCheck },
    { id: '1.2', label: 'Analytics', icon: faChartSimple },
    { id: '1.3', label: 'Block', icon: faBan },
    { id: '1.4', label: 'Delete', icon: faTrashCan },
  ];

  return (
    <div className={classes.main_container}>
      <Text textStyle={classes.text_style} h6={'Admin Dashboard'} />
      <Line direction={'horizontal'} />
      <div className={classes.options_container}>
        {USER_LIST_OPTIONS.map((option, index) => (
          <IconTextButton key={`${option.id}-${index}`} label={option.label} icon={option.icon} />
        ))}
      </div>
      <Line direction={'horizontal'} />

      {ADMIN_DASHBOARD.length > 0 ? (
        ADMIN_DASHBOARD.map((data, index) => (
          <div className={classes.users_list_style} key={`${data.id}-${index}`}>
            <IconTextButton
              inconTextButtonStyle={classes.title_style}
              unwrap={true}
              label={`${data.title} | ${data.count} |`}
              icon_={faChevronDown}
              onClick={() =>
                setIsExpnaded((prev) => ({
                  ...prev,
                  [data.id]: !prev[data.id],
                }))
              }
            />
            {isExpanded[data.id] && (
              <div className={classes.user_container}>
                {data.children.length > 0 ? (
                  data.children.map((user, index) => (
                    <div className={classes.profile_container} key={`${user.id}-${index}`}>
                      <CheckBox />
                      <UserProfileHeader
                        firstName={user?.firstName}
                        lastName={user?.lastName}
                        role={user?.role}
                        username={user?.username}
                        profession={user?.profession}
                        hideFollow={true}
                        profileImg={user?.profile}
                        followersCount={user?.followersCount}
                        followingCount={user?.followingCount}
                        starCount={user?.starCount}
                      />
                    </div>
                  ))
                ) : (
                  <Text h5={'No user found'} />
                )}
              </div>
            )}
            <Line direction={'horizontal'} />
          </div>
        ))
      ) : (
        <Text h5={'No user found'} />
      )}
    </div>
  );
};

export default AdminDashBoard;
