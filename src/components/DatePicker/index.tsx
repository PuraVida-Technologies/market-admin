import "antd/dist/antd.css";
import React from "react";
import styles from "./styles.module.scss";
import { DatePicker, Space } from "antd";
import Image from "next/image";

export default function CustomDatePicker(): JSX.Element {
  return (
    <Space direction="vertical">
      <DatePicker
        suffixIcon={<Image src="/assets/arrow-down.svg" alt="arrow" width={16} height={9} />}
        className={styles.datePicker}
        inputReadOnly
        allowClear={false}
        placeholder="Recent Updated list"
        bordered={false}
      />
    </Space>
  );
}
