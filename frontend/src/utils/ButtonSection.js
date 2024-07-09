import React, { useState, useEffect, useRef, useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './ButtonSection.module.css';
import Icon from './IconSection';
import Text from './TextSection';
import { Image } from './MediaSection';

export function PlaneButton({
  children,
  buttonContainerMainContainer,
  onClick,
  label10,
  label12,
  label14,
  label16,
  unwrap,
}) {
  return (
    <button
      onClick={onClick}
      className={` ${classes.plane_button_main_container} ${buttonContainerMainContainer}`}
    >
      {label10 && <Text label10Style={classes.button_text} unwrap={unwrap} label10={label10} />}
      {label12 && <Text label12Style={classes.button_text} unwrap={unwrap} label12={label12} />}
      {label14 && <Text label14Style={classes.button_text} unwrap={unwrap} label14={label14} />}
      {label16 && <Text label16Style={classes.button_text} unwrap={unwrap} label16={label16} />}
      {children}
    </button>
  );
}

export function ButtonContainer({ children, buttonContainerMainContainer, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${classes.button_container_main_container} ${buttonContainerMainContainer}`}
    >
      {children}
    </button>
  );
}

export function SolidButton({
  onClick,
  label,
  children,
  buttonMainContainerStyle,
  buttonStyle,
  buttonTextContainerStyle,
  buttonTextStyle,
  icon,
  color,
  size,
  unwrap,
}) {
  return (
    <div className={`${classes.solid_button_container} ${buttonMainContainerStyle}`}>
      <button className={`${classes.solid_button} ${buttonStyle}`} type="button" onClick={onClick}>
        {label && (
          <Text
            unwrap={unwrap}
            textStyle={buttonTextContainerStyle}
            label14={label}
            label14Style={`${classes.button_text} ${buttonTextStyle}`}
          />
        )}
        {icon && <Icon icon={icon} color={color} size={size} />}
        {children}
      </button>
    </div>
  );
}

export function OutlinedButton({
  onClick,
  label,
  buttonStyle,
  children,
  buttonMainContainerStyle,
  buttonTextContainerStyle,
  buttonTextStyle,
  icon,
  color,
  size,
  unwrap,
}) {
  return (
    <div className={`${classes.outlined_button_container} ${buttonMainContainerStyle}`}>
      <button
        className={`${classes.outlined_button} ${buttonStyle}`}
        type="button"
        onClick={onClick}
      >
        {label && (
          <Text
            unwrap={unwrap}
            textStyle={buttonTextContainerStyle}
            label14={label}
            label14Style={[classes.button_text, buttonTextStyle].join(' ')}
          />
        )}
        {icon && <Icon icon={icon} color={color} size={size} />}
        {children}
      </button>
    </div>
  );
}

export function IconButton({
  colorOnMouseUp,
  colorOnMouseDown,
  icon,
  size,
  onClick,
  inconButtonStyle,
  getPosition,
}) {
  const [isPressed, setIsPressed] = useState(false);

  function handleMouseActivity() {
    setIsPressed(!isPressed);
  }

  const iconColor = isPressed ? colorOnMouseDown : colorOnMouseUp;
  return (
    <button
      type="button"
      className={`${classes.icon_button_container} ${inconButtonStyle}`}
      onClick={onClick}
      onMouseDown={handleMouseActivity}
      onMouseUp={handleMouseActivity}
    >
      <Icon icon={icon} color={iconColor} size={size} />
    </button>
  );
}

export function IconTextButton({
  colorOnMouseUp,
  colorOnMouseDown,
  children,
  icon,
  icon_,
  size,
  onClick,
  inconTextButtonStyle,
  inconTextLabel16Style,
  iconContainerStyle,
  label,
  unwrap,
}) {
  const [isPressed, setIsPressed] = useState(false);

  function handleMouseActivity() {
    setIsPressed(!isPressed);
  }

  const iconColor = isPressed ? colorOnMouseDown : colorOnMouseUp;
  return (
    <button
      className={`${classes.icon_text_button_container} ${inconTextButtonStyle}`}
      onClick={onClick}
      onMouseDown={handleMouseActivity}
      onMouseUp={handleMouseActivity}
    >
      {icon && (
        <Icon iconContainerStyle={iconContainerStyle} icon={icon} color={iconColor} size={size} />
      )}
      {label && (
        <Text
          unwrap={unwrap}
          label14={label}
          label14Style={`${classes.button_text} ${inconTextLabel16Style}`}
        />
      )}
      {icon_ && (
        <Icon iconContainerStyle={iconContainerStyle} icon={icon_} color={iconColor} size={size} />
      )}
      {children}
    </button>
  );
}

export function ImageButton({ onClick, src, alt, imageButtonStyle, imageStyle }) {
  return (
    <button
      type="button"
      className={`${classes.image_button_container} ${imageButtonStyle}`}
      onClick={onClick}
    >
      <Image imgContainerStyle={`${classes.image_container} ${imageStyle}`} src={src} alt={alt} />
    </button>
  );
}

export function ImageTextButton({
  onClick,
  src,
  alt,
  src_,
  alt_,
  label,
  imageTextButtonStyle,
  imageTextStyle,
  imageTextLabel16Style,
  children,
  unwrap,
}) {
  return (
    <button
      type="button"
      className={`${classes.image_text_button_container} ${imageTextButtonStyle}`}
      onClick={onClick}
    >
      {src && (
        <Image
          imgContainerStyle={`${classes.image_text_container} ${imageTextStyle}`}
          src={src}
          alt={alt}
        />
      )}
      {label && (
        <Text
          unwrap={unwrap}
          label14={label}
          label14Style={`${classes.image_text} ${imageTextLabel16Style}`}
        />
      )}
      {src_ && (
        <Image
          imgContainerStyle={`${classes.image_text_container} ${imageTextStyle}`}
          src={src_}
          alt={alt_}
        />
      )}
      {children}
    </button>
  );
}

export function DropdownMenu({
  dropDownMainContainerStyle,
  dropDownMenuStyle,
  dropDownIconTextStyle,
  buttonLabel,
  buttonIcon,
  menuItems,
  children,
  buttonChildren,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${classes.dropdown_menu_container} ${dropDownMainContainerStyle}`}
      ref={dropdownRef}
    >
      <IconTextButton
        inconTextButtonStyle={`${classes.dropdown_toggle} ${dropDownIconTextStyle}`}
        icon={buttonIcon}
        label={buttonLabel}
        children={buttonChildren}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />

      {isOpen && (
        <div className={`${classes.dropdown_menu} ${dropDownMenuStyle}`}>
          {menuItems && (
            <>
              {menuItems.map((data, index) => (
                <IconTextButton
                  key={data.id}
                  inconTextButtonStyle={`${classes.drop_down_item_link}`}
                  icon_={data.icon_2}
                  label={data.label}
                  icon={data.icon}
                  // onClick={''}
                />
              ))}
            </>
          )}

          {children}
        </div>
      )}
    </div>
  );
}

