import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { parseString } from "../utils/find-code-in-text";

const Message = ({ el, i, lang }: { el: any; i: number; lang: string }) => {
  return (
    <div
      className={`py-4 flex flex-col items-center w-full ${
        el.role === "assistant" ? "bg-[#444654]" : "bg-[#343641]"
      }`}
      key={`para-${i}`}
    >
      <div className="w-full sm:w-5/6 md:w-3/4 lg:w-1/2 flex flex-row ">
        <div className="px-4">
          {el.role === "assistant" ? (
            <SiOpenai
              className="w-8 h-8 text-[#10a37f] cursor-pointer"
              onClick={() => {
                let utterance = new SpeechSynthesisUtterance(el.content);
                utterance.lang = lang;
                speechSynthesis.speak(utterance);
              }}
            />
          ) : (
            <FaUserAlt
              className="w-8 h-8 text-[#a31034] cursor-pointer"
              onClick={() => {
                let utterance = new SpeechSynthesisUtterance(el.content);
                utterance.lang = lang;
                speechSynthesis.speak(utterance);
              }}
            />
          )}
        </div>
        {parseString(el.content)}
      </div>
    </div>
  );
};

export default Message;
