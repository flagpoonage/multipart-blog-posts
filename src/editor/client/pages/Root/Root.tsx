import React, { ReactElement } from 'react';
import styles from './Root.module.css';

export function Root(): ReactElement {
  return <div className={styles.container}>{'Root Page'}</div>;
}
