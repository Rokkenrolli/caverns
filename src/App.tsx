import React, { useEffect, useState } from "react";
import MainSketch from "./sketches/MainSketch";
import styles from "./styles/app.module.css";
import { Map, MAPPATH, parseMapFile } from "./utils";

const App = () => {
  const [map, setMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    const inner = async () => {
      const file = await fetch(MAPPATH);
      const text = await file.text();

      const map = parseMapFile(text);

      setMap(map);
    };

    inner();
  }, []);

  return (
    <div className={styles.container}>
      {map && (
        <MainSketch
          wallProps={map.boundaries}
          width={map.width}
          height={map.height}
        />
      )}
    </div>
  );
};

export default App;
