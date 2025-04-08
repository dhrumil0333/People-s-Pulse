import { createContext, useState } from "react";

// Create Context
export const LogContext = createContext();

export const LogProvider = ({ children }) => {
    const [profile, setProfile] = useState("notUser");
    const [logEmail, setlogEmail] = useState("");
    const [language, setLanguage] = useState("en");

    return (
        <LogContext.Provider value={{ profile, setProfile , logEmail, setlogEmail, language, setLanguage}}>
            {children}
        </LogContext.Provider>
    );
}; 
 