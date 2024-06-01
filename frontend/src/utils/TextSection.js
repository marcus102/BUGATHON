import React from 'react';
import classes from './TextSection.module.css';

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
}) {
  return (
    <div className={[classes.text_container, textStyle].join(' ')}>
      {h1 ? <h1 className={[classes.h1, h1Style].join(' ')}>{h1}</h1> : undefined}
      {h2 ? <h2 className={[classes.h2, h2Style].join(' ')}>{h2}</h2> : undefined}
      {h3 ? <h3 className={[classes.h3, h3Style].join(' ')}>{h3}</h3> : undefined}
      {h4 ? <h4 className={[classes.h4, h4Style].join(' ')}>{h4}</h4> : undefined}
      {h5 ? <h5 className={[classes.h5, h5Style].join(' ')}>{h5}</h5> : undefined}
      {h6 ? <h6 className={[classes.h6, h6Style].join(' ')}>{h6}</h6> : undefined}
      {p16 ? <p className={[classes.p16, p16Style].join(' ')}>{p16}</p> : undefined}
      {p12 ? <p className={[classes.p12, p12Style].join(' ')}>{p12}</p> : undefined}
      {label10 ? (
        <label className={[classes.label10, label10Style].join(' ')}>{label10}</label>
      ) : undefined}
      {label15 ? (
        <label className={[classes.label15, label15Style].join(' ')}>{label15}</label>
      ) : undefined}
      {label14 ? (
        <label className={[classes.label14, label14Style].join(' ')}>{label14}</label>
      ) : undefined}
      {label12 ? (
        <label className={[classes.label12, label12Style].join(' ')}>{label12}</label>
      ) : undefined}
      {label16 ? (
        <label className={[classes.label16, label16Style].join(' ')}>{label16}</label>
      ) : undefined}
      {children}
    </div>
  );
}

export default Text;
