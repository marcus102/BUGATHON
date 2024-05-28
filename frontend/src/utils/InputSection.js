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
    <div className={[classes.input_main_container, textAreaStyle].join(' ')}>
      {label && <Text label={label} />}
      <textarea placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
}

export function CheckBox({ label12, label16, checkboxStyle, value }) {
  return (
    <div className={[classes.checkbox_container, checkboxStyle].join(' ')}>
      <input type="checkbox" value={value} />
      {label16 ? <Text label16={label16} /> : undefined}
      {label12 ? <Text label12={label12} /> : undefined}
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
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && !isPasswordVisible ? 'password' : 'text';

  return (
    <div className={[classes.input_main_container, inputMainContainerStyle].join(' ')}>
      {label && <Text label16={label} />}
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
        {instructionLabel ? (
          <Text textStyle={classes.instructionLabel} label12={instructionLabel} />
        ) : undefined}
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
  radioMainContainerStyle,
  radioContainerStyle,
  checked,
  label,
  icon,
  size,
  color,
  onChange,
}) {
  return (
    <div className={[classes.radio_main_container, radioMainContainerStyle].join(' ')}>
      {icon && (
        <Icon iconContainerStyle={classes.icon_container} icon={icon} size={size} color={color} />
      )}
      <div className={[classes.radio_container, radioContainerStyle].join(' ')}>
        <input type="radio" name="flexRadioDefault" onChange={onChange} checked={checked} />
        {label && <Text textStyle={classes.text_container} label16={label} />}
      </div>

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
