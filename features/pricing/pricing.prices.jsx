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
    label: "INTERIOR CONSULTATION",
    title: "Consultoria",
    price: "Sob consulta",
    description:
      "Para clientes que buscam orientação especializada em materiais, layout e decisões de design.",
    items: [
      "Análise do espaço existente",
      "Direção de materiais e acabamentos",
      "Recomendações de mobiliário",
      "Orientação estética do projeto",
    ],
    footer: "Ideal para ambientes pontuais e refinamentos",
    dark: false,
  },

  {
    label: "FULL INTERIOR DESIGN",
    title: "Completo",
    price: "Sob consulta",
    description:
      "Uma abordagem completa para transformar uma residência através de arquitetura interior, materiais e curadoria.",
    items: [
      "Planejamento espacial",
      "Conceito e direção de interiores",
      "Seleção de materiais e mobiliário",
      "Acompanhamento de execução",
    ],
    footer: "Projetos residenciais completos",
    dark: true,
  },

  {
    label: "BESPOKE PROJECT",
    title: "Personalizado",
    price: "Sob consulta",
    description:
      "Projetos exclusivos desenvolvidos para residências com necessidades específicas e alto nível de personalização.",
    items: [
      "Arquitetura de interiores",
      "Marcenaria personalizada",
      "Curadoria de arte e objetos",
      "Coordenação completa",
    ],
    footer: "Residências privadas e projetos especiais",
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
                    solicitar proposta
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
