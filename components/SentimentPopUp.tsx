import { useState, useEffect } from "react";

const SentimentPopUp = ({ sentimentMessage }: { sentimentMessage: any }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (sentimentMessage) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Change 3000 to the desired duration in milliseconds

      return () => clearTimeout(timeout);
    }
  }, [sentimentMessage]);

  return (
    <div
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed top-2 right-2 p-4 m-4 rounded shadow-lg transition-opacity bg-green-400`}
    >
      <p className="text-white text-xl">{sentimentMessage}</p>
    </div>
  );
};

export default SentimentPopUp;
