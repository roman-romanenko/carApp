import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {GET_CURRENT_USER} from "../api/apiUrls.ts";
import type {AuthContextType, User} from "./types.ts";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios
            .get(GET_CURRENT_USER)
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};
