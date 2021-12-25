import styles from "../styles/victory.module.css";
import classnames from "classnames";
import AnimatedText from "../components/AnimatedText";
import img from "../images/paper2.png";
import { useEffect, useState } from "react";
interface VictoryProps {
  enabled: boolean;
  victoryText: string;
  textClassName?: string;
}
const VictoryScreen: React.FC<VictoryProps> = ({
  enabled,
  victoryText,
  textClassName,
}) => {
  const className = classnames(styles["victory-container"], {
    [styles.visible]: enabled,
  });

  const [textFinished, setTextFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextFinished(enabled);
    }, 3000);
    return () => clearInterval(interval);
  }, [enabled]);

  const imgClassname = classnames(styles.spinning, {
    [styles.active]: textFinished,
  });

  return (
    <div className={className}>
      {enabled && (
        <AnimatedText
          text={victoryText}
          initialDelay={1.5}
          delayIncrement={0.05}
          className={textClassName}
        />
      )}
      {enabled && <img className={imgClassname} src={img} alt="palkinto" />}
      <h1
        className={classnames(styles.upgrade, {
          [styles.upgactive]: textFinished,
        })}
      >
        Upgraded
      </h1>
    </div>
  );
};

export default VictoryScreen;
