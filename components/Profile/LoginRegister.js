import styles from "../../styles/profile.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginRegister({onLogin, onRegister, error, success}) {
    return (
        <div className={styles.profileContainer}>
            <LoginForm onLogin={onLogin} />
            <div className={styles.lineDark}></div>
            <div className={styles.lineLight}></div>
            <RegisterForm onRegister={onRegister} error={error} success={success} />
        </div>
    );
}
