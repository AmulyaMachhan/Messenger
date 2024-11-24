const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div>
      <div>
        {[...Array(9)].map((_, i) => {
          <div
            key={i}
            className={`aspect-square rounded-2xl${
              i % 2 === 0 ? "animate-pulse" : ""
            }`}
          ></div>;
        })}
      </div>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </div>
  );
};

export default AuthImagePattern;
