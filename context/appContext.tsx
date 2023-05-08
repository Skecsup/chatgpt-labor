import React, {
  useContext,
  useState,
  useEffect,
  ReactNode,
  createContext,
} from "react";
import { useRouter } from "next/router";

interface IContext {
  mode: string;
  setMode: (c: string) => void;
  lang: string;
  setLang: (c: string) => void;
  model: string;
  setModel: (c: string) => void;
  secretKey: string;
  setSecretKey: (c: string) => void;
  activeMode: {
    chess: boolean;
    pro: boolean;
    child: boolean;
  };
  activeModel: { gpt4: boolean; gpt35: boolean };
  activeLang: { en: boolean; hu: boolean };
  setActiveMode: (c: { chess: boolean; pro: boolean; child: boolean }) => void;
  setActiveModel: (c: { gpt4: boolean; gpt35: boolean }) => void;
  setActiveLang: (c: { en: boolean; hu: boolean }) => void;
}

const AppContext = createContext<IContext>({
  mode: "",
  setMode: () => {},
  lang: "",
  setLang: () => {},
  model: "",
  setModel: () => {},
  secretKey: "",
  setSecretKey: () => {},
  activeMode: {
    chess: false,
    pro: false,
    child: false,
  },
  activeModel: { gpt4: false, gpt35: false },
  activeLang: { en: false, hu: false },
  setActiveMode: () => {},
  setActiveModel: () => {},
  setActiveLang: () => {},
});

interface MyProps {
  children?: ReactNode;
}

const AppProvider = ({ children }: MyProps) => {
  const [mode, setMode] = useState("");
  const [lang, setLang] = useState("hu");
  const [model, setModel] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [activeMode, setActiveMode] = useState({
    chess: false,
    pro: false,
    child: false,
  });
  const [activeModel, setActiveModel] = useState({ gpt4: false, gpt35: false });
  const [activeLang, setActiveLang] = useState({ en: false, hu: false });

  const context = {
    mode,
    setMode,
    lang,
    setLang,
    model,
    setModel,
    secretKey,
    setSecretKey,
    activeMode,
    setActiveMode,
    activeModel,
    setActiveModel,
    activeLang,
    setActiveLang,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
