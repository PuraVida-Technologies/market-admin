import "antd/dist/antd.css";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { DatePicker } from "antd";
import Image from "next/image";

export default function CustomDatePicker(): JSX.Element {
  const [date, setDate] = useState<string | undefined>(undefined);

  return (
    <div>
      <DatePicker
        suffixIcon={!date && <Image src="/icons/arrow-down.svg" alt="arrow" width={16} height={9} />}
        className={styles.datePicker}
        inputReadOnly
        placeholder="Recent Updated list"
        bordered={false}
        onChange={(moment) => {
          setDate(moment?.format("YYYY-MM-DD"));
        }}
        allowClear={date ? true : false}
      />
    </div>
  );
}
