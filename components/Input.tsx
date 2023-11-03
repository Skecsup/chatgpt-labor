import React from "react";
import { BsSend } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition from "react-speech-recognition";

interface IProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resetTranscript: () => void;
  lang: string;
  listening: boolean;
  isDisabled: boolean;
}

const Input = ({
  inputText,
  setInputText,
  setIsDisabled,
  setValue,
  setLoading,
  resetTranscript,
  lang,
  listening,
  isDisabled,
}: IProps) => {
  return (
    <div className="bg-[#40414F] w-[500px] rounded-lg shadow-xl self-center flex flex-row justify-between m-2">
      <input
        className="w-96 px-4 py-1 bg-[#40414F] rounded-lg focus:outline-none placeholder:text-white/50"
        type="text"
        placeholder="Write here..."
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
          className="px-2"
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
            <FaMicrophoneSlash className="text-[#a31034]" />
          )}
        </button>
        <button
          className="py-4 pr-4 font-bold  disabled:text-black"
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
  );
};

export default Input;
