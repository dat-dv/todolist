import type { TStatsBadgeProps } from "./stats-badge.type";

const StatsBadge: React.FC<TStatsBadgeProps> = ({
  label,
  value,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "text-primary",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500">{label}:</span>
      <span className={`font-semibold text-lg ${colorClasses[color]}`}>
        {value}
      </span>
    </div>
  );
};

export default StatsBadge;
