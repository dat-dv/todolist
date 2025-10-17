import type { TMainTitleProps } from "./main-title.type";
import DashedDivider from "../dash-divider";

const MainTitle = ({ title, className = "", ...rest }: TMainTitleProps) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <h1
        className={`font-sans text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-wider font-semibold mb-4`}
        {...rest}
      >
        {title}
      </h1>

      <DashedDivider
        maxWidth="780px"
        segments={20}
        maxDash={56}
        minDash={6}
        thickness={5}
        gap={14}
        color="#23243D"
        baseColor="#e6e7ea"
        fade
        fadeWidth="1%"
        power={1.8}
        className="mx-auto mt-4"
      />
    </div>
  );
};

export default MainTitle;
