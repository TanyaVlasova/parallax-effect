import { useCallback, useEffect, useRef } from "react";
import cn from "classnames";

import images from "./images";
import styles from "./Parallax1.module.css";

import type { FC, MouseEvent } from "react";

const bgDegsRange = { x: 10, y: 10 };
const degsRange = { x: 10, y: 32 };

const Parallax1: FC = () => {
  const screen = useRef<HTMLDivElement>(null);
  const screenSizes = useRef({ width: 0, height: 0 });
  const elemsContainer = useRef<HTMLDivElement>(null);
  const elems = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const mouseCoordsPercent = {
      x: Math.round((event.clientX / screenSizes.current.width) * 100),
      y: Math.round((event.clientY / screenSizes.current.height) * 100),
    };

    const degs = { x: 0, y: 0 };

    elems.current.forEach((elem, index) => {
      // Фон с 0 индексом
      if (index === 0) {
        degs.x =
          (bgDegsRange.x / 100) * mouseCoordsPercent.y - bgDegsRange.x / 2;
        degs.y =
          (bgDegsRange.y / 100) * mouseCoordsPercent.x - bgDegsRange.y / 2;
        elem.style.transform = `rotateY(${degs.y}deg) rotateX(${degs.x}deg) translateZ(-250px) scale(1.2)`;
      } else {
        degs.x = (degsRange.x / 100) * mouseCoordsPercent.y - degsRange.x / 2;
        degs.y = (degsRange.y / 100) * mouseCoordsPercent.x - degsRange.y / 2;
        elem.style.transform = `rotateY(${-degs.y}deg) rotateX(${degs.x}deg)`;
      }
    });
  }, []);

  const handleResizeWindow = useCallback(() => {
    if (screen.current) {
      screenSizes.current = {
        width: screen.current.offsetWidth,
        height: screen.current.offsetHeight,
      };
    }
  }, []);

  useEffect(() => {
    if (screen.current) {
      screenSizes.current = {
        width: screen.current.offsetWidth,
        height: screen.current.offsetHeight,
      };
    }

    if (elemsContainer.current) {
      elems.current = Array.from(
        elemsContainer.current.children as never as HTMLDivElement[]
      );
    }

    window.addEventListener("resize", handleResizeWindow);
  }, [handleResizeWindow]);

  return (
    <div className={styles.wrapper} ref={screen} onMouseMove={handleMouseMove}>
      <div className={styles.container} ref={elemsContainer}>
        <img className={cn(styles.frame)} src={images.frame} alt="frame" />
        <img
          className={cn(styles.arm, styles.elem)}
          src={images.arm}
          alt="arm"
        />
        <img
          className={cn(styles.face1, styles.elem)}
          src={images.face1}
          alt="face1"
        />
        <img
          className={cn(styles.face2, styles.elem)}
          src={images.face2}
          alt="face2"
        />
        <img
          className={cn(styles.foot, styles.elem)}
          src={images.foot}
          alt="foot"
        />
        <img
          className={cn(styles.woman, styles.elem)}
          src={images.woman}
          alt="woman"
        />
      </div>
    </div>
  );
};

export default Parallax1;
