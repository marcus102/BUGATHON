import React, { useState } from 'react';
import classes from './newBugReportCmp.module.css';
import Text from '../../../utils/TextSection';
import { Input, CheckBox, TextArea } from '../../../utils/InputSection';
import {
  PlaneButton,
  DynamicLabelDropdownMenu,
  SolidButton,
  IconButton,
} from '../../../utils/ButtonSection';
import Link from '../../../utils/LinkSection';
import {
  faUnderline,
  faI,
  faItalic,
  faB,
  faCode,
  faFaceSmile,
  faImage,
  faLink,
  faArrowUpFromBracket,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faList,
  faRotateLeft,
  faRotateRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import ToolTip from '../../../utils/toolTipSection';
import { HorizontalScrollView } from '../../../utils/ScrollViewsSection';

const NEW_BUG_REPORT_FORM_DATA = [
  {
    id: 'bug_report',
    title: 'Create A Bug Report',
    input_label: 'Title',
    input_placeholder: 'Enter Your Bug Report Title Here',
    children: [
      {
        id: '1',
        label: 'description',
      },
      {
        id: '2',
        label: 'Code Base',
      },
      {
        id: '3',
        label: 'Bug Report',
      },
      {
        id: '4',
        label: 'Steps To Reproduce',
      },
      {
        id: '5',
        label: 'Expected Behavior',
      },
      {
        id: '6',
        label: 'Expected Behavior',
      },
    ],
    icon_buttons: [
      { id: '1', icon: faB, tooltipmessage: 'Bold', next: null },
      { id: '2', icon: faItalic, tooltipmessage: 'Italic', next: null },
      { id: '3', icon: faCode, tooltipmessage: 'Code', next: null },
      { id: '4', icon: faFaceSmile, tooltipmessage: 'Emoji', next: null },
      { id: '5', icon: faImage, tooltipmessage: 'Image', next: null },
      { id: '6', icon: faLink, tooltipmessage: 'Link', next: null },
      { id: '7', icon: faArrowUpFromBracket, tooltipmessage: 'Attachment', next: null },
      { id: '8', icon: faList, tooltipmessage: 'List', next: null },
      { id: '9', icon: faAlignLeft, tooltipmessage: 'Left', next: faAlignCenter },
      { id: '10', icon: faAlignCenter, tooltipmessage: 'Center', next: faAlignRight },
      { id: '11', icon: faAlignRight, tooltipmessage: 'Right', next: faAlignJustify },
      { id: '12', icon: faAlignJustify, tooltipmessage: 'Justify', next: faAlignLeft },
      { id: '13', icon: faRotateLeft, tooltipmessage: 'Previous' },
      { id: '14', icon: faRotateRight, tooltipmessage: 'Next' },
    ],
    textArea_placeholder: 'Description',
    options: [
      {
        id: '1',
        title: 'Browser (optional)',
        label: 'Option 1',
        menu: [
          { id: '1', label: 'Option 1' },
          { id: '2', label: 'Option 2' },
          { id: '3', label: 'Option 3' },
        ],
      },
      {
        id: '2',
        title: 'Device(s) (optional)',
        label: 'Option 1',
        menu: [
          { id: '1', label: 'Option 1' },
          { id: '2', label: 'Option 2' },
          { id: '3', label: 'Option 3' },
        ],
      },
      {
        id: '3',
        title: 'Severity (optional)',
        label: 'Option 1',
        menu: [
          { id: '1', label: 'Option 1' },
          { id: '2', label: 'Option 2' },
          { id: '3', label: 'Option 3' },
        ],
      },
    ],
    check_box: 'By proceeding with this action, you are consenting to abide by our',
    check_box_link: 'terms & conditions.',
    button: 'Submit',
  },
];

function NewBugReport() {
  const [currrentAlignment, setCurrentAlignment] = useState(faAlignLeft);
  const [activeButton, setActiveButton] = useState('1');
  const [isActive, setIsActive] = useState(
    NEW_BUG_REPORT_FORM_DATA[0].icon_buttons.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );

  return (
    <>
      {NEW_BUG_REPORT_FORM_DATA.map((data) => (
        <div key={data.id} className={classes.new_bug_report_container}>
          <Text h5={data.title} />
          <Input label={data.input_label} placeholder={data.input_placeholder} />
          <HorizontalScrollView
            METADATA={data.children}
            onClick={setActiveButton}
            activeButton={activeButton}
          />
          <div className={classes.icon_buttons_container}>
            <div className={classes.icon_buttons}>
              {data.icon_buttons.map((sub_data) => (
                <div key={sub_data.id}>
                  <div className={classes.icons}>
                    {['1', '2', '3', '4', '5', '6', '7', '8'].includes(sub_data.id) && (
                      <ToolTip
                        children={
                          <IconButton
                            inconButtonStyle={isActive[sub_data.id] && classes.icon_button}
                            icon={sub_data.icon}
                            onClick={() => {
                              setIsActive((prev) => ({
                                ...prev,
                                [sub_data.id]: !prev[sub_data.id],
                              }));
                            }}
                          />
                        }
                        tooltipMessage={sub_data.tooltipmessage}
                      />
                    )}
                    {currrentAlignment === sub_data.icon && (
                      <ToolTip
                        children={
                          <IconButton
                            icon={currrentAlignment}
                            onClick={() => setCurrentAlignment(sub_data.next)}
                          />
                        }
                        tooltipMessage={sub_data.tooltipmessage}
                      />
                    )}
                  </div>
                  <div className={classes.icons_2}>
                    {['13', '14'].includes(sub_data.id) && (
                      <ToolTip
                        children={<IconButton icon={sub_data.icon} />}
                        tooltipMessage={sub_data.tooltipmessage}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <TextArea textAreaStyle={classes.text_area} placeholder={data.textArea_placeholder} />
          </div>
          <div className={classes.options_container}>
            {data.options.map((sub_data) => (
              <div key={sub_data.id} className={classes.option_container}>
                <Text h6={`${sub_data.title} :`} />
                <DynamicLabelDropdownMenu
                  dropDownIconTextStyle={classes.dropdown_button_container}
                  dropDownMenuStyle={classes.dropdown_menu_container}
                  buttonLabel={sub_data.label}
                  buttonIcon={faChevronDown}
                  menuItems={sub_data.menu}
                />
              </div>
            ))}
          </div>
          <div className={classes.check_box_container}>
            <CheckBox label12={data.check_box} />
            <Link children12={data.check_box_link} />
          </div>
          <SolidButton
            buttonMainContainerStyle={classes.solid_button_container}
            buttonStyle={classes.solid_button}
            label={data.button}
          />
        </div>
      ))}
    </>
  );
}

export default NewBugReport;
