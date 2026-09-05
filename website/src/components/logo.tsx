import { useEffect, useState } from "react";
import { motion } from "motion/react";

// 2nd like 
// const SIDE = "#2764E7";
// const FRONT =  "#F4B400";

// const FRONT = "#F6C13D";
// const SIDE = "#4A7DEA";

// const FRONT = "#F7C95A";
// const SIDE = "#5C89EC";

// const FRONT = "#F6C13D";
// const SIDE = "#4A7DEA";


// best 
// const FRONT = "#FF4664";
// const SIDE = "#3478F6";

// will go with this 
// const FRONT = "#FF3B6B";
// const SIDE = "#6C5CE7";

// const FRONT = "#FF3B6B";
// const SIDE = "#2764E7";

// const FRONT = "#FF6B8A";
// const SIDE = "#3B82F6";

// Pink + dark burgundy - looks really good
// const FRONT = "#FF6B8A";
// const SIDE = "#9F1239";


// const SIDE = "#D02467";
// const FRONT = "#F4B400";

const FRONT = "#F6C33B";
const SIDE = "#D02467";

// const FRONT = "#F7C95A";
// const SIDE = "#C83E70";

// const FRONT = "#F6C33B";
// const SIDE = "#C93A6F";


// 1. Softer, balanced
// 3. More muted / polished
// 4. More playful / candy
// const FRONT = "#FF6C8A";
// const SIDE = "#8C7AF2";

// 7. Brighter coral-pink + indigo


// const FRONT = "#FF5378";
// const SIDE = "#7066E3";

// const FRONT = "#FF5378";
// const SIDE = "#546FE8";

type LetterProps = {
  children: string;
  className?: string;
};

function Letter({ children, className = "" }: LetterProps) {
  return (
    <span
      className={`relative inline-block select-none [filter:url(#rough)] ${className}`}
      style={{
        fontFamily:
          '"Arial Rounded MT Bold", "Arial Black", "Helvetica Neue", sans-serif',
        fontWeight: 700,
        lineHeight: 0.72,
        letterSpacing: "-0.02em",
      }}
      aria-hidden="true"
    >
    <span
  className="absolute inset-0 -z-10 translate-x-[0.05em] translate-y-[0.04em]"
  style={{
    color: SIDE,
    // textShadow: `-0.5px -0.5px ${SIDE}`,
  }}
>
  {children}
</span>

    <span
  className="relative z-10"
  style={{
    color: FRONT,
    // textShadow: `
    //   0.5px 0 ${FRONT},
    //   -0.5px 0 ${FRONT},
    //   0 0.5px ${FRONT},
    //   0 -0.5px ${FRONT}
    // `,
  }}
>
  {children}
</span>
    </span>
  );
}

const walkers = [
  { letter: "a", destination: "0.70em", delay: 0.03 },
  { letter: "r", destination: "1.28em", delay: 0.12 },
  { letter: "k", destination: "1.75em", delay: 0.21 },
];

export default function MarkWordmark() {
  const [hovered, setHovered] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIntroActive(true);
    }, 1000);

    const hideTimer = window.setTimeout(() => {
      setIntroActive(false);
    }, 5000);

    const finishTimer = window.setTimeout(() => {
      setIntroFinished(true);
    }, 2850);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  const active = introFinished ? hovered : introActive;

  return (
    <a href="/">
      <main className="grid w-fit place-items-center">
        <div
          className="relative inline-block isolate cursor-pointer -skew-x-[8deg] text-[clamp(32px,10vw,32px)]"
          role="img"
          aria-label="Mark"
          onMouseEnter={() => {
            if (introFinished) {
              setHovered(true);
            }
          }}
          onMouseLeave={() => {
            if (introFinished) {
              setHovered(false);
            }
          }}
        >
          <div className="relative z-30">
            <Letter>M</Letter>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10">
            {walkers.map(({ letter, destination, delay }) => (
              <motion.div
                key={letter}
                className="absolute bottom-0 left-[0.12em]"
                initial={false}
                animate={
                  active
                    ? {
                        x: destination,

                        y: [
                          "0em",
                          "-0.035em",
                          "0em",
                          "-0.02em",
                          "0em",
                          "0em",
                        ],

                        rotate: [
                          0,
                          -6,
                          4,
                          -3,
                          2,
                          0,
                        ],
                      }
                    : {
                        x: "0em",
                        y: "0em",
                        rotate: 0,
                      }
                }
                transition={
                  active
                    ? {
                        x: {
                          duration: 0.8,
                          delay,
                          ease: [0.22, 1, 0.36, 1],
                        },

                        y: {
                          duration: 0.8,
                          delay,
                          times: [
                            0,
                            0.2,
                            0.4,
                            0.6,
                            0.8,
                            1,
                          ],
                          ease: [0.22, 1, 0.36, 1],
                        },

                        rotate: {
                          duration: 0.8,
                          delay,
                          times: [
                            0,
                            0.2,
                            0.4,
                            0.6,
                            0.8,
                            1,
                          ],
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }
                    : {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              >
                <Letter>{letter}</Letter>
              </motion.div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute z-20 bg-[#FDFDFC]"
            style={{
              top: "-0.08em",
              left: "-0.03em",
              right: "0em",
              bottom: "-0.04em",
            }}
            aria-hidden="true"
          />
        </div>
      </main>
    </a>
  );
}