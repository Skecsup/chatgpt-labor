import { useEffect, useState } from "react";
import { calculateExponentialMovingAverage } from "../utils/calculate-exponential-moving-average";

const useInactivityTimer = (
  timeoutDuration: number = 600000,
  secretKey: string,
  sentiments: number[],
  lang: string
): any => {
  const [inactive, setInactive] = useState(false);
  const [sentimentMessage, setSentimentMessage] = useState("");
  const value = calculateExponentialMovingAverage(sentiments);
  const getSentiment = async (messageForBot: string) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: { role: "user", content: messageForBot },
        secretKey: secretKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("api/sentiment-gpt", options);
      const data = await response.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setSentimentMessage(data.choices[0].message.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setInactive(true);
        getSentiment(
          `Inactive for 10 minutes, answer in ${
            lang === "hu" ? "hungarian" : "english"
          }`
        );
      }, timeoutDuration);
    };

    const handleActivity = () => {
      if (inactive) {
        setInactive(false);
        resetTimer();
      }
      resetTimer();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [inactive]);

  useEffect(() => {
    if ((value >= -1 && value <= -0.5) || (value <= 1 && value >= 0.5)) {
      getSentiment(value.toString());
    }
  }, [value]);

  useEffect(() => {
    console.log(sentiments[sentiments.length - 1]);
    console.log(sentiments[sentiments.length - 2]);
    console.log(sentiments[sentiments.length - 3]);

    if (
      (sentiments[sentiments.length - 2] > 0 &&
        sentiments[sentiments.length - 1] < 0) ||
      (sentiments[sentiments.length - 2] < 0 &&
        sentiments[sentiments.length - 1] > 0)
    ) {
      getSentiment(
        `sentiment of the previous chat${
          sentiments[sentiments.length - 2]
        } sentiment of the current chat${sentiments[sentiments.length - 1]}
         answer in ${lang === "hu" ? "hungarian" : "english"}`
      );
    }
  }, [sentiments]);

  return sentimentMessage;
};

export default useInactivityTimer;
