import React, { useState } from 'react';
import classes from './ButtonSection.module.css';
import Icon from './IconSection';
import Text from './TextSection';

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
      className={[classes.icon_button_container, inconButtonStyle].join(' ')}
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
      className={[classes.icon_text_button_container, inconTextButtonStyle].join(' ')}
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

export function DropDownButton({ buttonLabel, menuItems }) {
  return (
    <div className={["dropdown", classes.drop_down_button_main_container].join(' ')}>
      <button
        className={["dropdown-toggle", classes.drop_down_button].join(' ')}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {buttonLabel}
      </button>
      <ul className={["dropdown-menu", classes.drop_down_list_container].join(' ')}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a className={["dropdown-item", classes.drop_down_item].join(' ')} href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
