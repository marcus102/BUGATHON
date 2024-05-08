import React, { useState } from 'react';
import classes from './ButtonSection.module.css';
import Icon from './IconSection';
import Text from './TextSection';

export function ButtonContainer({ children, buttonContainerMainContainer, onClick }) {
  return (
    <button
    onClick={onClick}
      className={[classes.button_container_main_container, buttonContainerMainContainer].join(' ')}
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
  buttonContainerStyle,
  buttonStyle,
  buttonTextContainerStyle,
  buttonTextStyle,
  icon,
  color,
  size,
}) {
  return (
    <div className={[classes.solid_button_container, buttonMainContainerStyle].join(' ')}>
      <div className={[classes.solid_second_button_container, buttonContainerStyle].join(' ')}>
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
    </div>
  );
}

export function OutlinedButton({
  onClick,
  label,
  buttonStyle,
  children,
  buttonMainContainerStyle,
  buttonContainerStyle,
  buttonTextContainerStyle,
  buttonTextStyle,
  icon,
  color,
  size,
}) {
  return (
    <div className={[classes.outlined_button_container, buttonMainContainerStyle].join(' ')}>
      <div className={[classes.outlined_second_button_container, buttonContainerStyle].join(' ')}>
        <button
          className={[classes.outlined_button, buttonStyle].join(' ')}
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
      {label ? (
        <Text
          label14={label}
          label14Style={[classes.button_text, inconTextLabel16Style].join(' ')}
        />
      ) : undefined}
      {children}
    </button>
  );
}
