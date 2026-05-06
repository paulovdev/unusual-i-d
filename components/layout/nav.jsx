"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import String from "../ui/string";
import { usePathname } from "next/navigation";
import { FaBehance, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useWorkStore } from "@/store/useWorkStore";


export const menuContainer = {
  initial: {
    height: "0px",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  animate: {
    height: "400px",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
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
  { label: "home", href: "/" },
  { label: "studio", href: "/studio" },
  { label: "spaces", href: "/spaces" },
  { label: "contact us", href: "/contact" },
];

const Menu = ({ setMenu }) => {
  const pathname = usePathname();
  return (
    <>
      <motion.div
        variants={menuContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed left-1/2 -translate-x-1/2 bottom-25
         w-100 bg-p/50 backdrop-blur-2xl rounded-md z-90 pointer-events-none"
      >
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
          className="relative p-6 py-10 size-full flex flex-col items-start justify-between pointer-events-auto"
        >
          <div className="w-full flex flex-col items-start">
            <p className="mb-5 font-azeret font-medium text-s/50 text-[12px] tracking-[0.05em] uppercase">
              MENU
            </p>
            <span className="mb-5 w-full h-px bg-s/25" />
            {navData.map((nav, i) => {
              const active = pathname === nav.href;

              return (
                <a
                  href={nav.href}
                  key={i}
                  onClick={() => setMenu(false)}
                  className={`${active ? "mt-5 mb-7" : "mb-2"} size-fit flex items-center gap-2`}
                >
                  {active && <span className="size-2 bg-s rounded-[1px]" />}
                  <p
                    className={`max-w-125 font-azeret font-medium ${active ? "text-s" : "text-s/50 hover:text-s"} text-[14px] tracking-[0.05em] leading-none uppercase transition-all duration-250`}
                  >
                    {nav.label}
                  </p>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-5 ">
            <FaXTwitter className="text-s text-[24px]" />
            <FaInstagram className="text-s text-[24px]" />
            <FaBehance className="text-s text-[24px]" />
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
  const [menu, setMenu] = useState(false);
  const { openSearch } = useWorkStore();
  return (
    <>
      <nav className="fixed inset-5 flex items-end justify-center z-100 pointer-events-none">
        <button className="w-100 px-6 h-16 bg-p/50 backdrop-blur-2xl rounded-md flex items-center justify-between gap-8 pointer-events-auto">
          <p className="font-azeret font-medium text-[12px] text-s tracking-[0.05em] leading-none uppercase">
            UNUSUAL<span>®</span>
          </p>
          <motion.figure
            className="relative " /* w-8 h-8  */
            animate={{
              y: menu ? -85 : 0,
              x: menu ? 150 : 0,
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
            className="min-w-20 flex items-center gap-5"
            onClick={() => setMenu(!menu)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={menu ? "close" : "menu"}
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
                className="min-w-10 font-azeret font-medium text-[12px] text-s tracking-[0.05em] leading-none uppercase"
              >
                {menu ? "CLOSE" : "MENU"}
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
        </button>
      </nav>
      <AnimatePresence mode="wait">
        {menu && <Menu setMenu={setMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
