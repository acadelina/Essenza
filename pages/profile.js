import {useAuth} from "../utils/useAuth";
import {useEffect, useState} from "react";
import AccountCard from "../components/Profile/AccountCard";
import styles from "../styles/profile.module.css";
import LoginRegister from "../components/Profile/LoginRegister";
import OrdersHistory from "../components/Profile/OrdersHistory";
import {useCart} from "../utils/CartContext";


export default function Profile() {

    const {user, checkAuth} = useAuth();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const {setSessionId} = useCart();

    useEffect(() => {
        if (user?.username) {
            setSessionId(user.username);
            localStorage.setItem("cartSession", user.username);
        }
    }, [user]);

    const handleLogin = async (mail, password) => {
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({mail, password}),
        });
        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            checkAuth();

        } else {
            alert(data.msg || "Login failed");
        }
    };

    const handleRegister = async (username, mail, password) => {
        setError(null);
        setSuccess(null);
        const res = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, mail, password}),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setSuccess("Account created! You can now login.");
        } else {
            setError(data.msg || data.error || "Registration failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cartSession");
        setSessionId(crypto.randomUUID());
        checkAuth();
    };

    if (!user) {
        return (
            <LoginRegister error={error} onLogin={handleLogin} onRegister={handleRegister} success={success}/>
        );
    }

    if (user.role === "admin") {
        return (
            <div className={styles.profileContainer}>
                <h2 className={`headerText ${styles.adminHeader}`}>ADMIN PROFILE</h2>
                <div className={styles.lineDark}></div>
                <AccountCard
                    user={user}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    onLogout={handleLogout}
                />
                <div className={styles.section} style={{flexDirection: "column"}}>
                    <h2 className={`headerText ${styles.sectionHeader} `}>Administration</h2>
                    <div className={styles.gridAdmin}>
                        <button className="brandCase">ADD NEW PRODUCT</button>
                        <button className="brandCase">SEE ALL PRODUCTS</button>
                        <button className="brandCase">BEST DEALS</button>
                        <button className="brandCase">ORDERS</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <h2 className={`headerText ${styles.adminHeader}`}>PROFILE</h2>
            <div className={styles.lineDark}></div>
            <AccountCard
                user={user}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onLogout={handleLogout}
            />
            <div className={styles.lineDark}></div>
            <h2 className={`headerText ${styles.ordersHeader}`}>ORDERS</h2>
            <div className={styles.lineDark}></div>
            <OrdersHistory username={user.username}/>
        </div>
    );
}
