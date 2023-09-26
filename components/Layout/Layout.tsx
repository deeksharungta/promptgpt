import { ReactNode } from "react";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
      <div className={styles.ellipse} />
      <div className={styles.div} />
      <div className={styles["ellipse-2"]} />
    </>
  );
}
