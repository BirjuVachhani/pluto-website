"use client"
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { StatisticsType } from "@/helpers/types"

export const Statistics: React.FC<{ data: StatisticsType, index: number }> = ({ data, index }) => {
  const { number, text } = data
  const [ref, isIntersecting] = useInView({
    threshold: 1,
    unobserveOnEnter: true
  });

  return (
    <div 
      ref={ref}
      className={classNames(
        "flex flex-col items-center gap-3 p-4 rounded-assets",
        { "perspective-2500 backface-hidden -rotate-y-90": !isIntersecting },
        { "perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 " : isIntersecting },
      )}
      style={{ 
        transitionDelay: `${(index + 1) * 0.2}s`
      }}  
    >
      <div className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-primary-600 text-center tracking-tighter">
        {number}
      </div>
      <div className="font-heading font-semibold tracking-wide text-center md:text-lg xl:text-xl max-w-[150px]">
        {text}
      </div>
    </div>
  )
}