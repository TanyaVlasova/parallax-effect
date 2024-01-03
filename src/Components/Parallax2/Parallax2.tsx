import { useCallback, useEffect, useRef } from "react";
import cn from "classnames";

import images from "./images";
import styles from "./Parallax2.module.css";

import type { FC, MouseEvent } from "react";

const Parallax2: FC = () => {
  const screen = useRef<HTMLDivElement>(null);
  const room = useRef<HTMLDivElement>(null);
  const girls = useRef<HTMLImageElement>(null);
  const girl = useRef<HTMLImageElement>(null);
  const screenWidth = useRef(0);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!screen.current || !room.current || !girls.current || !girl.current)
      return;

    const mouseCoordsPercent = Math.round(
      (event.clientX / screenWidth.current) * 100
    );

    const roomRotation = 25 * Math.sin((mouseCoordsPercent - 50) / 50);
    const roomZooming = -0.0001 * (mouseCoordsPercent - 50) ** 2 + 1.3;
    const girlsTranslation = -0.4 * (mouseCoordsPercent - 50) ** 2;
    const girlTranslationZ = 1000 * Math.cos(mouseCoordsPercent / 50) - 1200;
    const girlTranslationX = -0.08 * (mouseCoordsPercent - 50) ** 2;

    if (mouseCoordsPercent > 50) {
      girls.current.style.zIndex = "2";
      girl.current.style.zIndex = "1";
    } else {
      girls.current.style.zIndex = "1";
      girl.current.style.zIndex = "2";
    }

    room.current.style.transform = `scale(${roomZooming}) rotateY(${roomRotation}deg) translateY(-200px)`;
    girls.current.style.transform = `translateZ(${girlsTranslation}px)`;
    girl.current.style.transform = `translateZ(${girlTranslationZ}px) translateX(${girlTranslationX}px)`;
  }, []);

  const handleWindowResize = useCallback(() => {
    if (screen.current) {
      screenWidth.current = screen.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    if (screen.current) {
      screenWidth.current = screen.current.offsetWidth;
    }

    window.addEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <div className={styles.wrapper} ref={screen} onMouseMove={handleMouseMove}>
      <div className={styles.container}>
        <div className={styles.room} ref={room}>
          <div className={styles.floor}></div>

          <div className={cn(styles.frontWall, styles.wall)}>
            <div className={styles.wallContainer}>
              <div className={styles.pictureContainer}>
                <img className={styles.picture} src={images.picture1} alt="" />
                <img className={styles.picture} src={images.picture2} alt="" />
              </div>
            </div>
          </div>

          <div className={cn(styles.leftWall, styles.wall)}>
            <div className={styles.wallContainer}>
              <div className={styles.pictureContainer}>
                <img className={styles.picture} src={images.picture2} alt="" />
                <img className={styles.picture} src={images.picture3} alt="" />
              </div>
              <div className={styles.shadow}></div>
            </div>
          </div>

          <div className={cn(styles.rightWall, styles.wall)}>
            <div className={styles.wallContainer}>
              <div className={styles.pictureContainer}>
                <img className={styles.picture} src={images.picture3} alt="" />
                <img className={styles.picture} src={images.picture1} alt="" />
              </div>
              <div className={styles.shadow}></div>
            </div>
          </div>
          <img className={styles.caution} src={images.caution} alt="" />
        </div>

        <img className={styles.girls} ref={girls} src={images.girls} alt="" />
        <img className={styles.girl} ref={girl} src={images.girl} alt="" />
      </div>
    </div>
  );
};

export default Parallax2;
