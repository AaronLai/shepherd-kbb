import React from "react";
import { ReactNode, createContext, useContext, useState } from "react";

type contextType = {
    jwt: string,
    theme: string,
    setTheme: (theme: string) => void
    projects: Array<Object>
    setProjects: (projects: Array<Object>) => void,
    setJwtToken: any
}

const contextDefault: contextType = {
    jwt: "",
    setJwtToken: () => {},
    theme: "light",
    setTheme: () => {},
    projects: [],
    setProjects: () => {}
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
    const [theme, setTheme] = useState<string>("light");
    const [projects, setProjects] = useState<Array<Object>>([]);
    const setJwtToken = (jwt: string) => {
        setJwt(jwt)
    }
    const value = {
        jwt, setJwtToken,
        theme, setTheme,
        projects, setProjects
    }
    React.useEffect(() => {
        console.log("JWT: ", jwt)
    }, [jwt])
    
    return (
        <>
            <context.Provider value={value}>
                {children}
            </context.Provider>
        </>
    );
}