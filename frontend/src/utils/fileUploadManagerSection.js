import React, { useRef } from 'react';
import classes from './fileUploadManagerSection.module.css';
import { IconTextButton, SolidButton } from './ButtonSection';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({ type, onFileSelect, btnType }) => {
  // Create a ref for the file input
  const fileInputRef = useRef(null);

  // Function to trigger file input click
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      e.target.value = '';
    }
  };

  // Determine the file types to accept based on `type`
  const getAcceptType = () => {
    switch (type) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'file':
        return '*/*';
      default:
        return '*/*';
    }
  };

  return (
    <>
      {btnType === 'upload' && (
        <SolidButton
          onClick={handleClick}
          label={` Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`}
        />
      )}
      {btnType === 'edit_profile' && (
        <IconTextButton
          inconTextButtonStyle={classes.side_bar_profile_edit_button}
          label={'Edit Pofile'}
          icon_={faEdit}
          onClick={handleClick}
        />
      )}

      <input
        type="file"
        accept={getAcceptType()}
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default FileUpload;
