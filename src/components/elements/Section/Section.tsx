// Denotes a section of page content.
"use client";
import React from "react";
import classNames from "classnames";
import { Container } from "../Container/Container";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { MediaType, TextAlignmentType } from "@/helpers/types";
import { Document } from "@contentful/rich-text-types";
import { useInView } from "react-hook-inview";

interface Props {
  id?: string | null;
  eyebrow?: string | null;
  heading?: Document | null;
  summary?: Document | null;
  alignment?: TextAlignmentType;
  className?: string;
  backgroundImage?: MediaType | null;
  children: React.ReactNode;
  framed?: boolean;
  darkMode?: boolean;
}

export const Section: React.FC<Props> = ({
  id,
  heading,
  eyebrow,
  summary,
  alignment,
  children,
  className,
  backgroundImage,
  framed = true,
  darkMode,
}) => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.1,
    unobserveOnEnter: true,
  });
  return (
    <section
      ref={ref}
      id={id ?? ""}
      className={classNames(
        {
          "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20": heading,
        },
        {
          "py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10": !heading,
        },
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }
          : {}
      }
    >
      <Container
        className={classNames(
          "relative flex flex-col -bottom-10 opacity-0",
          { "animate-slidingUpSection animation-delay-300": isIntersecting },
          { "items-center": alignment === "center" },
          { "items-end": alignment === "end" }
        )}
      >
        {eyebrow && (
          <div
            className={classNames(
              "tracking-widest font-medium mb-2",
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" },
              { "text-primary-600": !darkMode },
              { "text-neutral-100": darkMode }
            )}
          >
            {eyebrow}
          </div>
        )}
        {heading && (
          <div
            className={classNames(
              "font-heading text-heading leading-tighter max-w-6xl mb-4",
              { "text-neutral-50": darkMode },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <RichText2 data={heading} />
          </div>
        )}
        {summary && (
          <div
            className={classNames(
              "prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-3xl  mb-4",
              { "text-neutral-200": darkMode },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <RichText2 data={summary} />
          </div>
        )}
      </Container>
      {framed ? (
        <Container
          className={classNames(
            "relative -bottom-10 opacity-0",
            {
              "mt-4": heading || eyebrow || summary,
            },
            {
              "animate-slidingUpSection animation-delay-500": isIntersecting,
            }
          )}
        >
          {children}
        </Container>
      ) : (
        <div
          className={classNames("relative -bottom-10 opacity-0", {
            "animate-slidingUpSection animation-delay-500": isIntersecting,
          })}
        >
          {children}
        </div>
      )}
    </section>
  );
};
