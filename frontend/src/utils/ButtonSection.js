import React, { useState, useEffect, useRef } from 'react';
import classes from './ButtonSection.module.css';
import Icon from './IconSection';
import Text from './TextSection';
import Link from './LinkSection';

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
}) {
  return (
    <div className={`${classes.solid_button_container} ${buttonMainContainerStyle}`}>
      <button
        className={[classes.solid_button, buttonStyle].join(' ')}
        type="button"
        onClick={onClick}
      >
        {label && (
          <Text
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
          label14={label}
          label14Style={[classes.button_text, inconTextLabel16Style].join(' ')}
        />
      )}
      {icon_ && (
        <Icon iconContainerStyle={iconContainerStyle} icon={icon_} color={iconColor} size={size} />
      )}
      {children}
    </button>
  );
}

export function DropdownMenu({ buttonLabel, buttonIcon, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <div className={classes.dropdown_menu_container} ref={dropdownRef}>
      <IconTextButton
        inconTextButtonStyle={classes.dropdown_toggle}
        icon={buttonIcon}
        label={buttonLabel}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className={classes.dropdown_menu}>
          {menuItems.map((data, index) => (
            <Link
              key={data.id}
              linkContainer={`${classes.drop_down_item_link_container}`}
              linkStyle={`${classes.drop_down_item_link}`}
              href={data.href}
              icon_2={data.icon_2}
              children16={data.label}
              icon={data.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
