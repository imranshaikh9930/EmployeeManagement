import { createContext, useContext, useEffect, useState } from "react";


const appContext = createContext();


export const AppContextProvider = ({children})=>{
    const url = "http://localhost:8500";
    const [token,setToken] = useState("");
    const[user,setUser] = useState("");
    const [selected,setSelected] = useState(null);


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      }, []); 
    const contextValue = {
        url,
        token,setToken,
        user,setUser,
        selected,setSelected
    }
    return (
        <appContext.Provider value={contextValue}>
            {children}

        </appContext.Provider>
    )
}

export const useAppContext = ()=>useContext(appContext);