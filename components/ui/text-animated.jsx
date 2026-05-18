import { motion } from "framer-motion";

const TextAnimated = ({
  phrases,
  variants,
  animate = true,
  as = "div",
  wordDelay = 0.03,
  lineDelay = 0.2,
  className = "",
  lineClassName = "",
  wordClassName = "",
}) => {
  const LineTag = as;

  return (
    <div className={className}>
      {phrases.map((phrase, lineIndex) => {
        const words = phrase.split(" ");

        return (
          <LineTag key={lineIndex} className={lineClassName}>
            {words.map((word, wordIndex) => {
              const delay = lineIndex * lineDelay + wordIndex * wordDelay;

              return (
                <span
                  key={wordIndex}
                  className="inline-block overflow-hidden align-bottom"
                  style={{
                    paddingBottom: "0.1em",
                  }}
                >
                  <motion.span
                    custom={delay}
                    variants={variants}
                    initial="initial"
                    animate={animate ? "animate" : "initial"}
                    className={`inline-block will-change-transform ${wordClassName}`}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              );
            })}
          </LineTag>
        );
      })}
    </div>
  );
};

export default TextAnimated;
