import React, { Dispatch, SetStateAction, useState } from "react";
import Options from "./Options";
import { FaCog, FaCaretRight, FaCaretLeft } from "react-icons/fa";
interface IProps {
  titles: string[];

  setValue: Dispatch<SetStateAction<string>>;
  setCurrentTitle: Dispatch<any>;
  setMessage: Dispatch<any>;
}

const Sidebar = ({ titles, setValue, setCurrentTitle, setMessage }: IProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle: string) => {
    setCurrentTitle(uniqueTitle);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setisSidebarOpen((pre) => !pre)}
        className={`absolute top-[50%] ${isSidebarOpen ? "ml-40" : "ml-2"}`}
      >
        {isSidebarOpen ? (
          <FaCaretLeft className="text-white/10 hover:text-white transition-colors ease-in-out duration-300" />
        ) : (
          <FaCaretRight className="text-white/50 hover:text-white transition-colors ease-in-out duration-300" />
        )}
      </div>
      <div
        className={`absolute w-[160px] h-screen bg-[#202123] ${
          isSidebarOpen ? "flex " : "hidden "
        } flex-col justify-between items-center`}
      >
        {isOptionsOpen && (
          <Options
            setIsOptionsOpen={setIsOptionsOpen}
            isOptionsOpen={isOptionsOpen}
          />
        )}
        <div>
          <button
            onClick={createNewChat}
            className="w-full mt-4 p-2 rounded-md border border-white self-center hover:bg-white/20 transition-colors duration-300 ease-in-out"
          >
            + New chat
          </button>
          <ul className="mt-4 self-center flex flex-col justify-center">
            {titles.map((el) => {
              return (
                <li
                  className="cursor-pointer rounded-md w-full my-2 p-2 hover:bg-[#343541] transition-colors duration-300 ease-in-out"
                  onClick={() => handleClick(el)}
                  key={el}
                >
                  {el.length < 15 ? "💬" + el : "💬" + el.slice(0, 15) + "..."}
                </li>
              );
            })}
          </ul>
        </div>
        <nav className="mb-4">
          <FaCog
            className="cursor-pointer w-11 h-11 hover:text-white/50 transition-colors duration-300 ease-in-out"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          />
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
