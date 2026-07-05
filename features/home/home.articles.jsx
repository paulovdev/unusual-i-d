import ArticleModal from "@/components/modal/article/article-modal";
import ImageComponent from "@/components/ui/image";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const textSlide = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

const ArticleCard = ({ item, index, inView, onClick, activeArticle }) => {
  return (
    <motion.div
      animate={{
        clipPath:
          activeArticle?.item === item.title
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 0% 0%)",
      }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <motion.figure
        initial={{
          clipPath: "inset(0% 100% 0% 0%)",
        }}
        animate={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
        }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="relative w-full h-[65vh] overflow-hidden rounded-sm"
      >
        <ImageComponent
          image={item.heroMedia.image}
          className="
          absolute size-full object-cover brightness-75
          group-hover:scale-110
          transition-all duration-500
          ease-[cubic-bezier(0.76,0,0.24,1)]
          "
        />
      </motion.figure>
      <p className="mt-5 mb-5 text-chivo-p-14">{item.publishedAt}</p>
      <div className="max-w-125 overflow-hidden">
        <motion.p
          initial="initial"
          animate={inView && "animate"}
          variants={textSlide}
          custom={0.3 + index * 0.1}
          className="paragraph-p"
        >
          {item.title}
        </motion.p>
      </div>
    </motion.div>
  );
};

const HomeArticles = ({ article, lenis }) => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 3;

  const canGoPrev = startIndex > 0;

  const canGoNext = startIndex < article.length - itemsPerPage;

  const handleNext = () => {
    if (!canGoNext) return;

    setStartIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!canGoPrev) return;

    setStartIndex((prev) => prev - 1);
  };

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <>
      <section
        id="articles"
        ref={ref}
        className="
        relative py-15 px-15
        overflow-hidden
        max-lg:px-5
        "
      >
        <div
          className="
          mb-10 flex items-center justify-between
          "
        >
          <div className="flex items-center gap-4">
            <span className="triangle-p" />

            <p className="text-chivo-p-14">artigos</p>
          </div>

          <div className="flex items-center gap-5">
            <motion.button
              whileTap={canGoPrev ? { scale: 0.95 } : {}}
              whileHover={
                canGoPrev
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,.8)",
                    }
                  : {}
              }
              disabled={!canGoPrev}
              onClick={handlePrev}
              className={`
              size-15 rounded-sm
              border border-p/10
              backdrop-blur-2xl
              flex items-center justify-center
              ${
                canGoPrev
                  ? "bg-p cursor-pointer"
                  : "bg-p/50 cursor-not-allowed opacity-50"
              }
              `}
            >
              <GoArrowLeft
                className={`
                text-[24px]
                transition-colors
                ${canGoPrev ? "text-s" : "text-s opacity-50"}
                `}
              />
            </motion.button>

            <motion.button
              whileTap={canGoNext ? { scale: 0.95 } : {}}
              whileHover={
                canGoNext
                  ? {
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,.8)",
                    }
                  : {}
              }
              disabled={!canGoNext}
              onClick={handleNext}
              className={`
              size-15 rounded-sm
              border border-p/10
              backdrop-blur-2xl
              flex items-center justify-center
              ${
                canGoNext
                  ? "bg-p cursor-pointer"
                  : "bg-p/50 cursor-not-allowed opacity-50"
              }
              `}
            >
              <GoArrowRight
                className={`
                text-[24px]
                transition-colors
                ${canGoNext ? "text-s" : "text-s opacity-50"}
                `}
              />
            </motion.button>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <motion.div
            animate={{
              x: `-${startIndex * 33.333}%`,
            }}
            transition={{
              duration: 0.8,
              ease: [0.88, 0, 0.24, 1],
            }}
            className="
            flex gap-5
            "
          >
            {article.map((item, i) => (
              <div
                key={i}
                className="
min-w-[calc(33.333%-14px)]
max-lg:min-w-[calc(50%-10px)]
max-md:min-w-full
"
              >
                <ArticleCard
                  item={item}
                  index={i}
                  inView={inView}
                  activeArticle={activeArticle}
                  onClick={() => {
                    setActiveArticle(item);
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeArticle && (
          <ArticleModal
            article={activeArticle}
            isOpen={!!activeArticle}
            onClose={() => {
              setActiveArticle(null);
            }}
            lenis={lenis}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeArticles;
