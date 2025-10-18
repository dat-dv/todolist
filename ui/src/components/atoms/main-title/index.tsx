import type { TMainTitleProps } from "./main-title.type";
import DashedDivider from "../dash-divider";

const MainTitle = ({ title, className = "", ...rest }: TMainTitleProps) => {
  return (
    <div className={`w-full flex flex-col items-center px-4 ${className}`}>
      <h1
        className={`
          font-sans text-primary 
          text-3xl md:text-4xl lg:text-5xl 
          leading-tight 
          tracking-wide sm:tracking-wider 
          font-semibold 
          mb-3 sm:mb-4 
          text-center
          max-w-full
          break-words
        `}
        {...rest}
      >
        {title}
      </h1>

      <DashedDivider
        maxWidth="100%"
        segments={15} // Giảm segments trên mobile
        maxDash={56}
        minDash={6}
        thickness={5}
        gap={14}
        color="#23243D"
        baseColor="#e6e7ea"
        fade
        fadeWidth="3%"
        power={1.8}
        className="
          w-full
          mt-2 sm:mt-4
          max-w-[280px] xs:max-w-[320px]
          sm:max-w-[480px] 
          md:max-w-[640px] 
          lg:max-w-[800px]
          xl:max-w-[960px]
        "
      />
    </div>
  );
};

export default MainTitle;
