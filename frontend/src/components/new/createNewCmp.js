import React, { useContext } from 'react';
import { ManagmentSystem } from '../../store/AppGeneralManagmentSystem';
import classes from './createNewCmp.module.css';
import NewBugReport from './body_features/newBugReportCmp';
import NewBugFix from './body_features/newBugFixCmp';
import NewReusableCode from './body_features/newReusableCodeCmp';
import { DynamicLabelDropdownMenu } from '../../utils/ButtonSection';
import { IconTextButton } from '../../utils/ButtonSection';
import { faBug, faBugSlash, faChevronDown, faCode, faEye } from '@fortawesome/free-solid-svg-icons';
import Line from '../../utils/LineSection';

const OPTIONS_DATA = [
  { id: '1', label: 'Bug Report', icon: faBug },
  { id: '2', label: 'Bug Fix', icon: faBugSlash },
  { id: '3', label: 'Reusable Code', icon: faCode },
];

function CreateNew() {
  const { dropDownDefault } = useContext(ManagmentSystem);
  const { create_new } = dropDownDefault;

  return (
    <div className={classes.main_container}>
      <div className={classes.button_container}>
        <DynamicLabelDropdownMenu
          dropDownMenuStyle={classes.dropdown_menu}
          buttonLabel={create_new}
          buttonIcon={faChevronDown}
          menuItems={OPTIONS_DATA}
          my_key={'create_new'}
        />
        <IconTextButton
          inconTextButtonStyle={classes.icon_text_button}
          icon={faEye}
          label={'Preview'}
        />
      </div>
      <Line />
      {create_new === 'Bug Report' && <NewBugReport />}
      {create_new === 'Bug Fix' && <NewBugFix />}
      {create_new === 'Reusable Code' && <NewReusableCode />}
    </div>
  );
}

export default CreateNew;
