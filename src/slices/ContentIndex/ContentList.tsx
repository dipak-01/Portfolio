"use client";
import React, { useState, useEffect } from "react";
import { Content, isFilled } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useRef } from "react";
import { asImageSrc } from "@prismicio/client";
type ContentListProps = {
  items: Content.ProjectPostDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};
export const ContentList = ({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) => {
  const component = useRef(null);
  const [currentState, setCurrentState] = useState<null | number>(null);

  const urlPrefix = contentType;
  const contentImages = items.map((item) => {
    console.log("inside the img");
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;
    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });
  const onMouseEnter = (index: number) => {
    console.log("hi");
    setCurrentState(index);
  };

  return (
    <>
      <ul className="grid border-b border-b-slate-100">
        {items.map((item, index) => {
          return (
            <>
              {isFilled.keyText(item.data.title) && (
                <li
                  key={index}
                  className="list-item opacity-0f"
                  onMouseEnter={() => onMouseEnter(index)}
                >
                  <Link
                    href={urlPrefix + "/" + item.uid}
                    className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-salte-200 md:flex-row"
                  >
                    <div className="flex flex-col ">
                      <span className="text-3xl font-bold">
                        {item.data.title}
                      </span>
                      <div className="flex gap-3 text-emerald-500 ">
                        {item.tags.map((tag, index) => {
                          return (
                            <span className="text-lg font-bold" key={index}>
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <span className="ml-auto flex gap-2 items-center text-xl font-medium md:ml-0">
                      {viewMoreText} <MdArrowOutward />
                    </span>
                  </Link>
                </li>
              )}
            </>
          );
        })}

        <div
          className="hover-reveal absolute pointer-events-none top-0 -z-10 h-[320px] w-[220] rounded-lg bg-cover bg-center left-0 opacity-0f transition-[background] duration-300"
          style={{
            backgroundImage:
              currentState !== null ? `url(${contentImages[currentState]})` : "",
          }}
        ></div>
      </ul>
    </>
  );
};
