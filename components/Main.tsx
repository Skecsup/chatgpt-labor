import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SiOpenai } from "react-icons/si";
import { FaUserAlt, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { MdVoiceChat } from "react-icons/md";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useAppContext } from "../context/appContext";

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
  const [isDisabled, setIsDisabled] = useState(true);
  const [chat, setChat] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
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
    getMessages();
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
      console.log(data);
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
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(transcript);

  return (
    <div className='flex flex-col justify-center w-[90%] h-screen bg-slate-600 '>
      <div className='self-center'>
        <h1 className='text-3xl font-black'>GyulaGPT</h1>
      </div>

      <div className=' overflow-auto h-[90%] flex flex-col items-center'>
        {loading ? (
          <>
            {currentchat.map((el, i) => {
              return (
                <div
                  className={`py-4 flex flex-col items-center w-full ${
                    el.role === "assistant" ? "bg-slate-400" : "bg-slate-600"
                  }`}
                  key={`para-${i}`}
                >
                  <div className='w-1/2 flex flex-row'>
                    <div className='px-4'>
                      {el.role === "assistant" ? (
                        <SiOpenai className='w-8 h-8 text-[#10a37f]' />
                      ) : (
                        <FaUserAlt className='w-8 h-8 text-[#a31034]' />
                      )}
                    </div>
                    <p>{el.content}</p>
                  </div>
                </div>
              );
            })}

            <div className='py-4 flex flex-col items-center w-full bg-slate-600'>
              <div className='w-1/2 flex flex-row'>
                <div className='px-4'>
                  <FaUserAlt className='w-8 h-8 text-[#a31034]' />
                </div>
                <p>{value}</p>
              </div>
            </div>
            <div className='py-4 flex flex-col items-center w-full bg-slate-400'>
              <div className='w-1/2 flex flex-row'>
                <div className='px-4'>
                  <SiOpenai className='w-8 h-8 text-[#10a37f]' />
                </div>
                {lang === "en" ? (
                  <p>I am thinking...</p>
                ) : (
                  <p>Gondolkozom...</p>
                )}
              </div>
            </div>
          </>
        ) : (
          currentchat.map((el, i) => {
            return (
              <div
                className={`py-4 flex flex-col items-center w-full ${
                  el.role === "assistant" ? "bg-slate-400" : "bg-slate-600"
                }`}
                key={`para-${i}`}
              >
                <div className='w-1/2 flex flex-row'>
                  <div className='px-4'>
                    {el.role === "assistant" ? (
                      <SiOpenai
                        className='w-8 h-8 text-[#10a37f] cursor-pointer'
                        onClick={() => {
                          let utterance = new SpeechSynthesisUtterance(
                            el.content
                          );
                          utterance.lang = lang;
                          speechSynthesis.speak(utterance);
                        }}
                      />
                    ) : (
                      <FaUserAlt
                        className='w-8 h-8 text-[#a31034] cursor-pointer'
                        onClick={() => {
                          let utterance = new SpeechSynthesisUtterance(
                            el.content
                          );
                          utterance.lang = lang;
                          speechSynthesis.speak(utterance);
                        }}
                      />
                    )}
                  </div>
                  <p>{el.content}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className='bg-slate-400 w-[500px] rounded-lg shadow-xl self-center flex flex-row justify-between m-2'>
        <input
          className='w-96 px-4 py-1 bg-slate-400 rounded-lg focus:outline-none placeholder:text-slate-900/50'
          type='text'
          placeholder='Write here...'
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setIsDisabled(e.target.value.length === 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // 👇 Get input value
              setValue(inputText);
              setLoading(true);
              resetTranscript();
              setInputText("");
            }
          }}
        />
        <div>
          <button
            className='px-2'
            onTouchStart={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: lang,
              })
            }
            onMouseDown={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: lang,
              })
            }
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
          >
            {listening ? (
              <FaMicrophone />
            ) : (
              <FaMicrophoneSlash className='text-[#a31034]' />
            )}
          </button>
          <button
            className='py-4 pr-4 font-bold  disabled:text-black'
            disabled={isDisabled}
            onClick={() => {
              setValue(inputText);
              setLoading(true);
              resetTranscript();
              setInputText("");
            }}
          >
            <BsSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
