import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import Button from "../ui/button";
import TextLink from "../ui/text-link";
import TransitionLink from "../ui/link";

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
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <footer
      ref={ref}
      className="relative h-[60vh] bg-bg-p z-50 will-change-[clip-path]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 w-full h-[60vh] flex flex-col justify-between ">
        <div
          className="w-full p-10 flex justify-between items-start gap-25 z-10 
       max-md:p-5"
        >
          <div className="flex-1 size-full flex items-start justify-start gap-25 max-ds:gap-15">
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start max-ds:truncate">
                <motion.p
                  initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                  animate={
                    inView
                      ? { y: 0, opacity: 1, filter: "blur(0px)" }
                      : { y: 120, opacity: 0, filter: "blur(12px)" }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 font-neue font-bold
      text-s text-[clamp(40px,6vw,72px)] text-start tracking-[-0.05em]
           leading-none uppercase"
                >
                  Navigate
                </motion.p>
                {navLinks.map((link, i) => (
                  <TransitionLink
                    key={link.label}
                    href={link.href}
                    className=" relative overflow-hidden size-fit group"
                  >
                    <TextLink bgColor="bg-s">
                      <motion.p
                        custom={i * 0.075}
                        variants={textSlide}
                        initial="initial"
                        animate={inView ? "animate" : "initial"}
                        className="text-chivo-n-14 text-s group-hover:text-p 
                      transition-colors duration-250 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      >
                        {link.label}
                      </motion.p>
                    </TextLink>
                  </TransitionLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start max-ds:truncate">
              <motion.p
                initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
                animate={
                  inView
                    ? { y: 0, opacity: 1, filter: "blur(0px)" }
                    : { y: 120, opacity: 0, filter: "blur(12px)" }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 font-neue font-bold
      text-s text-[clamp(40px,6vw,72px)] text-start tracking-[-0.05em]
           leading-none uppercase"
              >
                Socials
              </motion.p>
              {socialLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="relative overflow-hidden size-fit group"
                >
                  <TextLink bgColor="bg-s">
                    <motion.p
                      custom={i * 0.075}
                      variants={textSlide}
                      initial="initial"
                      animate={inView ? "animate" : "initial"}
                      className="text-chivo-n-14 text-s group-hover:text-p 
                      transition-colors duration-250 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    >
                      {link.label}
                    </motion.p>
                  </TextLink>
                </a>
              ))}
            </div>
          </div>

          <div className="w-full flex-1 flex flex-col items-start">
            <motion.p
              initial={{ y: 120, opacity: 0, filter: "blur(12px)" }}
              animate={
                inView
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 120, opacity: 0, filter: "blur(12px)" }
              }
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 font-inter font-normal text-s text-[28px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11]"
            >
              Newsletter — no spam, only good stuff.
            </motion.p>
            <div className="overflow-hidden h-fit">
              <motion.p
                htmlFor="email"
                variants={textSlide}
                initial="initial"
                animate={inView ? "animate" : "initial"}
                custom={0.2}
                className="text-chivo-s-14"
              >
                Your email address
              </motion.p>
            </div>
            <motion.div className="w-full flex">
              <input
                type="text"
                name="email"
                className="my-4 px-2 py-2 w-100 inline-block border-2 border-s text-s outline-none group max-md:w-full"
              />
            </motion.div>
            <motion.div className="w-full flex" custom={0.1}>
              <Button
                buttonHref="/newsletter"
                buttonLabel="subscribe"
                buttonBgColor="#ffffff"
                buttonTextColor="#000000"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
