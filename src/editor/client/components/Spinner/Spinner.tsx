import styles from './Spinner.module.css';
import React, { CSSProperties } from 'react';

interface Props {
  size: number;
  thickness: number;
}

export function Spinner({ size, thickness }: Props) {
  const containerStyle: CSSProperties = {
    width: `${size}rem`,
    height: `${size}rem`,
  };

  const spinnerStyle: CSSProperties = {
    width: `calc(${size}rem)`,
    height: `calc(${size}rem)`,
    borderWidth: `${thickness}rem`,
  };

  return (
    <i className={styles.container} style={containerStyle}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </i>
  );
}
