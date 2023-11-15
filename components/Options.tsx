import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAppContext } from "../context/appContext";

interface IProps {
  setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOptionsOpen: boolean;
}

const Options = ({ setIsOptionsOpen }: IProps) => {
  const {
    setMode,
    setModel,
    setSecretKey,
    setLang,
    secretKey,
    activeLang,
    activeMode,
    activeModel,
    setActiveLang,
    setActiveMode,
    setActiveModel,
  } = useAppContext();

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 ">
      <div className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 px-12 py-4 rounded-lg bg-gray-900 flex flex-col items-center justify-around">
        <div>
          <AiOutlineCloseCircle
            onClick={() => setIsOptionsOpen(false)}
            className="absolute top-2 right-2 cursor-pointer w-5 h-5 text-white"
          />
          <p className=" text-center">Add your private key to use GPT-4</p>
          <input
            className="text-slate-900 w-full bg-white rounded-lg focus:outline-none placeholder:text-slate-900/50 p-2"
            placeholder="Your private key..."
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>
        <div>
          <p className="text-center">Model</p>
          <button
            onClick={() => {
              setModel("gpt-4");
              setActiveModel({ gpt35: false, gpt4: true });
            }}
            className={`rounded w-16 h-16 m-2  text-black ${
              activeModel.gpt4 ? "bg-red-400" : "bg-white"
            }`}
          >
            GPT-4
          </button>
          <button
            onClick={() => {
              setModel("gpt-3.5-turbo");
              setActiveModel({ gpt4: false, gpt35: true });
            }}
            className={`rounded w-16 h-16 m-2  text-black ${
              activeModel.gpt35 ? "bg-red-400" : "bg-white"
            }`}
          >
            GPT-3.5
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-center ">Voice recognition</p>
          <div className="flex flex-row">
            <button
              onClick={() => {
                setLang("en");
                setActiveLang({ en: true, hu: false });
              }}
              className={`rounded w-16 h-16 m-2  text-3xl grid place-content-center ${
                activeLang.en ? "bg-green-400" : "bg-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 30"
                width="30"
                height="15"
              >
                <clipPath id="a">
                  <path d="M0 0v30h60V0z"></path>
                </clipPath>
                <clipPath id="b">
                  <path d="M30 15h30v15zv15H0zH0V0zV0h30z"></path>
                </clipPath>
                <g clipPath="url(#a)">
                  <path d="M0 0v30h60V0z" fill="#012169"></path>
                  <path
                    d="M0 0l60 30m0-30L0 30"
                    stroke="#fff"
                    strokeWidth="6"
                  ></path>
                  <path
                    d="M0 0l60 30m0-30L0 30"
                    clipPath="url(#b)"
                    stroke="#C8102E"
                    strokeWidth="4"
                  ></path>
                  <path
                    d="M30 0v30M0 15h60"
                    stroke="#fff"
                    strokeWidth="10"
                  ></path>
                  <path
                    d="M30 0v30M0 15h60"
                    stroke="#C8102E"
                    strokeWidth="6"
                  ></path>
                </g>
              </svg>
            </button>
            <button
              onClick={() => {
                setLang("hu");
                setActiveLang({ en: false, hu: true });
              }}
              className={`rounded w-16 h-16 m-2  text-3xl grid place-content-center ${
                activeLang.hu ? "bg-green-400" : "bg-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6 3"
                width="30"
                height="15"
              >
                <path fill="#477050" d="M0 0h6v3H0z"></path>
                <path fill="#FFF" d="M0 0h6v2H0z"></path>
                <path fill="#CE2939" d="M0 0h6v1H0z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-center">Modes</p>
          <div className="flex flex-wrap w-[240px]">
            <button
              onClick={() => {
                setMode(
                  "I’d like you to pretend to be my opponent and to be able to play chess. I will tell my first move on next chat. Only write your next turn."
                );
                setActiveMode({ chess: true, pro: false, child: false });
              }}
              className={`rounded w-16 h-16 m-2  text-3xl ${
                activeMode.chess ? "bg-orange-400" : "bg-white"
              }`}
            >
              ♟️
            </button>
            <button
              onClick={() => {
                setMode(
                  "Everything you explain try to sound as proffessianal as you can."
                );
                setActiveMode({ chess: false, pro: true, child: false });
              }}
              className={`rounded w-16 h-16 m-2  text-3xl ${
                activeMode.pro ? "bg-orange-400" : "bg-white"
              }`}
            >
              👨‍🏫
            </button>
            <button
              onClick={() => {
                setMode(
                  "Everything you explain try to explain it as if you would to a 5 years old."
                );
                setActiveMode({ chess: false, pro: false, child: true });
              }}
              className={`rounded w-16 h-16 m-2  text-3xl ${
                activeMode.child ? "bg-orange-400" : "bg-white"
              }`}
            >
              🧒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
