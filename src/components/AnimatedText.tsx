interface AnimatedTextProps {
  text: string;
  delayIncrement: number;
  initialDelay: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delayIncrement,
  initialDelay,
  children,
}) => {
  return (
    <div className={className}>
      {text.split("").map((c, i) => {
        const style: React.CSSProperties = {
          animationDelay: `${(initialDelay + i * delayIncrement).toString()}s`,
        };
        return (
          <span key={i} style={style}>
            {c}
          </span>
        );
      })}

      {children}
    </div>
  );
};

export default AnimatedText;
