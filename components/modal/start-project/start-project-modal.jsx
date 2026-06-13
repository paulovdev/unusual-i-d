import { useEffect, useRef, useState } from "react";

import Lenis from "lenis";

import { IoClose } from "react-icons/io5";
import { motion } from "motion/react";
import TextAnimated from "@/components/ui/text-animated";

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

const menuAnim = {
  initial: { clipPath: "inset(0% 0% 0% 100%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const overlayAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

export const StartProjectModal = ({ lenis, setStartProjectModal }) => {
  const scrollRef = useRef(null);
  const modalLenis = useRef(null);

  useEffect(() => {
    lenis?.current?.stop();

    modalLenis.current = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current,
      smoothWheel: true,
      syncTouch: true,
    });

    function raf(time) {
      modalLenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      modalLenis.current?.destroy();

      lenis?.current?.start();
    };
  }, [lenis]);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 px-10 pt-10 w-[60vw] h-dvh
        bg-s backdrop-blur-3xl z-9999
        max-ds:w-[70vw] max-lg:w-full max-md:p-5 max-md:w-screen will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.button
          type="button"
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            },
          }}
          exit={{
            scale: 0,
            rotate: 90,
            transition: {
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="absolute top-5 right-5 z-30 group"
        >
          <motion.div
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#000",
            }}
            className="p-3 backdrop-blur-2xl rounded-sm group max-md:p-2 bg-s"
          >
            <IoClose
              className="text-p text-[24px] group-hover:text-p group-hover:rotate-90
                transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </motion.div>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            opacity: 0,
            y: 15,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="size-full overflow-y-scroll"
          ref={scrollRef}
        >
          <div className="flex flex-col items-start">
            <TextAnimated
              phrases={["Iniciar um projetoㅤ"]}
              variants={textSlide}
              as="h2"
              className="flex flex-col"
              lineClassName="mb-5 font-neue font-normal text-p text-[72px] tracking-[-0.07em]
               leading-none max-md:text-[42px]"
              wordClassName="mr-2"
              wordDelay={0.015}
              lineDelay={0.1}
            />
            <div className="relative w-full flex flex-col items-start">
              {/* NOME */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Nome Completo
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="Digite seu nome completo"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      font-azeret font-medium text-p text-[14px] tracking-[0.05em]
      leading-none uppercase bg-transparent"
                />
              </div>

              {/* EMAIL + TELEFONE */}
              <div className="mb-12 w-full grid grid-cols-2 gap-5 max-md:grid-cols-1">
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="email"
                    className="mb-4 font-azeret font-medium 
        text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                  >
                    E-mail
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                    className="w-full p-5 border border-p/10 rounded-sm outline-none
        font-azeret font-medium text-p text-[14px] tracking-[0.05em]
        leading-none uppercase bg-transparent"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <label
                    htmlFor="phone"
                    className="mb-4 font-azeret font-medium 
        text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                  >
                    Telefone
                  </label>

                  <input
                    type="text"
                    id="phone"
                    placeholder="(21) 99999-9999"
                    className="w-full p-5 border border-p/10 rounded-sm outline-none
        font-azeret font-medium text-p text-[14px] tracking-[0.05em]
        leading-none uppercase bg-transparent"
                  />
                </div>
              </div>

              {/* EMPRESA */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="company"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Empresa / Estúdio
                </label>

                <input
                  type="text"
                  id="company"
                  placeholder="Nome da empresa ou escritório"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      font-azeret font-medium text-p text-[14px] tracking-[0.05em]
      leading-none uppercase bg-transparent"
                />
              </div>

              {/* TIPO DE PROJETO */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="projectType"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Tipo de Projeto
                </label>

                <select
                  id="projectType"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent font-azeret font-medium text-p text-[14px]
      tracking-[0.05em] leading-none uppercase"
                >
                  <option value="" className="text-p">
                    Selecione uma categoria
                  </option>
                  <option value="residencial" className="text-p">
                    Residencial
                  </option>
                  <option value="comercial" className="text-p">
                    Comercial
                  </option>
                  <option value="corporativo" className="text-p">
                    Corporativo
                  </option>
                  <option value="hotelaria" className="text-p">
                    Hotelaria
                  </option>
                  <option value="gastronomia" className="text-p">
                    Gastronomia
                  </option>
                  <option value="varejo" className="text-p">
                    Varejo
                  </option>
                  <option value="conceitual" className="text-p">
                    Conceitual
                  </option>
                </select>
              </div>

              {/* ESTILO */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="style"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Estilo Desejado
                </label>

                <select
                  id="style"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent font-azeret font-medium text-p text-[14px]
      tracking-[0.05em] leading-none uppercase"
                >
                  <option value="" className="text-p">
                    Selecione um estilo
                  </option>
                  <option value="minimalista" className="text-p">
                    Minimalista
                  </option>
                  <option value="contemporaneo" className="text-p">
                    Contemporâneo
                  </option>
                  <option value="industrial" className="text-p">
                    Industrial
                  </option>
                  <option value="luxuoso" className="text-p">
                    Luxuoso
                  </option>
                  <option value="organico" className="text-p">
                    Orgânico
                  </option>
                  <option value="brutalista" className="text-p">
                    Brutalista
                  </option>
                  <option value="japandi" className="text-p">
                    Japandi
                  </option>
                </select>
              </div>

              {/* ÁREA */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="area"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Área Aproximada
                </label>

                <input
                  type="text"
                  id="area"
                  placeholder="Ex: 120m²"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      font-azeret font-medium text-p text-[14px] tracking-[0.05em]
      leading-none uppercase bg-transparent"
                />
              </div>

              {/* ORÇAMENTO */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="budget"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Faixa de Investimento
                </label>

                <select
                  id="budget"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent font-azeret font-medium text-p text-[14px]
      tracking-[0.05em] leading-none uppercase"
                >
                  <option value="" className="text-p">
                    Selecione uma faixa
                  </option>
                  <option value="20k" className="text-p">
                    Até R$ 20 mil
                  </option>
                  <option value="50k" className="text-p">
                    R$ 20 mil — R$ 50 mil
                  </option>
                  <option value="100k" className="text-p">
                    R$ 50 mil — R$ 100 mil
                  </option>
                  <option value="200k" className="text-p">
                    R$ 100 mil — R$ 200 mil
                  </option>
                  <option value="200k+" className="text-p">
                    Acima de R$ 200 mil
                  </option>
                </select>
              </div>

              {/* PRAZO */}
              <div className="mb-12 w-full flex flex-col items-start">
                <label
                  htmlFor="timeline"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Prazo Desejado
                </label>

                <select
                  id="timeline"
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      bg-transparent font-azeret font-medium text-p text-[14px]
      tracking-[0.05em] leading-none uppercase"
                >
                  <option value="" className="text-p">
                    Selecione um prazo
                  </option>
                  <option value="imediato" className="text-p">
                    Imediato
                  </option>
                  <option value="1-3" className="text-p">
                    1 — 3 meses
                  </option>
                  <option value="3-6" className="text-p">
                    3 — 6 meses
                  </option>
                  <option value="6+" className="text-p">
                    Mais de 6 meses
                  </option>
                </select>
              </div>

              {/* MENSAGEM */}
              <div className="w-full flex flex-col items-start">
                <label
                  htmlFor="details"
                  className="mb-4 font-azeret font-medium 
      text-p text-[14px] tracking-[0.05em] leading-none uppercase"
                >
                  Sobre o Projeto
                </label>

                <textarea
                  id="details"
                  rows={6}
                  placeholder="Conte um pouco sobre o espaço, referências, necessidades e objetivos do projeto..."
                  className="w-full p-5 border border-p/10 rounded-sm outline-none
      resize-none bg-transparent font-azeret font-medium text-p
      text-[14px] tracking-[0.05em] leading-relaxed uppercase placeholder:text-p/50"
                />
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
            }}
            className="my-20 p-5 px-10 w-full bg-p border border-p/10 backdrop-blur-2xl rounded-sm group"
          >
            <p
              className="font-azeret font-semibold 
              text-s text-[12px] tracking-[0.05em] leading-none uppercase 
              group-hover:text-p transition-colors duration-500"
            >
              enviar
            </p>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed left-0 top-0 w-screen h-dvh backdrop-blur-lg bg-p/75 z-900 cursor-pointer"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setStartProjectModal(false)}
      />
    </>
  );
};
