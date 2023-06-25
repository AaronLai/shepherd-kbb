import React from "react";
import { ReactNode, createContext, useContext, useState } from "react";

type contextType = {
    jwt: string,
    setJwtToken: any,
    userId: string,
    setUserId: any
}

const contextDefault: contextType = {
    jwt: "",
    setJwtToken: () => {},
    userId: "",
    setUserId: () => {}
}

const context = createContext<contextType>(contextDefault);

export function useAppContext() {
    return useContext(context);
}

type Props = {
    children: ReactNode;
};

export function ContextProvider({ children }: Props) {
    const [jwt, setJwt] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const setJwtToken = (jwt: string) => {
        setJwt(jwt)
    }
    const value = {
        jwt, setJwtToken,
        userId, setUserId
    }
    
    return (
        <>
            <context.Provider value={value}>
                {children}
            </context.Provider>
        </>
    );
}