"use client";

import React from "react";
import { motion } from "motion/react";

const textSlide = {
  initial: {
    y: "100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const plans = [
  {
    label: "THE STARTER",
    title: "Site",
    price: "R$ 8K",
    description: "Para marcas que precisam de uma presença digital sólida.",
    items: [
      "Design personalizado",
      "Desenvolvimento frontend",
      "Animações e micro interações",
      "Performance otimizada",
    ],
    footer: "Projetos institucionais e landing pages",
    dark: false,
  },
  {
    label: "THE COMPLETE",
    title: "Brand + Site",
    price: "R$ 15K",
    description: "Uma experiência completa de marca no digital.",
    items: [
      "Identidade visual",
      "Design system",
      "Motion language",
      "Website completo",
    ],
    footer: "Marcas buscando uma presença memorável",
    dark: true,
  },
  {
    label: "THE CUSTOM",
    title: "Sob medida",
    price: "Consultar",
    description: "Projetos maiores e experiências personalizadas.",
    items: [
      "Plataformas digitais",
      "Campanhas especiais",
      "Experiências 3D",
      "Direção criativa",
    ],
    footer: "Projetos especiais e colaborações",
    dark: false,
  },
];

const PricingPrices = () => {
  return (
    <section className="w-full px-15 pb-25 max-lg:px-5 z-10">
      <div
        className="grid grid-cols-3 gap-5 max-lg:grid-cols-1
      "
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
            className={`
            min-h-[700px]
            p-5 pt-10    flex flex-col justify-between backdrop-blur-2xl
            ${plan.dark ? "bg-[#202020]/50 text-s" : "bg-s/15 text-p"}
            ${index !== 1 && "mt-10"}
            `}
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span
                  className={`relative -top-px size-2.5 rotate-45 bg-s
                  
               `}
                />
                <p className="text-chivo-s-14 text-end">{plan.label}</p>
              </div>

              <div className="mb-4 h-fit overflow-hidden">
                <motion.h3
                  initial="initial"
                  whileInView="animate"
                  variants={textSlide}
                  viewport={{ once: true }}
                  className={`font-neue font-bold
       text-[clamp(40px,6vw,72px)] text-start tracking-[-0.05em]
           leading-none uppercase
          text-s`}
                >
                  {plan.title}
                </motion.h3>
              </div>

              <div className="">
                <p
                  className={`mb-8
             font-inter font-normal 
                       text-s/75 text-[20px] tracking-[-0.04em]
                       leading-[1.1] will-change-transform
             
              `}
                >
                  {plan.description}
                </p>
              </div>
            </div>

            <div>
              {plan.items.map((item) => (
                <div
                  key={item}
                  className="
                  py-4 border-b border-current/20 text-chivo-s-14
                  "
                >
                  {item}
                </div>
              ))}
            </div>

            <div>
              <p
                className={`text-chivo-n-14 mb-10
             text-s/50
              `}
              >
                {plan.footer}
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileTap={{
                    scale: 1.1,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className={`
                 h-15 px-10 w-full  border border-s/10 backdrop-blur-2xl  group
                  ${plan.dark ? "bg-s text-p" : "bg-p text-s"}
                  `}
                >
                  <span
                    className="text-chivo-n-14
              group-hover:text-s transition-colors duration-500"
                  >
                    iniciar projeto
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingPrices;
