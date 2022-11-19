import React from 'react';

import styles from '../styles';

const regex = /^[a-za-z0-9_\u4e00-\u9fa5]+$/;

const CustomInput = ({ label, placeHolder, value, handleValueChange }) => (
  <>
    <label htmlFor="name" className={styles.label}>{label}</label>
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => {
         handleValueChange(e.target.value);
      }}
      className={styles.input}
    />
  </>
);

export default CustomInput;
