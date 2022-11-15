import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { isAuthenticated, authFetch } from "./auth";
import ContextData from "./interfaces/ContextData.interface";
import User from "./interfaces/user.interface";

export const TheContext = createContext<ContextData | null>(null);

interface IProps {
    children: ReactNode;
}

const TheContextProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (isAuthenticated())
            authFetch("/user/session").then((user) => setUser(user));
    }, []);

    return (
        <TheContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </TheContext.Provider>
    );
};

export default TheContextProvider;
