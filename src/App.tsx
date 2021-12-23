import React from "react";
import MainSketch from "./sketches/MainSketch";
import styles from "./styles/app.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <MainSketch width={800} height={800} />
    </div>
  );
};

export default App;
