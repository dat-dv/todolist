import type { TMainTitleProps } from "./main-title.type";
import DashedDivider from "../dash-divider";

const MainTitle = ({
  title,
  className = "",
  size = "text-[38px]",
  ...rest
}: TMainTitleProps) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <h1
        className={`font-sans text-primary ${size} leading-tight tracking-wider font-semibold mb-4`}
        {...rest}
      >
        {title}
      </h1>

      <DashedDivider
        maxWidth="780px"
        segments={20} // nhiều đoạn để cảm giác liên tục hơn
        maxDash={56} // dash lớn nhất ở giữa
        minDash={6} // dash nhỏ nhất ở 2 đầu
        thickness={5} // dày theo chiều dọc
        gap={14} // khoảng giữa (không bắt buộc, component tự chia đều)
        color="#23243D"
        baseColor="#e6e7ea"
        fade
        fadeWidth="1%"
        power={1.8} // power>1 giảm nhanh hơn ra rìa
        className="mx-auto mt-4"
      />
    </div>
  );
};

export default MainTitle;
