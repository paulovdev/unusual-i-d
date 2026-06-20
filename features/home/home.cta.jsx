import { StartProjectModal } from "@/components/modal/start-project/start-project-modal";
import Button from "@/components/ui/button";
import TransitionLink from "@/components/ui/link";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

const HomeCTA = ({ lenis }) => {
  const [startProjectModal, setStartProjectModal] = useState(false);
  return (
    <>
      <section id="cta" className="bg-[#121212] h-screen">
        <div className="p-15 max-md:px-5">
          <div className="mb-10 size-fit flex items-center gap-4">
            <span className="triangle-s" />
            <p className="text-chivo-s-14 text-end">Vamos criar algo juntos?</p>
          </div>
          <div className="pt-50 flex items-center justify-between max-md:flex-col max-md:pt-25">
            <div className="flex-1 flex flex-col items-start justify-end gap-10">
              <h2
                className="font-neue font-bold 
             text-center text-s text-[72px] tracking-[-0.05em] leading-[1.1]
              max-lg:text-[62px] max-md:text-[42px] uppercase"
              >
                Fale com a gente
              </h2>
              <div className="flex items-center justify-between gap-5">
                <div onClick={() => setStartProjectModal(true)}>
                  <Button
                    text="Iniciar um projeto"
                    bg="bg-s"
                    textColor="text-p"
                    iconColor="text-p"
                  />{" "}
                </div>
                <TransitionLink href="/projects">
                  <Button
                    text="Ver projetos"
                    bg="bg-p"
                    textColor="text-s"
                    iconColor="text-s"
                    hoverBg="bg-s"
                    hoverTextColor="text-p"
                    hoverIconColor="text-p"
                  />
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence mode="wait">
        {startProjectModal && (
          <StartProjectModal
            setStartProjectModal={setStartProjectModal}
            startProjectModal={startProjectModal}
            lenis={lenis}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeCTA;
