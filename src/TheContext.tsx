import { createContext, useState, FC, ReactNode } from "react";
import ContextData from "./interfaces/ContextData.interface";

export const TheContext = createContext<ContextData | null>(null);

interface IProps {
  children: ReactNode;
}

const TheContextProvider: FC<IProps> = ({ children }) => {
  const [username, setUsername] = useState(null);
  return (
    <TheContext.Provider value={{ username, setUsername }}>
      {children}
    </TheContext.Provider>
  );
};

export default TheContextProvider;
