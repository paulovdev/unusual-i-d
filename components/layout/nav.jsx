"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import String from "../ui/string";
import { usePathname } from "next/navigation";
import { FaBehance, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { useTransitionRouter } from "next-view-transitions";
import TransitionLink from "../ui/link";
import TextLink from "../ui/text-link";

export const menuOverlay = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.25,
    },
  },
};

const navData = [
  { label: "Início", href: "/" },
  { label: "Estúdio", href: "/studio" },
  { label: "Projetos", href: "/projects" },
  { label: "Preços", href: "/pricing" },
  { label: "Contato", href: "/contact" },
];

const Menu = ({ pathname, setMenu, mobile }) => {
  const menuContainer = {
    initial: {
      height: "0px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    animate: {
      height: "500px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.25,
      },
    },
    exit: {
      height: "0px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.25,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={menuContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed left-1/2 -translate-x-1/2 bottom-25
         w-150 bg-p/50 backdrop-blur-2xl  z-90 select-none pointer-events-none
         max-lg:w-[calc(100vw-40px)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.25,
            },
          }}
          exit={{
            opacity: 0,
            y: 15,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="relative p-6 py-10 size-full flex flex-col items-start justify-between pointer-events-auto"
        >
          <div className="w-full flex flex-col items-start">
            <p className="mb-4 text-chivo-n-14 text-s/50">Navegue pelo site</p>
            <span className="mb-5 w-full h-px bg-s/25" />
            {navData.map((nav, i) => {
              const active = pathname === nav.href;

              return (
                <TransitionLink
                  key={i}
                  href={nav.href}
                  onClick={() => setMenu(false)}
                  className={`cursor-pointer ${active ? "mt-2.5 mb-4" : "mb-2"} size-fit flex items-center gap-2`}
                >
                  <TextLink bgColor={active ? "bg-[#202020]" : "bg-s"}>
                    <p
                      className={`max-w-125 
                      ${active ? "text-s/50 hover:text-s/75" : "text-s hover:text-p"} 
                  font-neue font-bold text-p text-[clamp(32px,6vw,38px)] tracking-[-0.03em] leading-none
             uppercase transition-colors duration-150 ease-[cubic-bezier(0.76,0,0.24,1)]`}
                    >
                      {nav.label}
                    </p>
                  </TextLink>
                </TransitionLink>
              );
            })}
          </div>

          <div className="flex items-center gap-5 ">
            <FaXTwitter className="text-s text-[24px] cursor-pointer" />
            <FaInstagram className="text-s text-[24px] cursor-pointer" />
            <FaBehance className="text-s text-[24px] cursor-pointer" />
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        onClick={() => setMenu(false)}
        variants={menuOverlay}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-p/50 backdrop-blur-lg w-screen h-screen z-80"
      />
    </>
  );
};

const Nav = () => {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navContainer = {
    initial: {
      width: mobile ? "100%" : "400px",

      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    animate: {
      width: mobile ? "100%" : "600px",

      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      width: mobile ? "100%" : "400px",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.5,
      },
    },
  };

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.nav
          className="fixed inset-5 flex items-end justify-center z-100 pointer-events-none"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.button
            variants={navContainer}
            initial="initial"
            animate={menu ? "animate" : "exit"}
            exit="exit"
            className="px-6 h-15 bg-p/50 backdrop-blur-2xl  
        flex items-center justify-between gap-8 pointer-events-auto
     "
          >
            <p className="text-chivo-s-14 text-[12px]">
              {navData.map((item) => (
                <span key={item.href}>
                  {pathname === item.href ? item.label : ""}
                </span>
              ))}
            </p>
            <motion.figure
              className="relative " /* w-8 h-8  */
              animate={{
                y: menu ? -85 : 0,
                x: menu ? (mobile ? 135 : 255) : 0,
                scale: menu ? 1.5 : 1,
                transition: {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
            >
              <String menuOpen={menu} />
            </motion.figure>
            <div
              className="min-w-20 flex items-center gap-5 cursor-pointer"
              onClick={() => setMenu(!menu)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={menu ? "fechar" : "menu"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="min-w-10 text-chivo-s-14 text-[12px]"
                >
                  {menu ? "fechar" : "MENU"}
                </motion.p>
              </AnimatePresence>
              <div className="size-fit flex flex-col items-start gap-1.5">
                <motion.span
                  className="block w-6 h-px bg-s"
                  animate={menu ? { rotate: -45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.span
                  className="block h-px bg-s"
                  initial={{ width: "12px" }}
                  animate={
                    menu
                      ? { rotate: 45, y: -3, width: "24px" }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                />
              </div>
            </div>
          </motion.button>
        </motion.nav>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {menu && <Menu pathname={pathname} setMenu={setMenu} mobile={mobile} />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
