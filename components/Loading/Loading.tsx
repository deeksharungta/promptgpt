import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.rectangle1} />
      <div className={styles.rectangle2} />
      <div className={styles.rectangle3} />
      <div className={styles.rectangle4} />
    </div>
  );
};

export default Loading;
