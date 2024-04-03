"use client"
import React, { useEffect, useRef, useState } from 'react';
import classNames from "classnames";
import * as RadixTabs from '@radix-ui/react-tabs';
import { Section } from '@/components/elements/Section/Section';
import { Button } from '@/components/elements/Button/Button';
import { ContentPTType } from '@/helpers/types';
import { RichText2 } from "@/components/elements/RichText/RichText"
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import "@/app/css/bg-color.css";
import "./styles.css"

export const TabPT: React.FC<{ data: ContentPTType }> = ({data}) => {
  const { htmlid, eyebrow, heading, summary, content, alignment, backgroundColor, backgroundImage, darkMode } = data
  const [justify, setJustify] = useState("center")
  const wrapperRef = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>
  useEffect(() => {
    if (wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth) {
      setJustify("start")
    }
  }, [])
  return (
    <Section
      id={htmlid}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      framed={false}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      <RadixTabs.Root
        className="w-full mt-6"
        defaultValue={content.length > 0 ? content[0].id : ""}
      >
        <div
          ref={wrapperRef}
          className={classNames(
            "flex overflow-x-auto whitespace-nowrap justify-start",
            [`justify-${justify}`]
          )}
        >
          <RadixTabs.List
            className={classNames("group/list tab-list flex")}
            aria-label={heading ? documentToHtmlString(heading) : undefined}
          >
            <div
              className={classNames(
                "bg-neutral-200 lg:bg-opacity-0 flex gap-x-0 gap-y-2 lg:gap-x-2 overflow-x-auto overscroll-contain rounded-assets",
                { "bg-opacity-50": !darkMode },
                { "bg-opacity-20": darkMode }
              )}
            >
              {content.length > 0 &&
                content.map((section) => (
                  <RadixTabs.Trigger
                    key={section.id}
                    value={section.id}
                    className={classNames(
                      "group/trigger shrink-0 px-6 py-2 hover:bg-neutral-200 flex flex-col justify-center items-center cursor-pointer rounded-assets hover:bg-opacity-90 data-[state='active']:bg-primary-600 transition-colors duration-500 ease "
                    )}
                  >
                    <div
                      className={classNames(
                        "text-sm tracking-widest font-semibold group-hover/trigger:text-neutral-800 group-data-[state='active']/trigger:text-primary-100 transition-colors duration-500 ease",
                        { "text-neutral-500": !darkMode },
                        { "text-neutral-100": darkMode }
                      )}
                    >
                      {section.eyebrow}
                    </div>
                    {section.heading && (
                      <div
                        className={classNames(
                          "block font-semibold lg:text-lg group-hover/trigger:text-neutral-800 group-data-[state='active']/trigger:text-white transition-colors duration-500 ease",
                          { "text-neutral-700": !darkMode },
                          { "text-neutral-50": darkMode }
                        )}
                      >
                        <RichText2 data={section.heading} />
                      </div>
                    )}
                  </RadixTabs.Trigger>
                ))}
            </div>
          </RadixTabs.List>
        </div>
        <div className="mt-2 container px-4 mx-auto grid">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "col-start-1 row-start-1 relative data-[state='active']:animate-fadeInSlideLeft",
                { "text-center": alignment === "center" },
                { "text-end": alignment === "end" }
              )}
            >
              <div className="flex flex-col-reverse lg:flex-row lg:items-center rounded-assets p-4 lg:p-8 -mx-4 lg:-mx-8">
                <div className="py-4 lg:pr-10">
                  {section.description && (
                    <div
                      className={classNames("prose 2xl:prose-lg", {
                        "text-neutral-50": darkMode,
                      })}
                    >
                      <RichText2 data={section.description} />
                    </div>
                  )}
                  {section.buttons && section.buttons.length > 0 && (
                    <div
                      className={classNames("mt-8", {
                        "flex justify-center": alignment === "center",
                      })}
                    >
                      {section.buttons.map((button) => (
                        <Button
                          key={button.id}
                          url={button.url}
                          variant={button.buttonVariant}
                          openNewTab={button.openNewTab}
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {(section.media.length > 0 || section.embeddedMediaUrl) && (
                  <div className="lg:w-1/2 shrink-0">
                    <FlexibleContentMediaPart
                      data={section}
                      alignment={alignment}
                    />
                  </div>
                )}
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  );
}