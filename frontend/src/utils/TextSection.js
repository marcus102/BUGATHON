import React, { useContext } from 'react';
import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import classes from './TextSection.module.css';
import Tag from './tagSection';

function Text({
  h1,
  h1Style,
  h2,
  h2Style,
  h3,
  h3Style,
  h4,
  h4Style,
  h5,
  h5Style,
  h6,
  h6Style,
  p16,
  p16Style,
  p12,
  p12Style,
  label16,
  label16Style,
  label15,
  label15Style,
  label14,
  label14Style,
  label12,
  label12Style,
  label10,
  label10Style,
  textStyle,
  children,
  unwrap,
  tag,
}) {
  const { systemTheme } = useContext(ManagmentSystem);
  return (
    <div
      className={`${
        systemTheme === 'dark_mode'
          ? !unwrap
            ? classes.text_container
            : classes.unwrap_text_container
          : !unwrap
          ? classes.text_container_
          : classes.unwrap_text_container_
      } ${textStyle}`}
    >
      {h1 && <h1 className={`${classes.h1} ${h1Style}`}>{h1}</h1>}
      {h2 && <h2 className={`${classes.h2} ${h2Style}`}>{h2}</h2>}
      {h3 && <h3 className={`${classes.h3} ${h3Style}`}>{h3}</h3>}
      {h4 && <h4 className={`${classes.h4} ${h4Style}`}>{h4}</h4>}
      {h5 && <h5 className={`${classes.h5} ${h5Style}`}>{h5}</h5>}
      {h6 && <h6 className={`${classes.h6} ${h6Style}`}>{h6}</h6>}
      {p16 && <p className={`${classes.p16} ${p16Style}`}>{p16}</p>}
      {p12 && <p className={`${classes.p12} ${p12Style}`}>{p12}</p>}
      {label10 && (
        <label
          className={`${
            systemTheme === 'dark_mode' ? classes.label10 : classes.label10_
          } ${label10Style}`}
        >
          {label10}
        </label>
      )}
      {label15 && (
        <label
          className={`${
            systemTheme === 'dark_mode' ? classes.label15 : classes.label15_
          } ${label15Style} `}
        >
          {label15}
        </label>
      )}
      {label14 && (
        <label
          className={`${
            systemTheme === 'dark_mode' ? classes.label14 : classes.label14_
          } ${label14Style}`}
        >
          {label14}
        </label>
      )}
      {label12 && (
        <label
          className={`${
            systemTheme === 'dark_mode' ? classes.label12 : classes.label12_
          } ${label12Style}`}
        >
          {label12}
        </label>
      )}
      {label16 && (
        <label
          className={`${
            systemTheme === 'dark_mode' ? classes.label16 : classes.label16_
          } ${label16Style}`}
        >
          {label16}
        </label>
      )}
      {tag && <Tag label={tag} />}
      {children}
    </div>
  );
}

export default Text;
