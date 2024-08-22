import React, { useContext, useState } from 'react';
import { ManagmentSystem } from '../../../store/AppGeneralManagmentSystem';
import classes from './AdminDashBoardCmp.module.css';
import Text from '../../../utils/TextSection';
import UserProfileHeader from '../../userProfileHeaderCmp';
import Line from '../../../utils/LineSection';
import { IconTextButton } from '../../../utils/ButtonSection';
import { faBan, faChartSimple, faChevronDown, faSquareCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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

  const ADMIN_DASHBOARD = [
    { id: '1', title: 'All Users', children: usersList.data, count: usersList.data.length },
    { id: '2', title: 'Admins', children: usersList.data, count: usersList.data.length },
    { id: '3', title: 'Moderators', children: usersList.data, count: usersList.data.length },
    { id: '4', title: 'Collaborators', children: usersList.data, count: usersList.data.length },
    { id: '5', title: 'Blocked Users', children: [], count: usersList.data.length },
    { id: '6', title: 'Reported Users', children: usersList.data, count: usersList.data.length },
    { id: '7', title: 'Deleted Accounts', children: usersList.data, count: usersList.data.length },
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
