import styles from "../styles/victory.module.css";
import classnames from "classnames";

interface VictoryProps {
  enabled: boolean;
}
const VictoryScreen: React.FC<VictoryProps> = ({ enabled }) => {
  const className = classnames(styles["victory-container"], {
    [styles.visible]: enabled,
  });
  return (
    <div className={className}>
      <h1>Onneksi olkoon!</h1>
      <p>Olette Löytaneet luolan salaisuuden</p>
      <p>Ja palkinnoksi... </p>
      <img alt="palkinto" />
    </div>
  );
};

export default VictoryScreen;
