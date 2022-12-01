import { log } from "console";
import { createContext, useState, FC, ReactNode, useEffect } from "react";
import { isJsxClosingElement } from "typescript";
import { isAuthenticated, authFetch } from "./auth";
import { fetchCurrentBorrows } from "./fetchFunctions";
import Borrow from "./interfaces/borrow.interface";
import ContextData from "./interfaces/ContextData.interface";
import User from "./interfaces/user.interface";

export const TheContext = createContext<ContextData | null>(null);

interface IProps {
    children: ReactNode;
}

const TheContextProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogin, setIsLogin] = useState(false); // update user data when you logIn and logOut
    const [borrows, setBorrows] = useState<Borrow[]>([]);

    useEffect(() => {
        fetchBorrows();
        if (isAuthenticated())
            authFetch("/user/session").then((user) => {
                setUser(user);
            });
    }, [isLogin]);

    const fetchBorrows = async () => {
        setBorrows(await fetchCurrentBorrows());
    };

    return (
        <TheContext.Provider
            value={{
                user,
                borrows,
                setUser,
                setIsLogin,
                fetchBorrows
            }}
        >
            {children}
        </TheContext.Provider>
    );
};

export default TheContextProvider;
