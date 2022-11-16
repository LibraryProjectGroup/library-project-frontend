import { log } from "console";
import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { isJsxClosingElement } from "typescript";
import { isAuthenticated, authFetch } from "./auth";
import ContextData from "./interfaces/ContextData.interface";
import User from "./interfaces/user.interface";

export const TheContext = createContext<ContextData | null>(null);

interface IProps {
    children: ReactNode;
}

const TheContextProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState(false); // update user data when you logIn and logOut

    useEffect(() => {
        if (isAuthenticated())
            authFetch("/user/session").then((user) => {
                setUser(user);
            });
    }, [isLogin]);

    return (
        <TheContext.Provider
            value={{
                user,
                setUser,
                setIsLogin
            }}
        >
            {children}
        </TheContext.Provider>
    );
};

export default TheContextProvider;
