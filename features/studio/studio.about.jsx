import { useInView } from "react-intersection-observer";

import { ClipText } from "@/components/ui/clip-text";

const StudioAbout = () => {
  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative mt-25 px-5">
      <div
        ref={aboutRef}
        className="mb-25 flex items-start gap-10 select-none max-lg:flex-col"
      >
        <div className="flex-2 flex items-center gap-4">
          <span className="triangle-p" />
          <p className="text-chivo-p-14 text-end will-change-transform">
            sobre nós
          </p>
        </div>

        <div className="flex-4">
          {["Fundado em Londres em 2023, "].map((phrases, i) => (
            <div key={i}>
              <ClipText
                text={phrases}
                animate={aboutInView && "animate"}
                delay={0.5 + 0.15 * i}
                tag="h2"
                className="big-text-1-n text-p"
              />
            </div>
          ))}
          <div className="mt-20 w-full flex items-end justify-end">
            <div className="w-full max-w-150 max-lg:w-full max-lg:max-w-full">
              {[
                "INCOMUM® é um estúdio de arquitetura e design de interiores que cria ambientes residenciais sofisticados no Reino Unido, na Europa e na América do Norte.",
                " ",
                "O estúdio aborda cada projeto com clareza, sobriedade e atenção aos detalhes.",
                "Explore abaixo uma seleção de nossos principais serviços.",
                " ",
              ].map((phrases, i, arr) => (
                <div
                  key={i}
                  style={{ marginBottom: arr.length - 1 === i && "80px" }}
                >
                  <ClipText
                    text={phrases}
                    animate={aboutInView && "animate"}
                    delay={0.5 + 0.15 * i}
                    tag="p"
                    className="paragraph-p"
                  />
                </div>
              ))}

              <div className="relative left-1 size-fit flex items-center gap-4">
                <span className="relative -top-px size-2.5 bg-p rounded-full" />
                <p className="text-chivo-p-14 text-end">o que fazemos?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioAbout;
