import { SpinnerProps } from "@/helpers/imports";
import styles from "./Spinner.module.scss";

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
