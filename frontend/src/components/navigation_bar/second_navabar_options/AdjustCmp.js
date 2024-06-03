import React from 'react';
import classes from './AdjustCmp.module.css';
import { CheckBox, Radio } from '../../../utils/InputSection';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu } from '../../../utils/ButtonSection';
import Text from '../../../utils/TextSection';

const ADJUST_DATA = [
  {
    id: 'Collapse',
    icon: faCaretDown,
    children: [
      { id: '1', label: 'All' },
      { id: '2', label: 'Potential Suggestions' },
      { id: '3', label: 'Analytics' },
      { id: '4', label: 'None (default)' },
    ],
  },
  {
    id: 'Other',
    icon: faCaretDown,
    children: [
      { id: '1', label: '---' },
      { id: '2', label: '----' },
      { id: '3', label: '-----' },
      { id: '4', label: '------' },
    ],
  },
];

function Adjust() {
  return (
    <div className={classes.adjust_main_container}>
      {ADJUST_DATA.map((data) => (
        <div key={data.id}>
          <Text unwrap={true} h5={data.id} />
          <div className={classes.check_box_list_container}>
            {data.children.map((sub_data) => (
              <Radio unwrap={true} key={sub_data.id} label={sub_data.label} />
            ))}
          </div>
          {/* <DropdownMenu
            key={data.id}
            buttonLabel={data.id}
            buttonIcon={data.icon}
            children={
              <div className={classes.check_box_list_container}>
                {data.children.map((sub_data) => (
                  <Radio unwrap={true} key={sub_data.id} label={sub_data.label} />
                ))}
              </div>
            }
          /> */}
        </div>
      ))}
    </div>
  );
}

export default Adjust;
