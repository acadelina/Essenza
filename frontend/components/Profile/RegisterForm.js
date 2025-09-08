import {useState} from "react";
import styles from "../../styles/profile.module.css";

export default function RegisterForm({onRegister, error, success}) {
    const [username, setUsername] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <h2 className={`headerText ${styles.registerHeader}`}>REGISTER</h2>

            <div className={styles.flexColCenter}>
                <div className={styles.inputDiv}>
                    <h1 className={`headerText ${styles.inputLabel}`}>USERNAME</h1>
                    <input
                        className={`brandCase`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                </div>

                <div className={styles.inputDiv}>
                    <h1 className={`headerText ${styles.inputLabel}`}>MAIL</h1>
                    <input
                        className={`brandCase`}
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        placeholder="mail"
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
                    className={`cassete`}
                    onClick={() => onRegister(username, mail, password)}
                >
                    Register
                </button>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </div>
        </>
    );
}
