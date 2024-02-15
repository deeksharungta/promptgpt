import styles from "./Layout.module.scss";
import { Head, Image, LayoutProps } from "@/helpers/imports";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className={styles.main}>
        <Head>
          <title>PromptGPT</title>
          <meta
            name="description"
            content="PromptGPT is a web application created with NextJS, allowing users to make their own customized ChatGPTs with a unique subdomain."
          />
        </Head>
        {children}
      </main>
      <Image
        src="/images/ellipse-3.svg"
        width={764}
        height={585}
        alt="ellipse-3"
        className={styles["ellipse-3"]}
      />
      <Image
        src="/images/ellipse-1.svg"
        width={1440}
        height={634}
        alt="ellipse-1"
        className={styles["ellipse-1"]}
      />
      <Image
        src="/images/ellipse-2.svg"
        width={736}
        height={528}
        alt="ellipse-2"
        className={styles["ellipse-2"]}
      />

      {/* <div className={styles.ellipse} />
      <div className={styles.div} />
      <div className={styles["ellipse-2"]} /> */}
    </>
  );
}
