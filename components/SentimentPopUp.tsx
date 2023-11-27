import { useState, useEffect } from "react";

const SentimentPopUp = ({
  word,
  color,
  emoji,
}: {
  word: string;
  color: string;
  emoji: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (word || color || emoji) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Change 3000 to the desired duration in milliseconds

      return () => clearTimeout(timeout);
    }
  }, [word, color, emoji]);

  return (
    <div
      style={{ backgroundColor: color }}
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed top-2 right-2 p-4 m-4 rounded shadow-lg transition-opacity`}
    >
      <p
        style={{
          WebkitTextStrokeWidth: 1,
          WebkitTextStrokeColor: "black",
        }}
        className="text-white text-4xl"
      >
        {word.toLocaleUpperCase()} {emoji}
      </p>
    </div>
  );
};

export default SentimentPopUp;
