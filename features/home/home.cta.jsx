import { StartProjectModal } from "@/components/modal/start-project/start-project-modal";
import Button from "@/components/ui/button";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

const HomeCTA = ({ lenis }) => {
  const [startProjectModal, setStartProjectModal] = useState(false);
  return (
    <>
      <section id="cta" className="bg-[#121212] h-[75vh]">
        <div className="p-15 max-md:px-5">
          <div className="mb-10 size-fit flex items-center gap-2">
            <span className="size-2 bg-s rounded-[1px]" />
            <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
              Tem um espaço em mente?
            </p>
          </div>
          <div className="pt-50 flex items-center justify-between max-md:flex-col max-md:pt-25">
            <div className="relative flex-1 w-100 h-50 flex items-center justify-center">
              <Image
                src="/assets/images/rings/rings-1.svg"
                fill
                sizes=""
                alt="ring-1"
                className="relative w-100 h-screen"
              />
            </div>
            <div className="flex-1 flex flex-col items-start justify-end gap-10">
              <h2
                className="max-w-225 font-neue font-normal 
            text-s text-[48px] tracking-[-0.07em] leading-none
            max-md:text-[38px]"
              >
                Vamos dar forma ao seu espaço com intenção.
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
                <Button
                  text="Ver espaços"
                  bg="bg-p"
                  textColor="text-s"
                  iconColor="text-s"
                  hoverBg="bg-s"
                  hoverTextColor="text-p"
                  hoverIconColor="text-p"
                />
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
