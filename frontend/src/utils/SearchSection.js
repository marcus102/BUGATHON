import React from 'react';
import Colors from '../constants/colors';
import classes from './SearchSection.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconButton, SolidButton } from './ButtonSection';
import { Input } from './InputSection';

function Search({ icon, onClick }) {
  return (
    <div>
      {!icon && (
        <div className={classes.search_main_container}>
          <IconButton
            icon={faSearch}
            // colorOnMouseDown={Colors.white_}
            // colorOnMouseUp={Colors.white_}
            onClick={onClick}
          />
          <Input
            placeholder={'Search'}
            inputMainContainerStyle={classes.search_input_continer}
            inputStyle={classes.search_input}
          />
          <SolidButton
            buttonMainContainerStyle={classes.shortcut_button_main_container}
            buttonContainerStyle={classes.shortcut_button_container}
            buttonStyle={classes.shortcut_button}
            buttonTextStyle={classes.shortcut_button_text}
            label={'Crlt + K'}
          />
        </div>
      )}
      {icon && (
        <IconButton
          icon={faSearch}
        //   colorOnMouseDown={Colors.white_}
        //   colorOnMouseUp={Colors.white_}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default Search;
