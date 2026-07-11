import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import TransitionLink from "../ui/link";
import TextLink from "../ui/text-link";
import { FaStarOfLife } from "react-icons/fa";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Estúdio", href: "/studio" },
  { label: "Projetos", href: "/projects" },
  { label: "Preços", href: "/pricing" },
  { label: "Contato", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", external: true },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Behance", href: "https://behance.net", external: true },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const Footer = () => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.3],
    ["100%", "0%", "-150%"],
  );

  const imageOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const imageClip = useTransform(
    scrollYProgress,
    [0.35, 0.68],
    ["circle(0% at 50% 50%)", "circle(100.0% at 50% 50%)"],
  );

  const globe = useTransform(scrollYProgress, [0.4, 0.6], [0, 4]);
  const globeRotate = useTransform(scrollYProgress, [0, 1], [360, -360]);
  const manifest = useTransform(scrollYProgress, [0.5, 0.6], ["150%", "0%"]);
  const itemOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <section ref={container} className="relative h-[400vh] select-none">
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="sticky top-0 p-5 w-full h-screen 
        flex flex-col items-center justify-center gap-5 overflow-hidden z-30 
        max-lg:p-5"
        >
          <div className="overflow-hidden max-lg:h-fit">
            <motion.h1
              style={{ y: titleY }}
              className="font-neue font-light
                text-s text-[252px] will-change-transform"
            >
              |
            </motion.h1>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            style={{
              opacity: imageOpacity,
              clipPath: imageClip,
            }}
            className="relative size-full bg-bg-t"
          >
            <motion.div
              className="absolute inset-0 size-full 
            flex items-center justify-center z-10 max-lg:p-5 "
            >
              <motion.div
                style={{
                  scale: globe,
                  opacity: itemOpacity,
                  rotateY: globeRotate,
                }}
              >
                <p className="font-chivo text-s text-[100px] max-md:text-[16px] max-lg:text-[32px]">
                  <FaStarOfLife />
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-5 size-full
                flex flex-col items-start justify-center 
                 max-lg:p-5 pointer-events-auto
           "
              >
                <motion.p
                  style={{ y: manifest }}
                  className="mb-4 text-chivo-n-14 text-s/75"
                >
                  navegue pelo site
                </motion.p>
                {navLinks.map((link, i) => (
                  <TransitionLink
                    key={link.label}
                    href={link.href}
                    className="relative overflow-hidden size-fit group"
                  >
                    <TextLink bgColor="bg-s">
                      <motion.p
                        style={{ y: manifest }}
                        className="text-chivo-n-14 text-s 
                        group-hover:text-p 
                       transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      >
                        {link.label}
                      </motion.p>
                    </TextLink>
                  </TransitionLink>
                ))}
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-5 size-full 
                flex flex-col items-end justify-center max-lg:p-5
                 pointer-events-auto"
              >
                <motion.p
                  style={{ y: manifest }}
                  className="mb-4 text-chivo-n-14 text-s/75"
                >
                  nossas redes sociais
                </motion.p>
                {socialLinks.map((link, i) => (
                  <TransitionLink
                    key={link.label}
                    href={link.href}
                    className="relative overflow-hidden size-fit group"
                  >
                    <TextLink bgColor="bg-s">
                      <motion.p
                        style={{ y: manifest }}
                        className="text-chivo-n-14 text-s 
                        group-hover:text-p 
                       transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      >
                        {link.label}
                      </motion.p>
                    </TextLink>
                  </TransitionLink>
                ))}
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-5 size-full flex flex-col items-start justify-start
                  font-neue font-bold
      text-s text-[clamp(40px,6vw,90px)] text-start tracking-[-0.05em]
           leading-none uppercase max-lg:p-5"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>
                    incomum{" "}
                    <span className="relative top-2 align-top text-[28px] tracking-[0.4em] max-lg:top-1.5">
                      ®
                    </span>
                  </motion.h2>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: itemOpacity }}
                className="absolute p-5 size-full flex flex-col items-end justify-start
                  font-neue font-bold
      text-s text-[clamp(40px,6vw,90px)] text-start tracking-[-0.05em]
           leading-none uppercase max-lg:p-5"
              >
                <div className="overflow-hidden h-fit">
                  <motion.h2 style={{ y: manifest }}>
                    56
                    <span className="relative top-2 left-3 align-top text-[28px] tracking-[0.4em] max-lg:top-1.5">
                      ®
                    </span>
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative size-full bg-bg-p will-change-transform" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
