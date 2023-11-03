import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Home() {
  const [titles, setTitles] = useState<Array<string>>([]);
  const [value, setValue] = useState("");
  const [currentTitle, setCurrentTitle] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);

  return (
    <div className="flex flex-row text-white">
      <Sidebar
        titles={titles}
        setValue={setValue}
        setCurrentTitle={setCurrentTitle}
        setMessage={setMessage}
      />
      <Main
        setTitles={setTitles}
        value={value}
        setValue={setValue}
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}
