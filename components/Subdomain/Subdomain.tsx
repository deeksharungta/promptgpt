import styles from "./Subdomain.module.scss";
import {
  Button,
  ChangeEvent,
  Image,
  Link,
  SubdomainProps,
  chatData,
  handleCopy,
  useState,
} from "@/helpers/imports";

const Subdomain: React.FC<SubdomainProps> = ({
  name,
  description,
  prompt,
  key,
}) => {
  const [copyButtonVisible, setCopyButtonVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: prompt,
    },
  ]);

  const truncateString = (str: string | undefined | null, maxLen: number) =>
    (str ?? "").length > maxLen
      ? (str ?? "").slice(0, maxLen) + "..."
      : str ?? "";

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);
    setLoading(true);
    await chatData(userMessage, key, messages, setLoading, setOutput);
  };

  return (
    <div className={styles.wrapper}>
      <Link href="https://www.promptgpt.tools" className={styles.logo}>
        <Image src="images/logo.svg" width={178} height={22.3} alt="logo" />
      </Link>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>{name}</h3>
          <p title={description}>{truncateString(description, 16)}</p>
        </div>
        <div className={styles["input-output"]}>
          <textarea
            className={styles.textarea}
            id="input"
            placeholder="Please write input here to get your desired output."
            name="input"
            onChange={handleTextAreaChange}
          />

          <Image
            src="images/line.svg"
            width={48}
            height={551}
            alt="line-svg"
            className={styles.img}
          />
          <div
            className={styles.textarea}
            onMouseEnter={() => setCopyButtonVisible(true)}
            onMouseLeave={() => setCopyButtonVisible(false)}
          >
            {output}
            <button
              className={styles["copy-btn"]}
              onClick={() => handleCopy(output, setCopySuccess)}
              style={{ display: copyButtonVisible ? "block" : "none" }}
            >
              {copySuccess ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleSubmit}
            disabled={!userMessage.trim() || loading}
            loading={loading}
          />
        </div>
      </div>
      <Link
        href="https://www.promptgpt.tools/setup"
        className={styles["deploy-btn"]}
      >
        <Image src="images/logoIcon.svg" width={24} height={24} alt="logo" />
        <span>Deploy your own GPT with PromptGPT</span>
        <Image
          src="images/arrow-right.svg"
          width={24}
          height={24}
          alt="arrow-right"
        />
      </Link>
    </div>
  );
};

export default Subdomain;
