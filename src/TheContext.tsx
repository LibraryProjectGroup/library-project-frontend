import { createContext, useState, FC, ReactNode } from "react";
import ContextData from "./interfaces/ContextData.interface";

export const TheContext = createContext<ContextData | null>(null);

interface IProps {
  children: ReactNode;
}

const TheContextProvider: FC<IProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [admin, setAdmin] = useState(false);

  return (
    <TheContext.Provider
      value={{ username, setUsername, userId, setUserId, admin, setAdmin }}
    >
      {children}
    </TheContext.Provider>
  );
};

export default TheContextProvider;
