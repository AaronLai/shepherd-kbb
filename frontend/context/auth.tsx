import { ReactNode, createContext, useContext, useState } from "react";

type contextType = {
    user: Object | null,
    setUser: (user: any) => void,
    theme: string,
    setTheme: (theme: string) => void
    projects: Array<Object>
    setProjects: (projects: Array<Object>) => void
}

const contextDefault: contextType = {
    user: null,
    setUser: () => {},
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
    const [user, setUser] = useState<boolean | null>(null);
    const [theme, setTheme] = useState<string>("light");
    const [projects, setProjects] = useState<Array<Object>>([]);
    const value = {
        user, setUser,
        theme, setTheme,
        projects, setProjects
    }
    return (
        <>
            <context.Provider value={value}>
                {children}
            </context.Provider>
        </>
    );
}