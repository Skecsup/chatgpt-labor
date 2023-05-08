import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export default function Home() {
  const [titles, setTitles] = useState<Array<string>>([]);
  const [value, setValue] = useState("");
  const [currentTitle, setCurrentTitle] = useState<any>(null);
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    const getModels = async () => {
      try {
        const response = await fetch("api/models");
        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    getModels();
  }, []);

  return (
    <div className='flex flex-row text-white'>
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
