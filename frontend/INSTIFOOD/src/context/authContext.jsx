import React, {createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLogin , setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const verifyUser = async () => {
            try {
                axios.defaults.withCredentials = true; 
                const response = await axios.get("http://localhost:8000/auth/user/varify-logedin");
                console.log(response.data);
                
                if(response.data.success) {
                    setIsLogin(true);
                    setUser(response.data.userId);
                } else {
                    navigate('/');
                    setIsLogin(false);
                }
            } catch (error) {
                console.error("Auth verification failed:", error);
                setIsLogin(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
        return () => controller.abort();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, isLogin , loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);