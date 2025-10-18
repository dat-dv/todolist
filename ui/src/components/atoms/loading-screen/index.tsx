export const LoadingScreen = ({ className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen w-full px-5 ${className}`}
    >
      <div className="w-full max-w-sm">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute h-full bg-blue-600 animate-[loading_2s_linear_infinite] w-1/3"></div>
        </div>
      </div>
    </div>
  );
};
