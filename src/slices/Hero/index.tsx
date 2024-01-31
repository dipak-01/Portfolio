'use client';
import {gsap} from "gsap";
import { useRef, useEffect } from "react";
import { Content, KeyTextField } from "@prismicio/client";

import { SliceComponentProps } from "@prismicio/react";

import Bounded from "@/components/Bounded"
import Shapes from "@/slices/Hero/Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(".name-animation",
        {
          x: -100, opacity: 0, rotate: -10
        }, {
        x: 0, opacity: 1, rotate: 0, duration: 1,
        ease: "elastic.out(1,0.3)", transformOrigin: "left top",
        stagger: {
          each: 0.2,
          repeatDelay: 0.5,
          from: 'random',
        }

      })
      tl.fromTo(".professionn-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
        },)
    }, component);





    return () => ctx.revert();

  }, []);

  const renderTextAnimation = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key}-index inline-block opacity-0`} >
        {letter}
      </span>
    ))

  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[70vh] " >
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter" aria-label={slice.primary.first_name + "" + slice.primary.last_name}>
            <span className="  block text-cyan-500  ">{renderTextAnimation(slice.primary.first_name, 'first')}</span>
            <span className="block -mt-[.2em] text-cyan-100">{renderTextAnimation(slice.primary.last_name, 'last')}</span>
          </h1>
          <span className="professionn-title block bg-gradient-to-tr from-emerald-800 via-emerald-200 to-emerald-900 bg-clip-text text-3xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">{slice.primary.profession}</span>

        </div>
      </div>
    </Bounded >
  );
};

export default Hero;
