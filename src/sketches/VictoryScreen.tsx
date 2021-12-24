import styles from "../styles/victory.module.css";
import classnames from "classnames";
import AnimatedText from "../components/AnimatedText";
import img from "../images/paper2.png";
import { useState } from "react";
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

  setInterval(() => {
    setTextFinished(true);
  }, 5000);

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
      <img className={imgClassname} src={img} alt="palkinto" />
    </div>
  );
};

export default VictoryScreen;
