import styles from "./Spinner.module.scss";

type SpinnerProps = {
  color: string;
  height: string;
};

const Spinner: React.FC<SpinnerProps> = ({ color, height }) => {
  return (
    <div className={styles.spinner}>
      <span
        style={{
          borderRightColor: color,
          height: height,
          width: height,
        }}
      ></span>
    </div>
  );
};

export default Spinner;
