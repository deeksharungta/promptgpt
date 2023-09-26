import Image from "next/image";
import React, { useState } from "react";
import styles from "./WebAppPosition.module.scss";

export default function WebAppPosition() {
  const [position, setPosition] = useState("layout1");
  console.log(position);

  return (
    <div className={styles["web-app-position"]}>
      <p>Web-App Position</p>
      <div className={styles.option}>
        <Image
          src="images/layout1.svg"
          width={79}
          height={59}
          alt="layout-1"
          className={position === "layout1" ? styles.activeImage : ""}
          onClick={() => {
            setPosition("layout1");
          }}
        />
        <Image
          src="images/layout2.svg"
          width={79}
          height={59}
          alt="layout-2"
          className={position === "layout2" ? styles.activeImage : ""}
          onClick={() => {
            setPosition("layout2");
          }}
        />
      </div>
    </div>
  );
}
