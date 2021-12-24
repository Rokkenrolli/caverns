import React, { useEffect, useState } from "react";
import MainSketch from "./sketches/MainSketch";
import VictoryScreen from "./sketches/VictoryScreen";
import styles from "./styles/app.module.css";
import { Map, MAPPATH, parseMapFile } from "./utils";

const App = () => {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [victory, setVictory] = useState(false);
  useEffect(() => {
    const inner = async () => {
      const file = await fetch(MAPPATH);
      const text = await file.text();
      const map = parseMapFile(text);
      setMap(map);
    };

    inner();
  }, []);
  const victoryText =
    "Onneksi Olkoon!\n Olette voittaneet, ja palkinnoksi...\n Upgrade!";


  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {map && !victory && (
          <MainSketch
            setVictory={setVictory}
            wallProps={map.boundaries}
            canvasWidth={map.canvasWidth}
            canvasHeight={map.canvasHeight}
            areaHeight={map.areaHeight}
            areaWidth={map.areaWidth}
          />
        )}

        <VictoryScreen
          textClassName={styles.AnimateTextContainer}
          victoryText={victoryText}
          enabled={victory}
        />
      </div>
    </div>
  );
};

export default App;
