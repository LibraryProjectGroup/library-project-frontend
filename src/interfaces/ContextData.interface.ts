import User from "./user.interface";

interface ContextData {
    user: User | null;
    setUser: Function;
    setIsLogin: Function;
}

export default ContextData;
