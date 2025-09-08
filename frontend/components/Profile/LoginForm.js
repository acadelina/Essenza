import { useState } from "react";
import styles from "../../styles/profile.module.css";

export default function LoginForm({ onLogin }) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <h2 className={`headerText ${styles.loginHeader}`}>LOGIN</h2>
            <div className={styles.lineDark}></div>

            <div className={styles.flexColCenter}>
                <div className={styles.inputDiv}>
                    <h1 className={`headerText ${styles.inputLabel}`}>MAIL</h1>
                    <input
                        className={`brandCase`}
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="Please enter your mail"
                    />
                </div>

                <div className={styles.inputDiv}>
                    <h1 className={`headerText ${styles.inputLabel}`}>PASSWORD</h1>
                    <input
                        className={`brandCase`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                </div>

                <button
                    className= "cassete"
                    onClick={() => onLogin(mail, password)}
                >
                    Login
                </button>
            </div>
        </>
    );
}
