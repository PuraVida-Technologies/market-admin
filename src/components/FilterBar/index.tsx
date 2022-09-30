import "antd/dist/antd.css";
import React from "react";
import styles from "./styles.module.scss";
import CustomDatePicker from "../DatePicker";
import Bubble from "../Bubble";

export default function FilterBar(): JSX.Element {
  return (
    <div className={styles.filterBAr}>
      <CustomDatePicker />
      <div className={styles.bubblesContainer}>
        <Bubble text="listing" src="/assets/listing.svg" iconWidth={16} iconHeight={14} />
        <Bubble text="sorting" src="/assets/sorting.svg" iconWidth={24} iconHeight={15} />
      </div>
    </div>
  );
}
