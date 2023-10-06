"use client";

import Image from "next/image";
import React, { useState } from "react";
import styles from "./Theme.module.scss";
import Link from "next/link";

export default function Theme() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={styles.theme}>
      <div className={styles.heading}>
        <p>Theme</p>
        <Link href="#" className={styles.link}>
          Check Examples
          <Image
            src="images/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow-right-icon"
          />
        </Link>
      </div>
      <div className={styles.option}>
        <Image
          src="images/theme-light.svg"
          width={115}
          height={61}
          alt="theme-light"
          className={theme === "light" ? styles.activeImage : ""}
          onClick={() => {
            setTheme("light");
          }}
        />
        <Image
          src="images/theme-dark.svg"
          width={115}
          height={61}
          alt="theme-dark"
          className={theme === "dark" ? styles.activeImage : ""}
          onClick={() => {
            setTheme("dark");
          }}
        />
        <Image
          src="images/theme-retro.svg"
          width={115}
          height={61}
          alt="theme-retro"
          className={theme === "retro" ? styles.activeImage : ""}
          onClick={() => {
            setTheme("retro");
          }}
        />
      </div>
    </div>
  );
}
