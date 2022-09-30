import "antd/dist/antd.css";
import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

type BubbleProps = {
  text: string;
  src: string;
  iconWidth: number;
  iconHeight: number;
};

export default function Bubble({ text, src, iconWidth, iconHeight }: BubbleProps): JSX.Element {
  return (
    <div className={styles.bubble}>
      <p>{text}</p>
      <Image src={src} alt={text} width={iconWidth} height={iconHeight} />
    </div>
  );
}
