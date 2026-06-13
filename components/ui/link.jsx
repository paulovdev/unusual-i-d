"use client";

import { useTransitionRouter } from "next-view-transitions";
import { usePageTransition, usePreLoader } from "@/store/pageTransition";

function slideInOut() {
  document.documentElement.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0.2, transform: "translateY(-35%)" },
    ],
    {
      duration: 700,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  document.documentElement.animate(
    [
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
    ],
    {
      duration: 700,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

function scaleTransition() {
  const root = document.documentElement;
  /* "cubic-bezier(0.87, 0, 0.13, 1 )" */
  root.animate(
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(0.5)", opacity: 1 },
    ],
    {
      duration: 500 /* 800  */,
      easing: "cubic-bezier(0.76, 0, 0.24, 1 )",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  root
    .animate(
      [
        { clipPath: "inset(100% 0 0 0)", transform: "scale(0.5)" },
        { clipPath: "inset(0 0 0 0)", transform: "scale(0.5)" },
      ],
      {
        duration: 550 /* 900 */,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    )
    .finished.then(() => {
      return root.animate(
        [{ transform: "scale(0.5)" }, { transform: "scale(0.5)" }],
        {
          duration: 200 /* 600 */,
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished;
    })
    .then(() => {
      return root.animate(
        [{ transform: "scale(0.5)" }, { transform: "scale(1)" }],
        {
          duration: 600,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished;
    })
    .then(() => {
      usePageTransition.getState().setReady(true);
    });
}

export default function TransitionLink({ href, children, className, onClick }) {
  const router = useTransitionRouter();

  const handleClick = () => {
    onClick?.();

    const { hasPlayedPreloader } = usePreLoader.getState();

    if (href === "/" && !hasPlayedPreloader) {
      router.push(href, {
        onTransitionReady: slideInOut,
      });

      return;
    }

    requestAnimationFrame(() => {
      router.push(href, {
        onTransitionReady: scaleTransition,
      });
    });
  };

  return (
    <div onClick={handleClick} className={`${className} cursor-pointer`}>
      {children}
    </div>
  );
}
