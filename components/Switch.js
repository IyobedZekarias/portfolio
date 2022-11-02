import React from "react";
import styles from "../styles/Home.module.css";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        className={styles.react_switch_checkbox}
        id={`react_switch_new`}
        type="checkbox"
        onChange={handleToggle}
        checked={isOn}
      />
      <label
        className={styles.react_switch_label}
        htmlFor={`react_switch_new`}
        style={{ background: isOn && "#06D6A0" }}
      >
        <span className={styles.react_switch_button} />
      </label>
    </>
  );
};

export default Switch;
