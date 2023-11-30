import { useEffect, useState } from "react";

const useInactivityTimer = (
  timeoutDuration: number = 600000,
  secretKey: string,
  value: number
): any => {
  const [inactive, setInactive] = useState(false);
  const [sentimentMessage, setSentimentMessage] = useState("");

  const getSentiment = async (messageForBot: string) => {
    console.log("get sentiment called");

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
        console.log(data.choices[0].message);
        console.log(data.choices[0].message.content);
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
        console.log("function called here");
        getSentiment("Inactive for 10 minutes");
        // Call your function here, e.g., handleInactivity()
      }, timeoutDuration); // 10 minutes in milliseconds
    };

    const handleActivity = () => {
      if (inactive) {
        setInactive(false);
        // You may want to reset the timer here as well
        resetTimer();
      }
      resetTimer();
    };

    // Set up initial timer

    // Set up event listeners for activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Clean up event listeners on component unmount
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

  return sentimentMessage;
};

export default useInactivityTimer;
