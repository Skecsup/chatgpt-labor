import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const LoadingMessage = ({ value, lang }: { value: string; lang: string }) => {
  return (
    <>
      <div className="py-4 flex flex-col items-center w-full bg-[#343641]">
        <div className="w-1/2 flex flex-row">
          <div className="px-4">
            <FaUserAlt className="w-8 h-8 text-[#a31034]" />
          </div>
          <p>{value}</p>
        </div>
      </div>
      <div className="py-4 flex flex-col items-center w-full bg-[#444654]">
        <div className="w-1/2 flex flex-row">
          <div className="px-4">
            <SiOpenai className="w-8 h-8 text-[#10a37f]" />
          </div>
          {lang === "en" ? <p>I am thinking....</p> : <p>Gondolkozom....</p>}
        </div>
      </div>
    </>
  );
};

export default LoadingMessage;
