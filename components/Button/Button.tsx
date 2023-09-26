import { useEffect, useRef, useState } from "react";
import styles from "./Button.module.scss";

const Button = () => {
  const buttonRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (buttonRef.current) {
      const button = buttonRef.current;
      setWidth(button.offsetWidth);
      setHeight(button.offsetHeight);
      setStyle(window.getComputedStyle(button));
    }
  }, [buttonRef]);

  const createRectSvg = (rx, ry) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          rx={rx}
          ry={ry}
          pathLength="10"
        />
      </svg>
    );
  };

  return (
    <button ref={buttonRef} className={styles.btn}>
      <div className={styles.stroke}>
        {createRectSvg(style.borderRadius, style.borderRadius)}
        {createRectSvg(style.borderRadius, style.borderRadius)}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className={styles.icon}
      >
        <g clipPath="url(#clip0_407_92)">
          <path
            d="M16.4571 5.88571L14.0572 3.48571C13.6 3.02857 12.9143 3.02857 12.4571 3.48571L1.31429 14.6857C0.85715 15.1429 0.85715 15.8286 1.31429 16.2857L3.71429 18.6857C4.17144 19.1429 4.85715 19.1429 5.31429 18.6857L16.4571 7.54285C16.9143 7.08571 16.9143 6.34285 16.4571 5.88571ZM13.3143 8.97142L11.0286 6.68571L13.3143 4.4L15.6 6.68571L13.3143 8.97142Z"
            fill="black"
          />
          <path
            d="M16.1714 3.82858L17.6 3.14286L19.0285 3.82858L18.2857 2.40001L19.0285 0.971436L17.6 1.71429L16.1714 0.971436L16.8571 2.40001L16.1714 3.82858Z"
            fill="black"
          />
          <path
            d="M7.6001 3.82858L9.02867 3.14286L10.4572 3.82858L9.71438 2.40001L10.4572 0.971436L9.02867 1.71429L7.6001 0.971436L8.28581 2.40001L7.6001 3.82858Z"
            fill="black"
          />
          <path
            d="M19.0285 9.54285L17.6 10.2857L16.1714 9.54285L16.8571 10.9714L16.1714 12.4L17.6 11.7143L19.0285 12.4L18.2857 10.9714L19.0285 9.54285Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_407_92">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>Do your Magic</span>
    </button>
  );
};

export default Button;
