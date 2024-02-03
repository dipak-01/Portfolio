import React from "react";
import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
};

function Button({ linkField, label, showIcon = true, className }: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "item-center ease-our group relative flex w-fit justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-50 px-4 py-2 font-bold text-slate-800 transition-transform hover:scale-105",
        className,
      )}
    >
      <span className="transition-trasform absolute inset-0 z-0 h-full translate-y-9 bg-emerald-500 duration-300 ease-in-out group-hover:translate-y-0 "></span>
      <span className="relative flex items-center justify-center gap-2">
        {" "}
        {label} {showIcon && <MdArrowOutward className="inline-block" />}
      </span>
    </PrismicNextLink>
  );
}

export default Button;
