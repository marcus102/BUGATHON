import React, { useRef, useState } from 'react';
import classes from './InputSection.module.css';
import Text from './TextSection';
import { IconButton } from './ButtonSection';
import Icon from './IconSection';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function RowOfSquares({ rowOfSquaresStyle }) {
  const numSquares = 6;
  const inputsRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const inputLength = e.target.value.length;
    const nextInputIndex = index < numSquares - 1 ? index + 1 : index;

    if (inputLength === 1 && nextInputIndex < numSquares) {
      inputsRefs.current[nextInputIndex].focus();
    }
  };

  return (
    <div className={[classes.row_of_squares_container, rowOfSquaresStyle].join(' ')}>
      {Array(numSquares)
        .fill()
        .map((_, index) => (
          <input
            className={classes.white_square_contaier}
            key={index}
            maxLength={1}
            ref={(el) => (inputsRefs.current[index] = el)}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
    </div>
  );
}

export function TextArea({ label, placeholder, value, onChange, textAreaStyle, onKeyDown }) {
  return (
    <div className={`${classes.input_main_container} ${textAreaStyle}`}>
      {label && <Text label16={label} />}
      <textarea placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
}

export function CheckBox({ label12, label16, checkboxStyle, value, unwrap }) {
  return (
    <div className={`${classes.checkbox_container} ${checkboxStyle}`}>
      <input type="checkbox" value={value} />
      {label16 ? <Text unwrap={unwrap} label16={label16} /> : undefined}
      {label12 ? <Text unwrap={unwrap} label12={label12} /> : undefined}
    </div>
  );
}

export function Input({
  label,
  instructionLabel,
  type,
  placeholder,
  value,
  onChange,
  inputMainContainerStyle,
  inputSecondContainerStyle,
  inputStyle,
  onKeyDown,
  unwrap,
  unwrap_,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && !isPasswordVisible ? 'password' : 'text';

  return (
    <div className={[classes.input_main_container, inputMainContainerStyle].join(' ')}>
      {label && <Text unwrap={unwrap} label14={label} />}
      <div className={[classes.input_second_container, inputSecondContainerStyle].join(' ')}>
        <div className={`${classes.input_container} ${inputStyle}`}>
          <input
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {type === 'password' && (
            <IconButton
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        {instructionLabel && (
          <Text unwrap={unwrap_} textStyle={classes.instructionLabel} label12={instructionLabel} />
        )}
      </div>
    </div>
  );
}

export function Select({ label, options }) {
  return (
    <div>
      <Text label16={label} />
      <select className="form-select" aria-label="Default select example">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Radio({
  children,
  radioContainerStyle,
  checked,
  label,
  icon,
  size,
  color,
  onChange,
  inputValue,
  unwrap,
}) {
  return (
    <div className={`${classes.radio_container} ${radioContainerStyle}`}>
      {icon && (
        <Icon iconContainerStyle={classes.icon_container} icon={icon} size={size} color={color} />
      )}
      <input
        type="radio"
        name="flexRadioDefault"
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        checked={checked}
      />
      {label && <Text unwrap={unwrap} textStyle={classes.text_container} label16={label} />}
      {children}
    </div>
  );
}

export function Switch({ label, switchStyle, checked }) {
  return (
    <div className={['form-check form-switch', classes.switch_container, switchStyle].join(' ')}>
      <input className="form-check-input" type="checkbox" role="switch" checked={checked} />
      <Text textStyle={classes.text_container} label16={label} />
    </div>
  );
}
