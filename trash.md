     {/* MOBILE CATEGORY BUTTON */}
        {/* 
        <motion.button
          whileTap={{ scale: 1.1 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
          onClick={() => setOpenCat(!openCat)}
          className="
      shrink-0
      group size-15 
      border border-p/10 bg-p backdrop-blur-2xl
      flex items-center justify-center
      cursor-pointer
      lg:hidden
    "
        >
          <MdOutlineCategory
            className="
        text-[24px] text-s
        transition-colors duration-500
        group-hover:text-p
      "
          />
        </motion.button>

        <AnimatePresence mode="wait">
          {openCat && (
            <motion.div
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              exit={{
                opacity: 0,
                width: 0,
                transition: {
                  delay: 0.15,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
              className="
          flex-1
          ml-5
          overflow-hidden
          lg:hidden
        "
            >
              <motion.div
                initial={{
                  x: -30,
                }}
                animate={{
                  x: 0,
                  transition: {
                    delay: 0.15,
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                exit={{
                  x: -30,
                  transition: {
                    delay: 0.15,
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                className="
            flex
            items-center
            gap-3
            overflow-x-auto
            no-scrollbar
          "
              >
                {categories.map((cat, i) => {
                  const isActive = activeCategory === cat;

                  return (
                    <motion.button
                      key={cat}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transition: {
                          delay: 0.15 * i,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          delay: 0.15 * i,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }}
                      whileTap={{
                        scale: 1.05,
                      }}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                  shrink-0
                  h-15
                  px-8
                  
                  border border-p/10
                  cursor-pointer

                  ${isActive ? "bg-p text-s" : "bg-bg-s-2 text-p"}
                `}
                    >
                      <p
                        className="
                    text-[14px]
                    font-medium
                    uppercase
                    tracking-[0.05em]
                    whitespace-nowrap
                  "
                      >
                        {cat === "all" ? "todos" : cat}
                      </p>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
 */}
        {/*    <div
          className="
      flex items-center gap-5
      max-lg:hidden
    "
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <motion.button
                key={cat}
                whileTap={{
                  scale: 1.1,
                }}
                whileHover={
                  !isActive
                    ? {
                        scale: 1.05,
                        backgroundColor: "#000",
                      }
                    : {}
                }
                animate={{
                  backgroundColor: isActive ? "#000" : "#f5f5f5",
                }}
                onClick={() => setActiveCategory(cat)}
                className="
            group
            px-50
            h-15
            
            cursor-pointer
          "
              >
                <p
                  className={`
              text-[14px]
              font-medium
              uppercase
              tracking-[0.05em]

              ${isActive ? "text-s" : "text-p group-hover:text-s"}
            `}
                >
                  {cat === "all" ? "todos" : cat}
                </p>
              </motion.button>
            );
          })}
        </div>
 */}