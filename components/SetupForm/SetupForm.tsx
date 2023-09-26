import Image from "next/image";
import styles from "./SetupForm.module.scss";
import Link from "next/link";
import Theme from "./Theme";
import WebAppPosition from "./WebAppPosition";

const SetupForm = () => {
  return (
    <form className={styles["setup-form"]}>
      <div>
        <div className={styles.stretch}>
          <div className={styles["input-item"]}>
            <label htmlFor="name" className={styles.title}>
              Project Name
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Project Name"
              name="name"
              id="name"
            />
          </div>
          <div className={styles["input-item"]}>
            <label htmlFor="description" className={styles.title}>
              Short Description
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a short description about the tool"
              name="description"
              id="description"
            />
          </div>
        </div>
        <div className={styles["input-item"]}>
          <div className={styles.heading}>
            <label htmlFor="prompt" className={styles.title}>
              Personalized Prompt
            </label>
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
          <textarea
            className={styles["prompt-textarea"]}
            id="prompt"
            placeholder="Enter your Personalized Prompt here"
            name="prompt"
          />
        </div>
        <div className={styles.stretch}>
          <div className={styles["input-item"]}>
            <label className={styles.title} htmlFor="domain">
              Select Domain
            </label>
            <div className={styles["domain-input"]}>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter domain name"
                name="domain"
                id="domain"
              />
              <p>.prompt.to</p>
            </div>
          </div>
          <div className={styles["input-item"]}>
            <div className={styles.heading}>
              <label htmlFor="key" className={styles.title}>
                Open API Key
              </label>
              <Link
                href="https://platform.openai.com/account/api-keys"
                className={styles.link}
                target="_blank"
              >
                Where to find
                <Image
                  src="images/arrow-right.svg"
                  width={16}
                  height={16}
                  alt="arrow-right-icon"
                />
              </Link>
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter API Key"
              name="key"
              id="key"
            />
          </div>
        </div>
        <Image src="images/divider.svg" width={888} height={16} alt="divider" />
        <div className={styles.stretch}>
          <WebAppPosition />
          <Theme />
        </div>
      </div>
      <button type="submit" className={styles["deploy-btn"]}>
        Deploy my Prompt GPT
        <Image
          src="images/arrow.svg"
          width={24}
          height={24}
          alt="arrow-right"
        />
      </button>
    </form>
  );
};

export default SetupForm;
