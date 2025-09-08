import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const checkAuth = () => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);

                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (e) {
                localStorage.removeItem("token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();

        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return { user, loading, checkAuth };
}