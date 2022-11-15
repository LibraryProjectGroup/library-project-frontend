import User from "./user.interface";

interface ContextData {
    user: User | null;
    setUser: Function;
}

export default ContextData;
