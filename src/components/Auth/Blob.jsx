import { useEffect } from "react";
import "../../assets/styles/Auth/blob.css";

const getRandomPosition = () => {
  const top = Math.floor(Math.random() * 80) + "vh";
  const left = Math.floor(Math.random() * 80) + "vw";
  return { top, left };
};

const createKeyframes = (index) => {
  const fromX = Math.floor(Math.random() * 1000) - 500;
  const fromY = Math.floor(Math.random() * 1000) - 500;
  const toX = Math.floor(Math.random() * 1000) - 500;
  const toY = Math.floor(Math.random() * 1000) - 500;
  const rotateFrom = Math.floor(Math.random() * 360);
  const rotateTo = Math.floor(Math.random() * 360);

  const keyframes = `
      @keyframes move${index} {
        from {
          transform: translate(${fromX}px, ${fromY}px) rotate(${rotateFrom}deg);
          border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
        }
  
        to {
          transform: translate(${toX}px, ${toY}px) rotate(${rotateTo}deg);
          border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
        }
      }
    `;

  return keyframes;
};

const bigBlobs = Array.from({ length: 4 }, () => getRandomPosition());
const smallBlobs = Array.from({ length: 4 }, () => getRandomPosition());

let Blob = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    bigBlobs.forEach((_, index) => {
      const keyframes = createKeyframes(index);
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    });
  }, []);
  return (
    <div>
      {bigBlobs.map((pos, index) => (
        <div
          key={index}
          className={'big-blob'}
          style={{
            top: pos.top,
            left: pos.left,
            animation: `move${index} 25s infinite alternate`,
          }}
        ></div>
      ))}
      {smallBlobs.map((pos, index) => (
        <div
          key={index}
          className={'small-blob'}
          style={{
            top: pos.top,
            left: pos.left,
            animation: `move${index} 25s infinite alternate`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Blob;
