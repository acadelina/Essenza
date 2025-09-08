import {Eye, EyeOff} from "lucide-react";
import styles from "../../styles/profile.module.css";

export default function AccountCard({user, showPassword, setShowPassword, onLogout}) {
    return (
        <div className={styles.section}>
            <div>
                <h2 className={`headerText ${styles.sectionHeader} `}>Account</h2>
                <p className="headerText">Username: {user.username}</p>
                <p className="headerText">Mail: {user.mail}</p>
                <p className="headerText" style={{display: "flex", alignItems: "center"}}>
                    Password:&nbsp;
                    {showPassword ? user.password : "********"}
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </p>
            </div>
            <div className={styles.flexColCenter}>
                {onLogout && (
                    <button className="cassete" onClick={onLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}