export function DynamicLabelDropdownMenu({
  buttonIcon,
  buttonLabel,
  menuItems,
  dropDownMenuStyle,
  dropDownIconTextStyle,
  my_key,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { dropDownDefaultHandler } = useContext(ManagmentSystem);
  // const { all, bug_report } = dropDownDefault;
  // const [selectedLabel, setSelectedLabel] = useState('All');
  const dropdownRef = useRef(null);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleItemClick = (label) => {
  //   dropDownDefaultHandler({ [my_key]: label });
  //   setIsOpen(false);
  // };

  return (
    <div className={classes.dropdown_menu_container} ref={dropdownRef}>
      <IconTextButton
        unwrap={true}
        inconTextButtonStyle={`${classes.dropdown_toggle} ${dropDownIconTextStyle}`}
        icon={buttonIcon}
        label={buttonLabel}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className={`${classes.dropdown_menu} ${dropDownMenuStyle}`}>
          {menuItems.map((data) => (
            <IconTextButton
              key={data.id}
              unwrap={true}
              inconTextButtonStyle={`${classes.drop_down_item_link}`}
              icon_={data.icon_2 && data.icon_2}
              label={data.label && data.label}
              icon={data.icon && data.icon}
              onClick={() => {
                dropDownDefaultHandler({ [my_key]: data.label });
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
