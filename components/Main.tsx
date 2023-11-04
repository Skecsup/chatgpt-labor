import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { useAppContext } from "../context/appContext";
import Input from "./Input";
import Message from "./Message";
import LoadingMessage from "./LoadingMessage";
import SentimentPopUp from "./SentimentPopUp";

interface IProps {
  setTitles: Dispatch<SetStateAction<string[]>>;
  value: string;
  currentTitle: any;
  setValue: Dispatch<SetStateAction<string>>;
  setCurrentTitle: Dispatch<any>;
  setMessage: Dispatch<any>;
  message: any;
}

const Main = ({
  setTitles,
  value,
  setValue,
  currentTitle,
  setCurrentTitle,
  message,
  setMessage,
}: IProps) => {
  const firstUpdate = useRef(true);

  const [isDisabled, setIsDisabled] = useState(true);
  const [chat, setChat] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [sentiment, setSentiment] = useState<any>(null);
  const { lang, model, secretKey, mode } = useAppContext();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const isServer = typeof window === "undefined";

  if (!browserSupportsSpeechRecognition && !isServer) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (value && message && currentTitle) {
      setChat((prev) => [
        ...prev,

        { title: currentTitle, role: "user", content: value },
        { title: currentTitle, role: message.role, content: message.content },
      ]);
      setMessage(null);
      setLoading(false);
    }
  }, [message, currentTitle]);

  useEffect(() => {
    setTitles(Array.from(new Set(chat.map((el) => el.title))));
  }, [chat]);

  useEffect(() => {
    setInputText(transcript);
    setIsDisabled(transcript.length === 0 && value.length === 0);
  }, [transcript]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      if (value.length > 0) {
        getSentiment();
        getMessages();
      }
    }
  }, [value]);

  const currentchat = chat.filter((el) => el.title === currentTitle);

  const currentchatNoTitle = currentchat.map(({ role, content }) => ({
    role,
    content,
  }));

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: [...currentchatNoTitle, { role: "user", content: value }],
        model: model,
        secretKey: secretKey,
        mode: mode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("api/hello", options);
      const data = await response.json();

      if (data.error) {
        if (data.error.message === "The model: `gpt-4` does not exist") {
          setMessage({
            role: "assistant",
            content:
              "Ez a modell számodra sajnos nem elérhető, válts vissza gpt-3.5-re",
          });
        } else {
          setMessage({
            role: "assistant",
            content: "Hiba történt, próbáld meg újra később",
          });
        }
      } else {
        setMessage(data.choices[0].message);
        let utterance = new SpeechSynthesisUtterance(
          data.choices[0].message.content
        );
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSentiment = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: { role: "user", content: value },
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
        console.log(JSON.parse(data.choices[0].message.content));
        setSentiment(JSON.parse(data.choices[0].message.content));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center w-[90%] h-screen bg-[#343641]">
      <div className="self-center">
        <h1 className="text-3xl font-black">GyulaGPT</h1>
      </div>
      {sentiment && (
        <SentimentPopUp
          word={sentiment.word}
          color={sentiment.color}
          emoji={sentiment.emoji}
        />
      )}
      <div className=" overflow-auto h-[90%] flex flex-col items-center">
        {loading ? (
          <>
            {currentchat.map((el, i) => {
              return <Message el={el} i={i} lang={lang} />;
            })}
            <LoadingMessage value={value} lang={lang} />
          </>
        ) : (
          currentchat.map((el, i) => {
            return <Message el={el} i={i} lang={lang} />;
          })
        )}
      </div>
      <Input
        inputText={inputText}
        setInputText={setInputText}
        setIsDisabled={setIsDisabled}
        setValue={setValue}
        setLoading={setLoading}
        resetTranscript={resetTranscript}
        lang={lang}
        listening={listening}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Main;
