import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_GET_CURRENT_USER} from "../api/apiUrls.ts";
import type {AuthContextType} from "./types.ts";
import type {User} from "../api/types.ts";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios
            .get(API_GET_CURRENT_USER)
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
