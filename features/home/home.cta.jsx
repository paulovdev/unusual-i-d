import Button from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const HomeCTA = () => {
  return (
    <section id="cta" className="bg-[#151515] h-[75vh]">
      <div className="p-15 max-md:px-5">
        <div className="mb-10 size-fit flex items-center gap-2">
          <span className="size-2 bg-s rounded-[1px]" />
          <p className="max-w-125 font-azeret font-medium text-s text-[14px] tracking-[0.05em] leading-none uppercase">
            Start a project
          </p>
        </div>
        <div className="pt-50 flex items-center justify-between max-md:flex-col max-md:pt-25">
          <div className="relative flex-1 w-100 h-50 flex items-center justify-center">
            <Image
              src="/assets/images/rings/rings-1.svg"
              fill
              alt="ring-1"
              className="relative w-100 h-screen"
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-end gap-10">
            <h2
              className="max-w-225 font-i-sans font-normal 
            text-s text-[48px] tracking-[-0.07em] leading-none
            max-md:text-[38px]"
            >
              Have a space in mind? <br /> Let’s create something intentional.
            </h2>
            <div className="flex items-center justify-between gap-5">
              <Button
                text="View spaces"
                bg="bg-p"
                textColor="text-s"
                iconColor="text-s"
                hoverBg="bg-s"
                hoverTextColor="text-p"
                hoverIconColor="text-p"
              />
              <Button
                text="Start a project"
                bg="bg-s"
                textColor="text-p"
                iconColor="text-p"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
