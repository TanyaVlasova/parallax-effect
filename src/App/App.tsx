import Parallax1 from "../Components/Parallax1";
import Parallax2 from "../Components/Parallax2";
import styles from "./App.module.css";

import type { FC } from "react";

const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Parallax1 />
      <Parallax2 />
    </div>
  );
};

export default App;
