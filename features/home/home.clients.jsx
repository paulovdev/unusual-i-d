"use client";

import React from "react";
import {
  SiFramer,
  SiDribbble,
  SiAwwwards,
  SiVercel,
  SiSpotify,
  SiGithub,
} from "react-icons/si";

const logos = [
  <SiFramer />,
  <SiDribbble />,
  <SiAwwwards />,

  <SiVercel />,
  <SiSpotify />,
  <SiGithub />,
];

const HomeClients = () => {
  return (
    <section id="clients" className="relative px-15 max-md:px-5 ">
      <div className="mb-10 flex items-center gap-4">
        <span className="size-2  bg-p rounded-[1px]" />

        <p className="max-w-125 font-azeret font-medium text-p text-[14px] tracking-[0.05em] leading-none uppercase">
          Estúdios e parceiros
        </p>
      </div>

      <div className="relative py-30 w-full">
        <div className="flex items-center justify-between">
          {logos.map((icon, i) => (
            <div
              key={i}
              className="text-p text-[62px] opacity-70 hover:opacity-100
              transition-opacity duration-500"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeClients;
