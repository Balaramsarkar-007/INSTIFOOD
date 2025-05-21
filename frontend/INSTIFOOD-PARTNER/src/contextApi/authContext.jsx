import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [owner, setOwner] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const verifyUser = async () => {
            try {
                setLoading(true);
                axios.defaults.withCredentials = true; 
                const response = await axios.get("http://localhost:8000/auth/owner/varify-logedin");
                console.log(response.data);
                
                if(response.data.success) {
                    setOwner(response.data.owner);
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
        return () => controller.abort();
    }, []);

    return (
        <AuthContext.Provider value={{owner, setOwner , loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
