import Button from "@/components/Button/Button";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Result.module.scss";

const Result = () => {
  return (
    <div className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <Image src="images/logo.svg" width={178} height={22.3} alt="logo" />
      </Link>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>UX Writer</h3>
          <p>Generate your UX copy with this project</p>
        </div>
        <div className={styles["input-output"]}>
          <textarea
            className={styles.textarea}
            id="input"
            // type="text"
            placeholder="Please write input here to get your desired output."
            name="input"
          />
          <Image
            src="images/line.svg"
            width={48}
            height={551}
            alt="line-svg"
            className={styles.img}
          />
          <div className={styles.textarea}></div>
        </div>
        <div className={styles.action}>
          <Button />
        </div>
      </div>
      <button className={styles["deploy-btn"]}>
        <Image src="images/logoIcon.svg" width={24} height={24} alt="logo" />
        <span>Deploy your own GPT with PromptGPT</span>
        <Image
          src="images/arrow-right.svg"
          width={24}
          height={24}
          alt="arrow-right"
        />
      </button>
    </div>
  );
};

export default Result;
