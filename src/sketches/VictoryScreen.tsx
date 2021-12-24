import styles from "../styles/victory.module.css";
import classnames from "classnames";
import AnimatedText from "../components/AnimatedText";

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
      <img alt="palkinto" />
    </div>
  );
};

export default VictoryScreen;
